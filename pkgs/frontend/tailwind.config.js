/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        18: "72px",
        26: "104px",
      },

      fontFamily: {
        sans: ["Noto Sans"],
      },

      fontSize: {
        "6xl": "56px",
      },

      colors: {
        Primary10: "#362C49",
        Primary20: "#463D57",
        Primary30: "#665E75",
        Primary40: "#9691A0",
        "pink-700": "#C3ABC2",
        "blue-400": "#6AA3EB",
      },

      opacity: {
        8: ".08",
        24: ".24",
        48: ".48",
      },

      borderWidth: {
        3: "3px",
      },
    },
  },
  variants: {},
  plugins: [],
};
