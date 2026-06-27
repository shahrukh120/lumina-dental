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
        // adopt the MaxoDent royal-blue & deep-navy clinical palette.
        indigo: {
          50:  '#eef3fc',
          100: '#d9e6f9',
          200: '#b3ccf2',
          300: '#7da7e8',
          400: '#4f82db',
          500: '#2563c4',
          600: '#1b4ba8',
          700: '#153a85',
          800: '#112d66',
          900: '#0c1f4a',
        },
        gold: {
          50:  '#eaf2ff',
          100: '#cfe1ff',
          400: '#3b82f6',
          500: '#2563eb',
          600: '#1d4ed8',
        },
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'brand': '0 20px 50px -12px rgba(27, 75, 168, 0.35)',
      },
    },
  },
  plugins: [],
}
