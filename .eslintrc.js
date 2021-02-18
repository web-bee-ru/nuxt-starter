module.exports = {
  plugins: ['import', 'vue', 'simple-import-sort'],
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier', 'prettier/vue'],
  rules: {
    // @NOTE: Disabled because it breaks when importing types.
    //        But typescript does this better anyway, so it does not matter.
    'import/named': ['off'],

    // @NOTE: We can rely on hoisting
    'no-use-before-define': ['error', { functions: false, classes: false }],

    // @NOTE: some of logs are okay
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],

    // @NOTE: simple-import-sort requires to turn off other import-related sorting rules
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
