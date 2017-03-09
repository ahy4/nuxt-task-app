module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    "comma-dangle": 0,
    "semi": [1, "always"],
    "space-before-function-paren": 0
  },
  globals: {}
}
