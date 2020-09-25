<template>
  <div class="pages-index">
    <section>
      <h4>Config</h4>
      <pre>{{ JSON.stringify($config, null, 2) }}</pre>
    </section>
    <section>
      <h4>Component</h4>
      <Test :item="item" />
    </section>
    <section>
      <h4>Styles</h4>
      <div>
        <span>Primary color:</span>
        <span class="color-block primary"></span>
      </div>
      <div>
        <span>Secondary color:</span>
        <span class="color-block secondary"></span>
      </div>
      <div>
        <span>Bootstrap blue color:</span>
        <span class="color-block bootstrap-blue"></span>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'nuxt-composition-api';
  import Test from '~/components/Test.vue';
  import { withCustomFields } from '~/lib/utils';
  import { Item } from '~/types';
  type AsyncData = { b: number };
  export default defineComponent({
    components: { Test },
    async asyncData(_ctx): Promise<AsyncData> {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { b: 3 };
    },
    data() {
      return withCustomFields<AsyncData>()({ a: 2 });
    },
    computed: {
      exampleStoreData() {
        return this.$accessor.example.data;
      },
    },
    watch: {
      exampleStoreData: {
        immediate: true,
        handler() {
          console.info(this.exampleStoreData);
        },
      },
    },
    setup() {
      const item: Item = { firstName: 'John', lastName: 'Goodman' };
      return { item };
    },
    mounted() {
      console.info(process.env.NODE_ENV);
      if (process.env.NODE_ENV === 'development') {
        console.info('You are in development mode');
      }
      this.$accessor.example.setData('updated example data');
    },
  });
</script>

<style lang="scss" scoped>
  @use "~@/assets/vars" as vars;
  @use "~@/assets/plugins/bootstrap/vars" as bvars;
  .color-block {
    display: inline-block;
    vertical-align: middle;
    width: 3em;
    height: 1em;
  }
  .color-block.primary {
    background-color: vars.$primary;
  }
  .color-block.secondary {
    background-color: vars.$secondary;
  }
  .color-block.bootstrap-blue {
    background-color: bvars.$blue;
  }
</style>
