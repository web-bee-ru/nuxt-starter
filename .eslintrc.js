module.exports = {
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier', 'prettier/vue'],
  rules: {
    // @NOTE: Disabled because it breaks when importing types.
    //        But typescript does this better anyway, so it does not matter.
    'import/named': ['off'],

    // @NOTE: We can rely on hoisting
    'no-use-before-define': ['error', { functions: false, classes: false }],
  },
};
