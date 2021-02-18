<template>
  <div>
    <span>{{ greetings }}</span>
    <button class="btn btn-sm btn-primary" @click="increment()">Clicked {{ count }}</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref } from '@nuxtjs/composition-api';

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
    computed: {
      greetings(): string {
        if (this.item) {
          return `Hello, ${this.item.firstName} ${this.item.lastName}!`;
        } else {
          return `Hello, stranger!`;
        }
      },
    },
  });
</script>
