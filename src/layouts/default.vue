<template>
  <ApiProvider :pets-api-base-url="petsApiBaseUrl">
    <div>
      <div class="nav">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/pets" class="nav-link">Pets</NuxtLink>
      </div>
      <Nuxt />
    </div>
  </ApiProvider>
</template>

<script lang="ts">
  import { defineComponent, useContext } from '@nuxtjs/composition-api';

  import { ApiProvider } from '~/components/api';

  export default defineComponent({
    components: { ApiProvider },
    setup() {
      const { $config } = useContext();

      return {
        petsApiBaseUrl:
          (process.server ? $config.axios.baseURL : $config.axios.browserBaseURL) || $config.axios.baseURL,
      };
    },
  });
</script>
