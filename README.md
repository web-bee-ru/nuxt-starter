# Nuxt starter project

1. Use WebStorm 2020.2.1+.
2. Install dependencies: `npm i`.
3. Start developing: `npm run dev`.

# Prettier, Eslint, Stylelint, EditorConfig

1. Turn on "Run on save for files:" under Settings > Languages & Frameworks > JavaScript > Prettier. Make sure that `.ts` and `.vue` are included.
2. Turn on "Automatic ESLint configuration" under Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint.
3. Turn on "Enable" and "Process JS files" under Settings > Languages & Frameworks > Style Sheets > Stylelint.
4. EditorConfig is enabled by default.

# TypeScript and Vue

1. SFC should be annotated with `<script lang="ts">`, default export should be wrapped in `defineComponent`.
   ```
   <script lang="ts">
     import { defineComponent } from 'nuxt-composition-api';
     export default defineComponent({
       // ...
     });
   </script>
   ```
2. Non-primitive props should be annotated with `PropType<T>`.

   ```
   props: {
     // Primitive
     count: { type: Number },
     value: { type: [Number, String] },
     wtf: { type: null }, // Will become "any" type

     // Non-primitive
     item: { type: Object as PropType<Item> },
     ids: { type: Array as PropType<number[]> },
     content: { type: [Array, Object] as PropType<Item | Item[]> },
     formatter: { type: Function as PropType<(item: Item) => string> },
   },
   ```

3. Methods and computed properties should have explicit type annotations.
4. Nuxt `asyncData` requires special treatment, see `withCustomFields` from `lib/utils.ts`

# Styles

1. Starter project comes with Bootstrap 4. You can remove it if you don't need it,
   or use as an example of how to add another framework.
2. Project-wide styles go to `~/assets/main.scss`.
3. Inside SCSS files and style sections, refer to other files as:
   - `~@/assets/...` for project files.
   - `~bootstrap/...` for files from `node_modules`.
4. Inside SFC, prefer `@use` with namespaces instead of `@import`.
   ```
   <style lang="scss" scoped>
     @use "~@/assets/vars" as vars;
     @use "~@/assets/plugins/bootstrap/vars" as bvars;
     .text {
       color: vars.$primary;
       background-color: bvars.$gray-100;
     }
   </style>
   ```

# Rest API

1. API typings are generated based on Swagger/OpenAPI provided by backend. See `generate:api` script inside `package.json`.
2. Use `$taxios` instead of `$axios`. WebStorm provides auto-completion and type checking for url, body, params and query.
   See [taxios docs](https://github.com/simplesmiler/taxios/tree/master/packages/taxios) for details.
3. If you encounter an issue with generated types, you should:
   - Report about Swagger/OpenAPI issue.
   - Temporary use `$taxios.unsafe.<method>` instead of `$taxios.<method>` until Swagger/OpenAPI is fixed.

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

# Build

Features:

- TypeScript support everywhere, including Nuxt config and server middleware.
  Source code lives inside `./src`.
- Production does not depend on TypeScript and other build-time dependencies.
  TypeScript files that are not bundled by Nuxt are compiled into `./build`.
  During start, `srcDir` is chosen based on location of Nuxt config.

With Docker:

1. Produce `.env` file (optional).
2. Build with `docker build` ([docs](https://docs.docker.com/engine/reference/commandline/build/)).
3. Deliver docker image to production.
4. Start with `docker-compose` ([docs](https://docs.docker.com/compose/)) or `docker run` ([docs](https://docs.docker.com/engine/reference/run/)).

Without Docker:

1. Produce `.env` file (optional).
2. Build with `npm ci && npm run build`.
3. Deliver files to production:
   - `build/**`
   - `.nuxt/**`
   - `.env`
   - `package.json`
   - `package-lock.json`
4. Start with `npm ci --production && npm run start`.

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
2. Type checking and auto-completion is not supported inside template section, neither in IDE nor during compilation.
   - Waiting for https://github.com/znck/vue-developer-experience
3. Vue 2 composition API has some limitations: https://github.com/vuejs/composition-api#limitations.
4. Vuelidate does not have Composition API + TypeScript support yet, see https://github.com/vuelidate/vuelidate/issues/684.
