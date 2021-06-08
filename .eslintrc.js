module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.json',
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'require-jsdoc': 0,
    'linebreak-style': 0,
  },
  extends: 'google',
};
