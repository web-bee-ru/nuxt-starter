<template>
  <div>
    <h4>Error</h4>
    <pre>{{ JSON.stringify(error, null, 2) }}</pre>
  </div>
</template>

<script lang="ts">
  import { NuxtError } from '@nuxt/types';
  import { defineComponent, PropType } from '@nuxtjs/composition-api';
  export default defineComponent({ props: { error: { type: Object as PropType<NuxtError>, required: true } } });
</script>
