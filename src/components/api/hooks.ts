import { inject } from '@nuxtjs/composition-api';

import { ApiContextSymbol, defaultValue } from './ApiContext';

/**
 * Returns provided reactive object with your api
 * @example
 * // const { petsApi } = useApi() // bad usage, WON'T WORK!!
 * const api = useApi() // right usage
 * const { data } = await api.petsApi.get('/pet/findByStatus')
 */
export function useApi() {
  return inject(ApiContextSymbol) ?? defaultValue;
}
