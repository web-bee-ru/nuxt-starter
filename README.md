# Nuxt starter project

1. Use WebStorm 2020 or higher.

# Prettier, Eslint, EditorConfig

1. Turn on "Run on save for files:" under Settings > Languages & Frameworks > JavaScript > Prettier.
2. Make sure that `.ts` and `.vue` are included.
3. Turn on "Automatic ESLint configuration" under Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint.

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
3. Methods and computed properties should have explicit return type annotations.

# Known issues

1. Named exports from SFC are not supported, so interface types should be defined in separate `.ts` files.
    - See https://github.com/vuejs/vue-loader/issues/1281
2. Typechecking and autocompletion do not work inside template section.
    - Waiting for https://github.com/znck/vue-developer-experience
3. Return type of `asyncData` is not merged into the type of `this`. Workaround:
   ```
   type AsyncData = {
     value: number;
   };
   export default defineComponent<AsyncData>({
     asyncData(): AsyncData {
       return { value: 1 }
     },
   });
   ```
