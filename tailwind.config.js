const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
        sans: ["Rubik", ...defaultTheme.fontFamily.sans],
      },
    }
  },
  variants: {
    textDecoration: ['responsive', 'hover', 'focus', 'group-hover'],
  },
  content: ["./output/**/*.html", "./output/**/*.js"],
  plugins: [
    require("@tailwindcss/forms"),
  ],
}
