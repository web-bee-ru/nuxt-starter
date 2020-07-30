This directory should contain Nuxt server extensions, e.g. server middleware.

**IMPORTANT**: All necessary files for server extensions should either be in this directory, or imported from `node_modules`.

Example:
```ts
// ~/server/lib/utils.ts
export default function randomNumber() {
  return Math.random();
};
```

```ts
// ~/server/logger.ts
import { defineNuxtServerMiddleware } from 'nuxt-composition-api';
import { randomNumber } from './lib/utils';
export default defineNuxtServerMiddleware((req, res, next) => {
  console.log(randomNumber());
  return next();
});
```
