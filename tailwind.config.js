const { backgroundPosition } = require("tailwindcss/defaultTheme");
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      lm: "400px",
      desktop: "1200px",
      ...defaultTheme.screens,
    },
    // Small mobile
    // background-size: 106% 50%;
    // background-position: -1123% 0;

    // 400+
    // background-size: 105% 77%;
    // background-position: -1310% 0;
    extend: {
      backgroundImage: {
        loggedOut: `url('/images/book-stack-bg.png')`,
        loggedOutMobile: `url('/images/book-stack-bg-right.jpg')`,
      },
      backgroundSize: {
        loggedOutSize: "45% 100%",
        loggedOutSizeSmMobile: "106% 100%",
        loggedOutSizeMobile: "106% 100%",
        loggedOutSizeTablet: "105% 110%",
      },
      backgroundPosition: {
        loggedOutPosMobile: "-1123% 0",
        loggedOutPosSmMobile: "-1310% 0",
        loggedOutPosTablet: "-1090% 0",
      },
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
