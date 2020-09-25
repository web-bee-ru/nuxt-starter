import { getAccessorType } from 'typed-vuex';
import * as example from '~/store/example';

export const accessorType = getAccessorType({
  modules: {
    example,
  },
});

declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accessorType;
  }
}
