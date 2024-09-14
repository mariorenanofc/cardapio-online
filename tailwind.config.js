/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.{html,js}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home": "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1)), url('/assets/bg.png')"
      }
    },
  },
  plugins: [],
}

