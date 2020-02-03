/**
 * ESLint configuration
 * Read more: https://eslint.org/docs/user-guide/configuring
 */
module.exports = {
  extends: [
    'airbnb',
    'plugin:import/typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.{spec,test}.{js,jsx,ts,tsx}',
          './src/setupTests.ts',
        ],
      },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
  },
}
