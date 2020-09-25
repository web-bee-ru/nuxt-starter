import { defineNuxtMiddleware } from 'nuxt-composition-api';

export default defineNuxtMiddleware((ctx) => {
  console.info(`Example middleware is alive: ${ctx.route.path}`);
});
