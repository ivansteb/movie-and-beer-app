/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'netflix': '#E50914',
        'hbo': '#9900F8',
        'prime': '#00A8E1',
        'disney': '#11399A',
      }
    },
  },
  plugins: [],
}