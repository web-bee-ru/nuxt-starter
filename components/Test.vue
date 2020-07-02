<template>
  <div>
    <span>Hello, {{ record.firstName }}</span>
    <button @click="increment()">{{ count }}</button>
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent, PropType } from '@vue/composition-api';

  export type Record = {
    firstName: string;
    lastName: string;
  };

  export default defineComponent({
    props: {
      initialCounter: { type: Number, required: true },
      record: { type: Object as PropType<Record>, required: true },
    },
    setup(props) {
      const count = ref(props.initialCounter);

      const increment = () => {
        count.value += 1;
      };

      return { count, increment };
    },
  });
</script>
