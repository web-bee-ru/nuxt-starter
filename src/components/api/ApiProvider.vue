<script lang="ts">
  import { computed, defineComponent, provide, reactive, useContext } from '@nuxtjs/composition-api';
  import { Taxios } from '@simplesmiler/taxios';

  import { PetStore } from '~/types/generated/PetStore';

  import { ApiContextSymbol } from './ApiContext';

  export default defineComponent({
    props: {
      petsApiBaseUrl: {
        type: String,
        required: true,
      },
    },
    setup({ petsApiBaseUrl }, { slots }) {
      const { $axios } = useContext();

      const petsAxios = computed(() =>
        $axios.create({
          baseURL: petsApiBaseUrl,
        }),
      );

      const petsApi = computed(() => new Taxios<PetStore>(petsAxios.value));

      const nonStrictAxios = computed(() =>
        $axios.create({
          baseURL: '/',
        }),
      );

      const nonStrictApi = computed(() => new Taxios<any, false>(nonStrictAxios.value));

      // @NOTE: Context.Provider alternative
      provide(
        ApiContextSymbol,
        reactive({
          petsAxios,
          petsApi,
          nonStrictAxios,
          nonStrictApi,
        }),
      );

      return () => {
        if (!slots.default) {
          throw new Error('ApiProvider: default slot (children) is required');
        }
        return slots.default();
      };
    },
  });
</script>
