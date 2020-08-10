// @DOC: This file injects Taxios instance into Nuxt application and instructs TypeScript about API typings.
// @NOTE: If you need to use multiple separate APIs, you should create multiple separate Axios instances
//        (e.g. using $axios.create), inject them and correct the type declarations.

import { defineNuxtPlugin } from 'nuxt-composition-api';
import { Taxios } from '@simplesmiler/taxios';
import { PetStore } from '~/types/generated/PetStore';

declare module 'vue/types/vue' {
  // @NOTE: this.$taxios inside Vue components
  export interface Vue {
    $taxios: Taxios<PetStore>;
  }
}

declare module '@nuxt/types' {
  // @NOTE: nuxtContext.app.$taxios inside asyncData, plugins, middleware
  export interface NuxtAppOptions {
    $taxios: Taxios<PetStore>;
  }
  // @NOTE: nuxtContext.$taxios inside asyncData, plugins, middleware
  export interface Context {
    $taxios: Taxios<PetStore>;
  }
}

declare module 'vuex/types/index' {
  // @NOTE: this.$taxios inside vuex
  export interface Store<S> {
    $taxios: Taxios<PetStore>;
  }
}

export default defineNuxtPlugin((ctx, inject): void => {
  const taxios = new Taxios<PetStore>(ctx.$axios);
  inject('taxios', taxios);
});
