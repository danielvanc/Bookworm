import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      lm: "400px",
      desktop: "1200px",
      desktopMax: "1900px",
      ...defaultTheme.screens,
    },

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
        rose: colors.rose,
        rosyWorm: {
          900: "#81334F",
          DEFAULT: "#36003C",
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
        tighter: "0.8",
      },
      padding: {
        sectionMedium: "3rem",
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
  plugins: [
    plugin(function ({
      addVariant,
    }: {
      addVariant: (arg0: string, arg1: string) => void;
    }) {
      addVariant("initial", "html :where(&)");
    }),
  ],
} satisfies Config;
