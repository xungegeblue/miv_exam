
const {
  defaultPreset,
  createPreset
} = require('tailwindcss-miniprogram-preset')

module.exports = {
	content: ["./miniprogram/**/*.{wxml,js}"],
  theme: {
    extend: {},
  },
	plugins: [],
	presets: [defaultPreset]
}