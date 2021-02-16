import { actionTree, getterTree, mutationTree } from 'nuxt-typed-vuex';

export const state = () => ({
  data: 'example',
});

export const getters = getterTree(state, {
  getData: (state) => `Data from getter: ${state.data}`,
});

export const mutations = mutationTree(state, {
  dataChanged(state, newValue: string) {
    state.data = newValue;
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    setData({ commit }, newData: string) {
      commit('dataChanged', newData);
    },
  },
);
