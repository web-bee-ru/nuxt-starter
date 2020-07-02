<template>
  <div>
    <span>Hello, {{ record.firstName }} {{ record.lastName }}!</span>
    <button @click="increment()">Clicked {{ count }}</button>
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent, PropType } from '@vue/composition-api';
  import { Record } from '~/types';

  export default defineComponent({
    props: {
      record: { type: Object as PropType<Record>, required: true },
    },
    setup(props) {
      const count = ref(0);

      const increment = () => {
        count.value += 1;
      };

      return { count, increment };
    },
  });
</script>
