
module.exports = {
    content: [
      // './pages/**/*.{html,js}',
      // './components/**/*.{html,js}',
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        inset:{
          '1/5':'20.0%',
          '2/5':'40.0%',
          '3/5':'60.0%',
          '4/5':'80.0%',
        },
        width:{
          '1/8':'12.5%'
        }
      },
    },
    plugins: [],
  }
  