import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './db';

export const authOptions: NextAuthOptions = {
  providers: [
    // 100% White-Label Google OAuth Provider (Domain: harinikah.com)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'harinikah-google-client-id-placeholder',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'harinikah-google-secret-placeholder',
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),

    // Native Email & Password / Quick Access Provider
    CredentialsProvider({
      name: 'Email & Password',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'pengantin@harinikah.com' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Nama Lengkap', type: 'text' }
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null;
        }

        const email = credentials.email.toLowerCase().trim();
        const displayName = credentials.name || email.split('@')[0].replace(/[._]/g, ' ');

        try {
          // If database is available, find or create user
          if (process.env.DATABASE_URL) {
            let user = await prisma.user.findUnique({
              where: { email },
            });

            if (!user) {
              user = await prisma.user.create({
                data: {
                  email,
                  name: displayName,
                  image: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`,
                  role: 'user',
                  package: 'free',
                },
              });
            }

            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              role: user.role,
            };
          }
        } catch (err) {
          console.warn('Database fallback to local auth:', err);
        }

        // Resilient fallback when database URL is not configured yet
        return {
          id: `usr_${Date.now()}`,
          name: displayName,
          email: email,
          image: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`,
          role: 'user',
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      try {
        if (process.env.DATABASE_URL) {
          const email = user.email.toLowerCase();
          const existingUser = await prisma.user.findUnique({
            where: { email },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                email,
                name: user.name || 'Calon Pengantin',
                image: user.image,
                role: 'user',
                package: 'free',
              },
            });
          }
        }
      } catch (e) {
        console.warn('Could not sync user to database in signIn callback:', e);
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'user';
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id || token.sub;
        (session.user as any).role = token.role || 'user';
      }
      return session;
    },
  },

  pages: {
    signIn: '/',
    error: '/',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET || 'harinikah-jwt-secret-luxury-wedding-suite-2026',
};

