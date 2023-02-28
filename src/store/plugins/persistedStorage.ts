import { Store } from "vuex";

import { PERSISTED_STORAGE_KEY } from "@/constants/PersistedStorage";

function persistedStorage<S>(store: Store<S>) {
  function saveState(state: S) {
    localStorage.setItem(PERSISTED_STORAGE_KEY, JSON.stringify(state));
  }

  function restoreState() {
    const state = localStorage.getItem(PERSISTED_STORAGE_KEY);

    if (state) {
      let parsedState: S | null = null;

      try {
        parsedState = JSON.parse(state);
      } catch (error) {
        console.error(error);
      }

      if (parsedState) {
        store.replaceState(parsedState);
      }
    }
  }

  // Restore the state when an app is loaded
  restoreState();

  // Save changed state in storage
  store.subscribe((_mutation, state) => {
    saveState(state);
  });
}

export default persistedStorage;
