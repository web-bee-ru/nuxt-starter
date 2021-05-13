const makeConfig = require('@web-bee-ru/commitlint-config');

module.exports = makeConfig({
  // issuePrefixes: ["EXAMPLE-"],
  // @NOTE: uncomment to override defaults:
  // commitTypes: [
  //   "feat", // @NOTE: implementation of functionality
  //   "fix", // @NOTE: bugfix
  //   "wip", // @NOTE: work in progress
  //   "ci", // @NOTE: continuous integration related issues
  //   "chore", // @NOTE: should be moved in the starter-project
  // ],
});
