import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';

@Module({
  name: 'example', // @NOTE: same as filename
  namespaced: true,
  stateFactory: true,
})
export default class StoreClass extends VuexModule {
  count: number = 0;

  @Mutation
  incremented(v = 1) {
    this.count += v;
  }

  @Action
  async increment(extra: number) {
    this.incremented(extra);
  }
}
