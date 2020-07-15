<template>
  <div>
    <span>{{ greetings }}</span>
    <button @click="increment()">Clicked {{ count }}</button>
  </div>
</template>

<script lang="ts">
  import { ref, defineComponent, PropOptions } from 'nuxt-composition-api';
  import { Item } from '~/types';

  export default defineComponent({
    props: {
      wtf: { type: null },
      value: { type: [Number, String] },
      item: { type: Object } as PropOptions<Item>,
      ids: { type: Array } as PropOptions<number[]>,
      content: { type: [Array, Object] } as PropOptions<Item | Item[]>,
      formatter: { type: [Function] } as PropOptions<(item: Item) => string>,
    },
    computed: {
      greetings(): string {
        if (this.item) {
          return `Hello, ${this.item.firstName} ${this.item.lastName}!`;
        } else {
          return `Hello, stranger!`;
        }
      },
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
