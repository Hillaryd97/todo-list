/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        almostWhite: "#F9F4f5",
        almostGray: "#D0CCD0",
        lightBlue: "#235789",
        lightRed: "#720E07",
        maroon: "#45050C",
        overlay: "hsla(0, 0%, 0%, 0.3)",
      },
    },
  },
  plugins: [],
}
