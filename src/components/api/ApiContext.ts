import { InjectionKey } from '@nuxtjs/composition-api';
import { AxiosInstance } from 'axios';

import { NonStrictTaxios, PetsAxios, PetsTaxios } from '~/types/api';

import { nonStrictApi, nonStrictAxios, petsApi, petsAxios } from './defaults';

export interface ApiContextProps {
  petsAxios: PetsAxios;
  petsApi: PetsTaxios;
  nonStrictAxios: AxiosInstance;
  nonStrictApi: NonStrictTaxios;
}

export const defaultValue: ApiContextProps = {
  petsAxios,
  petsApi,
  nonStrictAxios,
  nonStrictApi,
};

export const ApiContextSymbol: InjectionKey<ApiContextProps> = Symbol('ApiContext');
