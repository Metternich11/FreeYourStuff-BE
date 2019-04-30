module.exports = {
  env: {
    browser: true,
    es6: true,
    jquery: true,
    node: true,
    mocha: true
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 8
  },
  plugins: ['json'],
  rules: {
    semi: 'error',
    indent: ['error', 2],
    'keyword-spacing': 'error',
    'linebreak-style': 'error',
    quotes: ['error', 'single'],
    'space-before-blocks': 'error',
    'space-before-function-paren': 'error',
    'no-undef': 'off',
    'no-unused-vars': 'off'
  }
};
