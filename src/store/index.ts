import { InjectionKey } from "vue";
import { createStore, Store, useStore as useVuexStore } from "vuex";

import playersModule from "./modules/players";
import { RootState } from "./state";
import persistedStorage from "./plugins/persistedStorage";

export const key: InjectionKey<Store<RootState>> = Symbol();

export const useStore = () => {
  return useVuexStore(key);
};

export default createStore({
  modules: {
    players: playersModule,
  },
  // @NOTE: the best option is to use `vuex-persist` or `vuex-persistedstorage`
  // packages but the main idea is reflected in the self-written plugin
  plugins: [persistedStorage],
});
