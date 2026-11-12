/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fcf8f0',
          100: '#f8eedc',
          200: '#eedcb8',
          300: '#e3c48e',
          400: '#d7a862',
          500: '#c88c3a',
          600: '#b1742e',
          700: '#8e5627',
          800: '#734424',
          900: '#5e3721',
          950: '#341c0f',
        },
        navy: {
          800: '#0f172a',
          900: '#0a0f1d',
          950: '#05070f',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
