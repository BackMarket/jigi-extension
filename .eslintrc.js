/**
 * ESLint configuration
 * Read more: https://eslint.org/docs/user-guide/configuring
 */
module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.{spec,test}.{js,jsx,ts,tsx}'] },
    ],
  },
}
