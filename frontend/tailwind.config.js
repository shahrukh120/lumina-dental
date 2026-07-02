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
          50:  '#fbf7ee',
          100: '#f4e9d3',
          200: '#e8d4a8',
          300: '#d9bc77',
          400: '#c9a254',
          500: '#b98a3e',
          600: '#9c7030',
          700: '#7c5726',
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
