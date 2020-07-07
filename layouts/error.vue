<template>
  <div>
    <h4>Error</h4>
    <pre>{{ JSON.stringify(error, null, 2) }}</pre>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'nuxt-composition-api';
  import { NuxtError } from '@nuxt/types';
  export default defineComponent({
    props: {
      error: {
        type: Object as PropType<NuxtError>,
        required: true,
      },
    },
  });
</script>
