# Nuxt starter project

1. Use WebStorm 2020 or higher.
2. Install dependencies: `npm i`.
3. Start developing: `npm run dev`.

# Prettier, Eslint, EditorConfig

1. Turn on "Run on save for files:" under Settings > Languages & Frameworks > JavaScript > Prettier. Make sure that `.ts` and `.vue` are included.
2. Turn on "Automatic ESLint configuration" under Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint.
3. EditorConfig is enabled by default.

# TypeScript

1. SFC should be annotated with `<script lang="ts">`, default export should be wrapped in `defineComponent`.
   ```
   <script lang="ts">
     import { defineComponent } from 'nuxt-composition-api';
     export default defineComponent({
       // ...
     });
   </script>
   ```
2. Non-primitive props should be annotated with `PropOptions<T>`.

   ```
   props: {
     // Primitive
     count: { type: Number },
     value: { type: [Number, String] },
     wtf: { type: null }, // Will become "any" type

     // Non-primitive
     item: { type: Object } as PropOptions<Item>,
     ids: { type: Array } as PropOptions<number[]>,
     content: { type: [Array, Object] } as PropOptions<Item | Item[]>,
     formatter: { type: Function } as PropOptions<(item: Item) => string>,
   },
   ```

3. Methods and computed properties should have explicit type annotations.
4. Nuxt `asyncData` requires special treatment, see `withCustomFields` from `lib/utils.ts`

# Environment variables

1. Nuxt automatically supports `.env` file.
   - In development, you can copy `.env.example` to `.env` and modify it.
   - In continuous integration, `.env` can be created programmatically.
2. To access environmental variables, you have to whitelist them in `nuxt.config.ts`. There are two options for this:
   1. `(public|private)RuntimeConfig` ([docs](https://nuxtjs.org/guide/runtime-config)) maps to `this.$config` and `ctx.$config`. It only supports start-time variables.
      ```
      // nuxt.config.ts
      publicRuntimeConfig: {
        SERVICE_URL: process.env.SERVICE_URL || 'http://localhost:4000',
      },
      ```
      ```
      // some-component.vue
      asyncData(ctx) {
        console.log(ctx.$config);
      },
      mounted() {
        console.log(this.$config);
      },
      ```
   2. `env` ([docs](https://nuxtjs.org/api/configuration-env)) maps to `process.env.<NAME>` and can be used to eliminate code. It only supports build-time variables.
      ```
      // nuxt.config.ts
      env: {
        NODE_ENV: process.env.NODE_ENV,
      },
      ```
      ```
      // some-component.vue
      mounted() {
        if (process.env.NODE_ENV === 'development') {
          console.log('You are in development mode');
        }
      },
      ```

# Error handling

1. Hard error renders the stack trace page in development and `views/error.html` page in production.
   It is triggered by uncaught exception during SSR.
   ```
   asyncData() {
     throw new Error('Hard error');
   },
   ```
2. Soft error renders `layouts/error.vue` page.
   It is triggered by `this.$nuxt.error`, `ctx.error` and by uncaught exception after SSR.

   ```
   asyncData(ctx) {
     // Option 1:
     ctx.error({ message: 'Soft error', statusCode: 500 }); // Code can be different

     // Option 2:
     ctx.error({ message: 'Soft error' }); // Default status code is 500

     // Option 3:
     ctx.error(new Error('Soft error')); // Same as above
   },
   ```

3. @TODO: Notification error.

# Developing inside Docker (optional)

1. On Windows 10:
   1. Install Docker for Windows: https://docs.docker.com/docker-for-windows/install/.
   2. Turn on "Expose daemon on tcp://localhost:2375 without TLS" in Docker Desktop under Settings > General.
   3. Add `.exe` extension to the end of "Docker executable" and "Docker Compose executable" in WebStorm under Settings > Build, Execution, Deployment > Docker > Tools.
   4. Start services from `docker-compose.dev.yml`.
2. On GNU/Linux:
   1. @TODO.

# Known issues

1. Named exports from SFC are not supported, so interface types should be defined in separate `.ts` files.
   - See https://github.com/vuejs/vue-loader/issues/1281
   - Waiting for something like https://github.com/ktsn/vuetype
2. Typechecking and autocomplete is not supported inside template section, neither in IDE nor during compilation.
   - Waiting for https://github.com/znck/vue-developer-experience
3. Vue 2 composition API has some limitations: https://github.com/vuejs/composition-api#limitations
