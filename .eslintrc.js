module.exports = {
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier', 'prettier/vue'],
  rules: {
    // @NOTE: Disabled because it breaks when importing types.
    //        But typescript does this better anyway, so it does not matter.
    'import/named': ['off'],

    // @NOTE: We can rely on hoisting
    'no-use-before-define': ['error', { functions: false, classes: false }],

    // @NOTE: линтер думает, что '@nuxt/types' - локальный пакет
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@nuxt/**',
            group: 'builtin',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],

    'no-restricted-imports': [
      'error',
      {
        paths: [
          // @NOTE: IDE почему-то пытается брать PropType из неправильного пакета. Как это обойти другим путём - не понятно
          {
            name: 'vue',
            importNames: ['PropType'],
            message: 'Use: "import { PropType } from \'nuxt-composition-api\';"',
          },
          // @NOTE: IDE почему-то пытается брать PropType из неправильного пакета. Как это обойти другим путём - не понятно
          {
            name: 'vue/types/umd',
            importNames: ['PropType'],
            message: 'Use: "import { PropType } from \'nuxt-composition-api\';"',
          },
        ],
      },
    ],
  },
};
