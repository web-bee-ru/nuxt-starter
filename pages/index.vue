<template>
  <div>
    <Test :item="item" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, getCurrentInstance, useMeta } from 'nuxt-composition-api';
  import { default as Test } from '~/components/Test.vue';
  import { Item } from '~/types';

  export default defineComponent({
    components: { Test },
    data() {
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
