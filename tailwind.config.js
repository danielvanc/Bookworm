const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      lm: "400px",
      desktop: "1200px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        rosyWorm: {
          900: "#81334F",
          DEFAULT: "#610023",
        },
        grayWorm: {
          100: "#EEE7E1",
          200: "#EAE2DA",
          300: "#333333",
          800: "#D9D1C9",
          DEFAULT: "#393131",
        },
        peachy: "#DDCCC8",
      },
      fontSize: {
        hSmall: "3.875rem",
        hMedium: "6rem",
        hLarge: "8.4375rem",
        h2Normal: "2rem",
      },
      lineHeight: {
        tighter: 0.8,
      },
      gridTemplateColumns: {
        "main-desktop": "5fr 3fr",
        "header-desktop": "3fr 1fr 2fr 2fr 1fr",
        "main-xl-desktop": "4fr 4fr 4fr",
        "header-xl-desktop": "6fr 6fr",
      },
    },
    fontFamily: {
      fred: ['"Fredoka One"', "cursive"],
      monty: ["Montserrat", "sans-serif"],
      serifPro: ['"Source Serif Pro"', "serif"],
    },
  },
  variants: {},
  plugins: [],
};
