/**
 * ESLint configuration
 * Read more: https://eslint.org/docs/user-guide/configuring
 */
module.exports = {
  extends: [
    'airbnb',
    'plugin:import/typescript',
    'plugin:jest/all',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
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
          'src/setupTests.ts',
        ],
      },
    ],
    'jest/prefer-expect-assertions': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
  },
  overrides: [
    {
      files: 'src/**',
      env: { browser: true },
    },
  ],
}
