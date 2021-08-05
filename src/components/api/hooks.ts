import { inject } from '@nuxtjs/composition-api';

import { ApiContextSymbol, defaultValue } from './ApiContext';

export function useApi() {
  return inject(ApiContextSymbol, defaultValue);
}
