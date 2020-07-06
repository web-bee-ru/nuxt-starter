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

# Environment variables

1. Nuxt automatically supports `.env` file.
    - In development, you can copy `.env.example` to `.env` and modify it.
    - In continuous integration, `.env` can be created programmatically.
2. To access environmental variables, you have to whitelist them in `nuxt.config.ts`. There are two options for this:
    1. `(public|private)RuntimeConfig` ([docs](https://nuxtjs.org/guide/runtime-config)) maps to `$config`. It only supports start-time variables.
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

# Known issues

1. Named exports from SFC are not supported, so interface types should be defined in separate `.ts` files.
    - See https://github.com/vuejs/vue-loader/issues/1281
2. Typechecking and autocompletion is not supported inside template section.
    - Waiting for https://github.com/znck/vue-developer-experience
3. Vue 2 composition API has some limitations: https://github.com/vuejs/composition-api#limitations
