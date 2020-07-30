This folder should contain Nuxt server middleware, written in TypeScript.

Docs: https://nuxtjs.org/api/configuration-servermiddleware/

Example:
```ts
// ./logger.ts
import { defineNuxtServerMiddleware } from 'nuxt-composition-api';
export default defineNuxtServerMiddleware((req, res, next) => {
  console.log(req.url);
  return next();
});
```
