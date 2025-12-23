module.exports = {
  env: { browser: true, es2021: true },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  plugins: ['react', 'react-hooks'],
  rules: {
    'react-refresh/only-export-components': 'off'
  },
  settings: { react: { version: 'detect' } }
};