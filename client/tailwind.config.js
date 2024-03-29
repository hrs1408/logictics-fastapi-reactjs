/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      container: {
        width: {
          DEFAULT: '1280px',
        },
        screens: {
          sm: '600px',
          md: '728px',
          lg: '984px',
          xl: '1280px',
          '2xl': '1280px',
        },
      },
    },
  },
  plugins: [],
}
