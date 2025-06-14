import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
        parser: '@typescript-eslint/parser',
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },
    plugins: {
        '@typescript-eslint': '@typescript-eslint/eslint-plugin',
    },
    rules: {
        // TypeScript specific rules
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/prefer-const': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',

        // Disable base rules that are covered by TypeScript
        'no-unused-vars': 'off',
        'no-undef': 'off', // TypeScript handles this

        // Next.js Rules
        '@next/next/no-html-link-for-pages': 'error',
        '@next/next/no-img-element': 'warn',
        '@next/next/no-unwanted-polyfillio': 'error',
        '@next/next/no-page-custom-font': 'error',
    },
});

const eslintConfig = [...compat.extends('next/core-web-vitals', 'next/typescript')];

export default eslintConfig;
