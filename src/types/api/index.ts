import { Taxios } from '@simplesmiler/taxios';
import { AxiosInstance } from 'axios';

import { PetStore } from '~/types/generated/PetStore';

export type PetsAxios = AxiosInstance;

export type PetsTaxios = Taxios<PetStore>;

export type NonStrictTaxios = Taxios<any, false>;
