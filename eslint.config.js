import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  {
    name: 'app/fichiers-surveilles',
    files: ['**/*.{ts,mts,mjs,vue}'],
  },
  {
    name: 'app/ignores',
    ignores: ['dist/**', 'dev-dist/**', 'coverage/**', 'node_modules/**'],
  },
  js.configs.recommended,
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    name: 'app/regles-projet',
    rules: {
      // Garde-fous anti god-file / god-function (cf. /audit-archi)
      'max-lines': ['error', { max: 200, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['error', { max: 50, skipBlankLines: true, skipComments: true }],
      complexity: ['error', 10],
      'max-depth': ['error', 3],
      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    // Les fichiers de données du voyage sont de longues listes littérales,
    // pas de la logique : la limite de lignes n'y a pas de sens.
    name: 'app/donnees-voyage',
    files: ['src/**/donnees/**/*.ts'],
    rules: { 'max-lines': 'off' },
  },
  {
    // Outillage de build : tourne sous Node, écrit sur la sortie standard, et
    // contient du remplissage de polygone par boucles imbriquées.
    name: 'app/scripts',
    files: ['scripts/**/*.mjs'],
    languageOptions: { globals: globals.node },
    rules: {
      'no-console': 'off',
      'max-depth': 'off',
      'max-lines': 'off',
      'max-lines-per-function': 'off',
    },
  },
)
