import { Taxios } from '@simplesmiler/taxios';
import Axios from 'axios';

import { PetStore } from '~/types/generated/PetStore';

export const petsAxios = Axios.create({
  // @NOTE: Put base config here
  baseURL: '/',
  withCredentials: false,
});

export const nonStrictAxios = Axios.create({
  // @NOTE: Put base config here
  baseURL: '/',
  withCredentials: false,
});

export const petsApi = new Taxios<PetStore>(petsAxios);

export const nonStrictApi = new Taxios<any, false>(nonStrictAxios);
