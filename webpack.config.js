// @DOC: This file is only used by IDE, and does not participate in build.
//       Go to "Settings -> Language & Frameworks -> Javascript -> Webpack" and choose this file.
// @REFERENCE: https://github.com/nuxt/nuxt.js/issues/2936

const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
