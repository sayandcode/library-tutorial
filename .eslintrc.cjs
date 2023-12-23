/** @type {import('eslint').Linter.Config} */
module.exports = { extends: [
  '@remix-run/eslint-config',
  '@remix-run/eslint-config/node',
  'plugin:@stylistic/recommended-extends',
],
rules: {
  '@stylistic/semi': ['error', 'always'],
  '@stylistic/max-len': ['error', { code: 80, ignoreStrings: true }],
  '@stylistic/array-bracket-newline': ['error', 'consistent'],
  '@stylistic/array-element-newline': ['error', 'consistent'],
  '@stylistic/object-curly-newline': ['error', {
    ObjectExpression: { minProperties: 3 },
    ObjectPattern: { minProperties: 3 },
    ImportDeclaration: { minProperties: 4 },
    ExportDeclaration: { minProperties: 3 },
  }],
} };
