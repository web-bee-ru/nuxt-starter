<template>
  <div>
    <span>
      Hello,
      <template v-if="item">{{ item.firstName }} {{ item.lastName }}!</template>
      <template v-else>stranger!</template>
    </span>
    <button @click="increment()">Clicked {{ count }}</button>
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent, PropType } from 'nuxt-composition-api';
  import { Item } from '~/types';

  export default defineComponent({
    props: {
      wtf: { type: null },
      value: { type: [Number, String] },
      item: { type: Object as PropType<Item> },
      ids: { type: Array as PropType<number[]> },
      content: { type: [Array, Object] as PropType<Item | Item[]> },
      formatter: { type: [Function] as PropType<(item: Item) => string> },
    },
    setup() {
      const count = ref(0);

      const increment = () => {
        count.value += 1;
      };

      return { count, increment };
    },
  });
</script>
