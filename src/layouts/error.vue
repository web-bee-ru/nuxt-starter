<template>
  <ApiProvider :pets-api-base-url="petsApiBaseUrl">
    <div>
      <h4>Error</h4>
      <pre>{{ JSON.stringify(error, null, 2) }}</pre>
    </div>
  </ApiProvider>
</template>

<script lang="ts">
  import { NuxtError } from '@nuxt/types';
  import { defineComponent, PropType, useContext } from '@nuxtjs/composition-api';

  import { ApiProvider } from '~/components/api';

  export default defineComponent({
    components: { ApiProvider },
    props: { error: { type: Object as PropType<NuxtError>, required: true } },
    setup() {
      const { $config } = useContext();

      return {
        petsApiBaseUrl:
          (process.server ? $config.axios.baseURL : $config.axios.browserBaseURL) || $config.axios.baseURL,
      };
    },
  });
</script>
