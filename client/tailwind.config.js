/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia',],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald', ],
      'body': ['"Open Sans"'],
    },
    extend: {
      container: {
        width: {
          DEFAULT: '1310px'
        },
        screens: {
          sm: '600px',
          md: '728px',
          lg: '984px',
          xl: '1310px',
          '2xl': '1310px',
        },
      },
    },
  },
  plugins: [],
}