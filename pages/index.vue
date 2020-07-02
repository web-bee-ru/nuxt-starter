<template>
  <div>
    <Test :initialCounter="2" :str="'abc'" :record="record" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/composition-api';
  import Test from '~/components/Test.vue';

  export default defineComponent({
    components: { Test },
    setup() {
      return {
        record: {
          firstName: 'Denis',
        },
      };
    },
  });
</script>
