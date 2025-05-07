// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pkg from '@typescript-eslint/eslint-plugin';

const rules = pkg;

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      // Enable stylistic rules like spacing, quotes, etc.
      'space-in-parens': ['error', 'never'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'indent': ['error', 2],
      // Add other stylistic rules as you need
    },
  }
);