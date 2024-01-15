/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      primary: "#1565D8",
      dark: {
        thin: "#5A7184",
        hard: "#0D2436",
        soft: "#183B56",
      },
    },
    fontFamily: {
      opensans: ["Open Sans", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
    },
  },
};
export const plugins = [
  { "tailwindcss/nesting": "postcss-nesting" },
  require("@tailwindcss/typography"),
];
