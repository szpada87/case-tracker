/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  darkMode: 'class', // class, 'media' or boolean
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      height: {
        '38px': '38px'
      },
      colors: {
        ct_bg: colors.gray,
        ct_text: colors.gray,
        ct_link_active: colors.pink[400],
        ct_btn_bg: colors.gray,
        ct_accent: colors.green,
        ct_alert: colors.red,
        ct_focus: colors.blue
      }
    },
  },
  plugins: [],
}

