<template>
  <div>
    <Test :item="item" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'nuxt-composition-api';
  import Test from '~/components/Test.vue';
  import { Item } from '~/types';

  type AsyncData = {
    b: number;
  };
  export default defineComponent<AsyncData>({
    components: { Test },
    data() {
      return { a: 2 };
    },
    asyncData(): AsyncData {
      return { b: 2 };
    },
    setup() {
      const item: Item = {
        firstName: 'John',
        lastName: 'Goodman',
      };
      return { item };
    },
  });
</script>
