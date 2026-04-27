/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Fraunces', 'Playfair Display', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Override "indigo" so existing utility classes (indigo-50..900)
        // adopt the new professional deep teal-navy clinical palette.
        indigo: {
          50:  '#eef4f6',
          100: '#d6e3e8',
          200: '#b0c8d0',
          300: '#85a8b3',
          400: '#5a8693',
          500: '#356676',
          600: '#1f4a55',
          700: '#163842',
          800: '#102a32',
          900: '#0a1c22',
        },
        gold: {
          50:  '#faf6ee',
          100: '#f1e6cc',
          400: '#cba265',
          500: '#b58a4a',
          600: '#947038',
        },
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'brand': '0 20px 50px -12px rgba(31, 74, 85, 0.35)',
      },
    },
  },
  plugins: [],
}
