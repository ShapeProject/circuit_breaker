/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        /* ~359, 360~767, 768~1279, 1280~1365, 1366~1919, 1920~ */
        "2xs": { max: "359px" },
        xs: { max: "767px" },
        sm: { max: "1279px" },
        md: { max: "1365px" },
        lg: { max: "1919px" },
        xl: { min: "1920px" },
      },

      spacing: {
        18: "72px",
        26: "104px",

        "31pct": "31%",
        "68pct": "68%",
        "85pct": "85%",
        "89pct": "89%",
        "92pct": "92%",
      },

      fontFamily: {
        sans: ["Noto Sans"],
        mono: ["Noto Sans Mono"],
      },

      fontSize: {
        sm: [
          "0.9rem",
          {
            lineHeight: "1.25rem",
            fontWeight: "400",
          },
        ],

        base: [
          "1rem",
          {
            lineHeight: "1.375rem",
            fontWeight: "400",
          },
        ],

        "2xl": [
          "1.5rem",
          {
            lineHeight: "2.06rem",
            fontWeight: "400",
          },
        ],

        "4xl": [
          "2.5rem",
          {
            lineHeight: "3.375rem",
            letterSpacing: "-0.032em",
            fontWeight: "500",
          },
        ],

        "5xl": [
          "3rem",
          {
            lineHeight: "4.06rem",
            letterSpacing: "-0.032em",
            fontWeight: "500",
          },
        ],

        "6xl": [
          "3.5rem",
          {
            lineHeight: "4.75rem",
            letterSpacing: "-0.032em",
            fontWeight: "500",
          },
        ],

        Title: [
          "1.5rem",
          {
            letterSpacing: "0.028em",
            fontWeight: "400",
          },
        ],

        BodyStrong: [
          "1rem",
          {
            fontWeight: "500",
          },
        ],

        BodyMono: [
          "1.5rem",
          {
            fontWeight: "400",
          },
        ],

        ButtonMd: [
          "1rem",
          {
            letterSpacing: "0.028em",
            fontWeight: "500",
          },
        ],
        ButtonLg: [
          "1rem",
          {
            letterSpacing: "0.028em",
            fontWeight: "600",
          },
        ],

        InputLg: [
          "1.5rem",
          {
            fontWeight: "400",
          },
        ],
        InputMd: [
          "1.125rem",
          {
            fontWeight: "400",
          },
        ],
        InputSm: [
          "1rem",
          {
            fontWeight: "400",
          },
        ],
        InputLabelLg: [
          "1.5rem",
          {
            fontWeight: "400",
          },
        ],
        InputLabelMd: [
          "1.125rem",
          {
            fontWeight: "400",
          },
        ],
        InputLabelSm: [
          "1rem",
          {
            fontWeight: "400",
          },
        ],
        InputLabelFocusLg: [
          "0.9rem",
          {
            fontWeight: "400",
          },
        ],
        InputLabelFocusMd: [
          "0.9rem",
          {
            fontWeight: "400",
          },
        ],
        InputLabelFocusSm: [
          "0.8rem",
          {
            fontWeight: "400",
          },
        ],

        AvgScore: [
          "6rem",
          {
            fontWeight: "500",
          },
        ],

        logoMd: [
          "0.9rem",
          {
            lineHeight: "1.25rem",
            letterSpacing: "-0.04em",
            fontWeight: "600",
          },
        ],
        logoLg: [
          "1.5rem",
          {
            lineHeight: "2.06rem",
            letterSpacing: "-0.04em",
            fontWeight: "600",
          },
        ],
      },

      colors: {
        Primary10: "#362C49",
        Primary20: "#463D57",
        Primary30: "#665E75",
        Primary40: "#6E677A",
        Primary50: "#9691A0",
        Primary60: "#E8E8ED",
        Input10: "#144F99",
        Input20: "#807C87",
        Input30: "#EBEFF5",
        Gray10: "#DCDBE2",
        Gray20: "#ECECF1",
        Gray30: "#F9F9FA",
        white: "#FCFDFF",
        "pink-700": "#C3ABC2",
        "blue-400": "#6AA3EB",
      },

      backgroundImage: {
        LoginGradient: "linear-gradient(-40deg, #6AA3EB, #C3ABC2)",
      },

      opacity: {
        8: ".08",
        24: ".24",
      },

      borderWidth: {
        3: "3px",
        12: "12px",
        24: "24px",
        40: "40px",
      },

      boxShadow: {
        md: "6px 6px 8px 0 rgba(220, 219, 226, 0.24)",
        lg: "0 16px 32px 4px rgba(54, 44, 73, 0.2)",
      },
    },
  },
  variants: {},
  plugins: [],
};
