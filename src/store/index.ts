// @NOTE: должен быть перед импортом всех сторов
import './_config';

import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';

import ExampleStore from './example';

// eslint-disable-next-line import/no-mutable-exports
let example: ExampleStore;

function initialiseStores(store: Store<any>): void {
  example = getModule(ExampleStore, store);
}

const initializer = (store: Store<any>) => initialiseStores(store);
const plugins = [initializer];

export {
  example,
  plugins, // @NOTE: required by nuxt
};
