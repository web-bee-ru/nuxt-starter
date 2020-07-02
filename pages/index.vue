<template>
  <div>
    <Test :record="record" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/composition-api';
  import { default as Test } from '~/components/Test.vue';
  import { Record } from '~/types';

  export default defineComponent({
    components: { Test },
    setup() {
      const record: Record = {
        firstName: 'John',
        lastName: 'Goodman',
      };
      return { record };
    },
  });
</script>
