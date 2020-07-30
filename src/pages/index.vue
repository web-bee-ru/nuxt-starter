<template>
  <div>
    <section>
      <h4>Config</h4>
      <pre>{{ JSON.stringify($config, null, 2) }}</pre>
    </section>
    <section>
      <h4>Component</h4>
      <Test :item="item" />
    </section>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'nuxt-composition-api';
  import Test from '~/components/Test.vue';
  import { Item } from '~/types';
  import { withCustomFields } from '~/lib/utils';

  type AsyncData = {
    b: number;
  };

  export default defineComponent({
    components: { Test },
    async asyncData(ctx): Promise<AsyncData> {
      return { b: 3 };
    },
    data() {
      return withCustomFields<AsyncData>()({
        a: 2,
      });
    },
    setup() {
      const item: Item = {
        firstName: 'John',
        lastName: 'Goodman',
      };

      return { item };
    },
    mounted() {
      console.log(process.env.NODE_ENV);
      if (process.env.NODE_ENV === 'development') {
        console.log('You are in development mode');
      }
    },
  });
</script>
