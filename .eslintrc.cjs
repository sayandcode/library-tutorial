/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'plugin:@stylistic/recommended-extends',
  ],
  rules: {
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/max-len': ['error', { code: 80, ignoreStrings: true }],
    '@stylistic/array-bracket-newline': ['error', 'consistent'],
    '@stylistic/array-element-newline': ['error', 'consistent'],
  },
};
