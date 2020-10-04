module.exports = {
  root: true,
  extends: 'airbnb',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react'],
  env: {
    jest: true
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  rules: {
    semi: 'off',
    'comma-dangle': ['error', 'never'],
    'import/no-unresolved': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.jsx', '.ts', '.tsx']
      }
    ],
    'react/jsx-closing-bracket-location': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        mjs: 'never'
      }
    ],
    'no-unused-vars': 'off',
    'operator-linebreak': 'off',
    'object-curly-newline': 'off',
    'react/jsx-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'function-paren-newline': 'off'
  }
}

// module.exports = {
//   root: true,
//   extends: '@react-native-community',
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint']
// }

// module.exports = {
//   env: {
//     browser: true,
//     es6: true,
//     jest: true
//   },
//   extends: [
//     'airbnb',
//     'airbnb/hooks',
//     'plugin:react/recommended',
//     'airbnb-typescript',
//     'plugin:@typescript-eslint/recommended',
//     'prettier/@typescript-eslint',
//     'plugin:prettier/recommended',
//     'plugin:react/recommended',
//     'plugin:jsx-a11y/recommended'
//   ],
//   globals: {
//     Atomics: 'readonly',
//     SharedArrayBuffer: 'readonly'
//   },
//   plugins: ['@typescript-eslint', 'react', 'jsx-a11y'],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     project: './tsconfig.json',
//     ecmaFeatures: {
//       jsx: true
//     },
//     ecmaVersion: 2018,
//     sourceType: 'module'
//   },
//   settings: {
//     'import/resolver': {
//       node: {
//         extensions: ['.js', '.jsx', '.ts', '.tsx']
//       }
//     }
//   },
//   rules: {
//     semi: ['error', 'never'],
//     '@typescript-eslint/semi': ['error', 'never'],
//     'comma-dangle': ['error', 'never'],
//     'jsx-quotes': ['error', 'prefer-single'],
//     'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
//     'import/extensions': [
//       'error',
//       'ignorePackages',
//       {
//         js: 'never',
//         jsx: 'never',
//         ts: 'never',
//         tsx: 'never'
//       }
//     ],
//     'no-unused-vars': 'off',
//     'arrow-parens': 'off',
//     'react/jsx-props-no-spreading': 'off',
//     'implicit-arrow-linebreak': 'off',
//     'react/jsx-curly-newline': 'off',
//     'function-paren-newline': 'off',
//     'react/jsx-one-expression-per-line': 'off',
//     'operator-linebreak': 'off',
//     'no-nested-ternary': 'off',
//     'object-curly-newline': 'off'
//   }
// }
