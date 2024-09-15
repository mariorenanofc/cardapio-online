/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{html,js}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home": "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)), url('/assets/bg.png')"
      }
    },
  },
  plugins: [],
}

