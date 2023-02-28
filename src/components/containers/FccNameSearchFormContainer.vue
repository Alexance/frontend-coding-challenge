<script setup lang="ts">
import { computed, ref } from "vue";

import { useStore } from "@/store";
import { MutationTypes, ActionTypes } from "@/store/modules/players";
import FccNameSearchForm from "@/components/ui/forms/FccNameSearchForm.vue";

type SearchFormInstance = { setTouched(value: boolean): void };

const searchForm = ref<SearchFormInstance>();

const store = useStore();

const name = computed({
  get: () => store.state.players.user.name,
  set: (newName) => {
    store.commit(MutationTypes.SET_USER_NAME, newName);
  },
});

function onSubmit() {
  store.dispatch(ActionTypes.VERIFY_WIN_STATUS);

  if (searchForm.value) {
    // To ensure that the form won't be validated after
    // model data change, it marked as untouched, validation
    // rules won't be applied until the form manually changed
    // @NOTE: it looks like a limitation of Element Plus
    searchForm.value.setTouched(false);
  }
}
</script>

<template>
  <FccNameSearchForm ref="searchForm" v-model:name="name" @submit="onSubmit" />
</template>
