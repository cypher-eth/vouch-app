/** @type { import('tailwindcss').Config } */
module.exports = {
  content: [
    "./pages/*.{tsx,js}",
    "./pages/**/*.{tsx,js}",
    "./components/*.{tsx,js}",
    "./components/**/*.{tsx,js}",
    "./lib/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        o3: {
          green: "#a6a591",
          pink: "#ff00ff",
          lime: "#00ffab",
        },
        rk: {
          blue: "#0E76FD",
        },
      },
      fontFamily: {
        title: ["var(--font-title)"],
      },
    },
  },
  plugins: [],
}
