module.exports = {
  extends: ['@nuxtjs/eslint-config-typescript', 'prettier', 'prettier/vue'],
  rules: {
    // @NOTE: Disabled because it breaks when importing types.
    //        But typescript does this better anyway, so it does not matter.
    'import/named': ['off'],
  },
};
