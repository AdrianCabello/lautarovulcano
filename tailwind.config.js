/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#071a14',
        'secondary': '#0a2a1e',
        'accent': '#10b981',
      },
    },
  },
  plugins: [],
} 