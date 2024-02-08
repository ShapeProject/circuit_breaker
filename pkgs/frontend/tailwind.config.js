/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      fontFamily: {
        'sans':['Noto Sans'],
      },

      fontSize: {
        '6xl': '56px',
      },

      colors: {
        black: "#362C49",
        'pink-700': '#C3ABC2',
        'blue-400': '#6AA3EB',
      },

      spacing: {
        '18': '72px',
        '26': '104px',
      },
    },
  },
  plugins: [],
}
