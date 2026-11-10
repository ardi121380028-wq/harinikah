import { prisma } from './db';

export interface SaveInvitationPayload {
  userId?: string;
  slug: string;
  title?: string;
  groomName?: string;
  brideName?: string;
  culturalTheme?: string;
  colorTheme?: string;
  pagesData: any[];
  customElements?: any[];
}

/**
 * Save or update invitation in PostgreSQL database
 */
export async function saveInvitationToDb(payload: SaveInvitationPayload) {
  if (!process.env.DATABASE_URL) {
    return {
      success: true,
      mode: 'fallback',
      slug: payload.slug,
      message: 'Tersimpan lokal (Database URL belum diset).'
    };
  }

  try {
    const pagesJson = JSON.stringify(payload.pagesData || []);
    const elementsJson = JSON.stringify(payload.customElements || []);

    // Check if invitation with slug already exists
    const existing = await prisma.invitation.findUnique({
      where: { slug: payload.slug },
    });

    if (existing) {
      const updated = await prisma.invitation.update({
        where: { slug: payload.slug },
        data: {
          title: payload.title || existing.title,
          groomName: payload.groomName || existing.groomName,
          brideName: payload.brideName || existing.brideName,
          culturalTheme: payload.culturalTheme || existing.culturalTheme,
          colorTheme: payload.colorTheme || existing.colorTheme,
          pagesData: pagesJson,
          customElements: elementsJson,
        },
      });
      return { success: true, mode: 'database', invitation: updated };
    }

    // Default system user if no userId provided
    let userId = payload.userId;
    if (!userId) {
      let defaultUser = await prisma.user.findFirst();
      if (!defaultUser) {
        defaultUser = await prisma.user.create({
          data: {
            email: 'admin@harinikah.com',
            name: 'HariNikah Official',
            role: 'admin',
          },
        });
      }
      userId = defaultUser.id;
    }

    const created = await prisma.invitation.create({
      data: {
        userId,
        slug: payload.slug,
        title: payload.title || 'Pernikahan Dimas & Clarissa',
        groomName: payload.groomName || 'Dimas',
        brideName: payload.brideName || 'Clarissa',
        culturalTheme: payload.culturalTheme || 'modern',
        colorTheme: payload.colorTheme || 'dark',
        pagesData: pagesJson,
        customElements: elementsJson,
      },
    });

    return { success: true, mode: 'database', invitation: created };
  } catch (error) {
    console.error('Error in saveInvitationToDb:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Fetch invitation by slug from PostgreSQL database
 */
export async function getInvitationFromDb(slug: string) {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    const inv = await prisma.invitation.findUnique({
      where: { slug },
      include: {
        wishes: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!inv) return null;

    // Increment views count asynchronously
    prisma.invitation.update({
      where: { id: inv.id },
      data: { viewsCount: { increment: 1 } },
    }).catch(() => {});

    return {
      id: inv.id,
      slug: inv.slug,
      title: inv.title,
      groomName: inv.groomName,
      brideName: inv.brideName,
      culturalTheme: inv.culturalTheme,
      colorTheme: inv.colorTheme,
      pages: JSON.parse(inv.pagesData || '[]'),
      customElements: JSON.parse(inv.customElements || '[]'),
      wishes: inv.wishes.map(w => ({
        id: w.id,
        name: w.name,
        status: w.status,
        message: w.message,
        timestamp: w.createdAt.toISOString(),
      })),
    };
  } catch (err) {
    console.warn('Could not load invitation from DB:', err);
    return null;
  }
}

/**
 * Save RSVP & Wish in database
 */
export async function submitRsvpWishToDb(slug: string, wish: { name: string; status: string; guestsCount?: string; message: string }) {
  if (!process.env.DATABASE_URL) {
    return { success: true, mode: 'fallback' };
  }

  try {
    const inv = await prisma.invitation.findUnique({ where: { slug } });
    if (!inv) return { success: false, error: 'Invitation not found' };

    const createdWish = await prisma.rsvpWish.create({
      data: {
        invitationId: inv.id,
        name: wish.name,
        status: wish.status,
        guestsCount: wish.guestsCount || '1 Orang',
        message: wish.message,
      },
    });

    return { success: true, mode: 'database', wish: createdWish };
  } catch (err) {
    console.error('Error submitting RSVP wish to DB:', err);
    return { success: false, error: String(err) };
  }
}

