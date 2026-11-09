/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#031211',
          900: '#061e1d',
          850: '#0a2a28',
          800: '#0e3835',
          700: '#144c48',
          600: '#1c6560',
        },
        gold: {
          50: '#fbf8ee',
          100: '#f6efd3',
          200: '#eedda9',
          300: '#e4c474',
          400: '#dfb051',
          500: '#d19830',
          600: '#b47724',
          700: '#8e5620',
          800: '#754520',
        },
        velvet: '#072422',
        champagne: '#FAF7F2',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        script: ['Great Vibes', 'cursive'],
      },
      backgroundImage: {
        'velvet-texture': "url('/assets/velvet-bg.jpg')",
        'gold-gradient': "linear-gradient(135deg, #fcedc5 0%, #dfb051 50%, #b88628 100%)",
        'emerald-gradient': "radial-gradient(circle at 50% 20%, #114541 0%, #06201f 60%, #031211 100%)",
      },
      boxShadow: {
        'gold-glow': '0 0 35px -5px rgba(223, 176, 81, 0.35)',
        'gold-sm': '0 0 15px -2px rgba(223, 176, 81, 0.25)',
        'velvet-deep': '0 25px 60px -15px rgba(0, 0, 0, 0.85)',
      }
    },
  },
  plugins: [],
}
