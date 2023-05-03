/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF617E',
          light: '#FC3060',
          dark: '#B01136'
        },
        secondary: {
          light: '#FFCD49',
          dark: '#FDB137'
        },
        bgself: {
          light: '#F6EFE5',
          dark: '#F1E7D9'
        },
        neutralself: {
          50: '#EBECED',
          100: '#B8BABA',
          200: '#6D6D6E',
          300: '#3A3A3B',
          400: '#080808'
        },
        white: '#FFFFFF',
        textself: '#171717'
      }
    },
    boxShadow: {
      self: '3px 3px 0px 0.5px #000000;',
      transparent: '0px 0px 0px 0px;'
    }
  },
  plugins: [require('flowbite/plugin')]
}
