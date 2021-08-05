<template>
  <div class="pages-pets">
    <div>Available pets:</div>
    <pre>{{ pets ? JSON.stringify(pets, null, 2) : 'loading...' }}</pre>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from '@nuxtjs/composition-api';

  import { useApi } from '~/components/api';
  import { PetStore } from '~/types/generated/PetStore';

  export default defineComponent({
    setup() {
      const { petsApi } = useApi();

      const pets = ref<PetStore.Pet[] | null>(null);

      onMounted(() => {
        petsApi.get('/pet/findByStatus', { query: { status: 'available' } }).then((res) => (pets.value = res.data));
      });

      return {
        pets,
      };
    },
  });
</script>
