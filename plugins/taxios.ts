// @DOC: This file injects Taxios instance into Nuxt application and instructs TypeScript about API typings.
// @NOTE: If you need to use multiple separate APIs, you should create multiple separate Axios instances
//        (e.g. using $axios.create), inject them and correct the type declarations.

import { defineNuxtPlugin } from 'nuxt-composition-api';
import { Taxios } from '@simplesmiler/taxios';
import { PetStore } from '~/types/generated/PetStore';

import 'vue/types/vue';
import '@nuxt/types';
import 'vuex/types/index';

declare module 'vue/types/vue' {
  export interface Vue {
    $taxios: Taxios<PetStore>;
  }
}

declare module '@nuxt/types' {
  export interface Context {
    $taxios: Taxios<PetStore>;
  }
}

declare module 'vuex/types/index' {
  export interface Store<S> {
    $taxios: Taxios<PetStore>;
  }
}

export default defineNuxtPlugin((ctx, inject): void => {
  const taxios = new Taxios<PetStore>(ctx.$axios);
  inject('taxios', taxios);
});
