/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    colors: {
      primary: "#E61A6B",
      secondary1: "#423D89",
      secondary2: "#03DAC6",
      secondary3: "#FFC4BC",
      secondary4: "#EDE8D7",
      secondary5: "#333333",
      secondary6: "#FFFFFF",
      transparent: "transparent"
    },
    extends: {
      gridTemplateRows: {
        '8': 'repeat(8, minmax(0, 1fr))'
      }
    }
  },
  plugins: [],
}
