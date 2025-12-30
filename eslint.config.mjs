import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module', 
      globals: {
        ...globals.node,    
        ...globals.express  
      }
    },

    rules: {
      'no-var': 'error',
      'prefer-const': 'error',

      'quotes': ['error', 'single'],

      'semi': ['error', 'never'],

      'no-console': 'off',

      'no-unused-vars': 'warn',      
      'no-multiple-empty-lines': ['error', { 'max': 1 }] 
    }
  }
]