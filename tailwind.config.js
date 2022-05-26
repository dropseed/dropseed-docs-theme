const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  // https://twitter.com/davegaeddert/status/1529584314677186561
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    ringOpacity: false,
  },
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
