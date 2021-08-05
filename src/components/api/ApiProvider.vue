<script lang="ts">
  import { defineComponent, provide, reactive, useContext, watch } from '@nuxtjs/composition-api';
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
    setup({ petsApiBaseUrl }) {
      const { $axios } = useContext();

      const petsAxios = $axios.create({
        baseURL: petsApiBaseUrl,
      });

      const petsApi = new Taxios<PetStore>(petsAxios);

      watch(
        () => petsApiBaseUrl,
        () => {
          petsAxios.defaults.baseURL = petsApiBaseUrl;
        },
      );

      const nonStrictAxios = $axios.create({
        baseURL: '/',
      });

      const nonStrictApi = new Taxios<any, false>(nonStrictAxios);

      provide(
        ApiContextSymbol,
        reactive({
          petsAxios,
          petsApi,
          nonStrictAxios,
          nonStrictApi,
        }),
      );
    },
    render() {
      if (!this.$slots.default) {
        throw new Error('ApiProvider: default slot (children) is required');
      }
      return this.$slots.default[0];
    },
  });
</script>
