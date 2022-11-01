module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      poppins: ['Poppins'],
    },
    extend: {
      colors: {
        'acm-canvas': '#161b22',
        'acm-gray': '#292c2f',
        'acm-blue': '#2C91C6',
        'acm-light-blue': '#aed5fa',
        'button-hover': '#3d4043',
      },
    },
  },
  plugins: [],
};
