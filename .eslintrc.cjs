const path = require('path');

/**
 * @type {import('eslint').Linter.LegacyConfig}
 */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
    tailwindcss: {
      calless: ['cn'],
      config: path.join(__dirname, './tailwind.config.js'),
    },
  },
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'src/stories/*',
    'vite-env.d.ts',
    'vite.config.ts',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    projectService: true,
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'es2020',
    ecmaFeatures: { modules: true },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      parser: '@typescript-eslint/parser',
    },
  ],
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/stylistic',
    'plugin:tailwindcss/recommended',
    'prettier',
    'plugin:storybook/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    '@stylistic/js',
    'import',
    'simple-import-sort',
    'check-file',
    'prettier',
    'react-refresh',
    'write-good-comments',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        singleQuote: true,
      },
    ],
    'check-file/folder-match-with-fex': [
      'error',
      {
        '*.test{s,}.{ts,tsx}': '**/__tests__/',
        '*.stories.{tsx}': '**/__stories__/',
        '*.mock{s,}.{ts,tsx}': '**/__mocks__/',
      },
    ],

    'check-file/filename-naming-convention': [
      'error',
      {
        '**/*.{jsx,tsx, js,ts}': 'KEBAB_CASE',
      },
      {
        ignoreMiddleExtensions: true,
      },
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Node.js builtins
          ['^node:'],
          // Packages
          ['^@?\\w'],
          // Absolute imports and other imports such as `@/foo`
          // Anything that does not start with a dot
          ['^[^.]'],
          // Relative imports
          // Anything that starts with a dot
          ['^\\.'],
          // Style imports
          ['^.+\\.s?css$'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'import/no-duplicates': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/no-array-index-key': 'warn',
    'no-console': 'warn',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
        custom: {
          regex: '^E[A-Z]',
          match: true,
        },
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will', 'show'],
      },
      {
        selector: 'variable',
        modifiers: ['destructured'],
        format: null,
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
    ],
    'react-refresh/only-export-components': ['warn'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@stylistic/js/no-multiple-empty-lines': ['error', { max: 2 }],
    '@stylistic/js/multiline-comment-style': ['error', 'starred-block'],
    'write-good-comments/write-good-comments': 'warn',
  },
};
