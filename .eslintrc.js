const prettierConfig = require('./prettier.config')
module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ['prettier/@typescript-eslint'],
  plugins: ['@typescript-eslint', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    strict: 'error',
    'check-constructor': 'off',
    'no-comma-dangle': 'off',
    'no-empty-interface': 'off',
    'no-unused-vars': 'off',
    'prettier/prettier': ['error', prettierConfig]
  }
}
