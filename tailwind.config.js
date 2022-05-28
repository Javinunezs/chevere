module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {'fondo-log': "url('/img/fondo-log-hd.png')",},
  },
  plugins: [require('@tailwindcss/forms'),],
}