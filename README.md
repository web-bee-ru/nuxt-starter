# Nuxt starter project

1. Use WebStorm 2020 or higher.

# TypeScript and known issues

1. SFC should be annotated with `<script lang="ts">`.
2. Named exports from SFC are not supported
    - See https://github.com/vuejs/vue-loader/issues/1281
3. Typechecking and autocomplete do not work inside template section
    - Waiting for https://github.com/znck/vue-developer-experience

# Prettier & EditorConfig

1. Turn on "Run on save for files:" under Settings > Languages & Frameworks > JavaScript > Prettier.
2. Make sure that `.ts` and `.vue` are included.
