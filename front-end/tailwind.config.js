module.exports = {
  purge: ['./src/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      mono: ['ShadedLarch'],
    },
  },
  variants: {},
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
