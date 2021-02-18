import { defineNuxtMiddleware } from '@nuxtjs/composition-api';

export default defineNuxtMiddleware((ctx) => {
  console.info(`Example middleware is alive: ${ctx.route.path}`);
});
