import { InjectionKey } from "vue";
import { createStore, Store, useStore as useVuexStore } from "vuex";

import playersModule from "./modules/players";
import { RootState } from "./state";

export const key: InjectionKey<Store<RootState>> = Symbol();

export const useStore = () => {
  return useVuexStore(key);
};

export default createStore({
  modules: {
    players: playersModule,
  },
});
