<template>
  <div>Hello, {{ count }}</div>
</template>

<script>
  export default {
    data() {
      return { count: 0 };
    },
    methods: {
      increment() {
        this.count += 1;
      },
    },
  };
</script>
