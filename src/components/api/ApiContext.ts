import { reactive } from '@nuxtjs/composition-api';
import { InjectionKey, UnwrapRef } from '@vue/composition-api';
import { AxiosInstance } from 'axios';

import { nonStrictApi, nonStrictAxios, petsApi, petsAxios } from '~/components/api/defaults';
import { NonStrictTaxios, PetsAxios, PetsTaxios } from '~/types/api/index';

export interface ApiContextProps {
  petsAxios: PetsAxios;
  petsApi: PetsTaxios;
  nonStrictAxios: AxiosInstance;
  nonStrictApi: NonStrictTaxios;
}

export const defaultValue: UnwrapRef<ApiContextProps> = reactive({
  petsAxios,
  petsApi,
  nonStrictAxios,
  nonStrictApi,
});

export const ApiContextSymbol: InjectionKey<UnwrapRef<ApiContextProps>> = Symbol('ApiContext');
