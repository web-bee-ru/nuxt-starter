<template>
  <div>
    <button type="button" @click="increment">click ({{ count }})</button>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from '@nuxtjs/composition-api';

  import { example } from '~/store';

  export default defineComponent({
    setup() {
      const count = computed(() => {
        return example.count;
      });
      const increment = () => {
        example.increment(1);
      };
      return { count, increment };
    },
  });
</script>
