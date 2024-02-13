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
        "Title": ['1.5rem', {
          letterSpacing: '0.028em',
          fontWeight: '400',
        }],
        "Button": ['1rem', {
          letterSpacing: '0.028em',
          fontWeight: '600',
        }],
        "Input": ['1.5rem', {
          fontWeight: '400',
          lineHeight: '1rem',
        }],
        "InputLabel": ['1.5rem', {
          fontWeight: '400',
        }],
        "InputLabelFocus": ['0.9rem', {
          fontWeight: '400',
          lineHeight: '0.625rem',
        }],
      },

      colors: {
        Primary10: "#362C49",
        Primary20: "#463D57",
        Primary30: "#665E75",
        Primary40: "#9691A0",
        Input10: "#144F99",
        Input20: "#807C87",
        Input30: "#EBEFF5",
        "white": "#FCFDFF",
        "pink-700": "#C3ABC2",
        "blue-400": "#6AA3EB",
      },

      backgroundImage: {
        LoginGradient: 'linear-gradient(-40deg, #6AA3EB, #C3ABC2)',
      },

      opacity: {
        8: ".08",
        24: ".24",
        48: ".48",
      },

      borderWidth: {
        3: "3px",
      },

      boxShadow: {
        'lg': '0 16px 32px 4px rgba(54, 44, 73, 0.2)',
      },
    },
  },
  variants: {},
  plugins: [],
};