<script setup lang="ts">
import { computed } from "vue";

import { useStore } from "@/store";
import { MutationTypes, ActionTypes } from "@/store/modules/players";
import FccNameSearchForm from "@/components/ui/forms/FccNameSearchForm.vue";

const store = useStore();

const name = computed({
  get: () => store.state.players.user.name,
  set: (newName) => {
    store.commit(MutationTypes.SET_USER_NAME, newName);
  },
});

function onSubmit() {
  store.dispatch(ActionTypes.VERIFY_WIN_STATUS);
}
</script>

<template>
  <FccNameSearchForm v-model:name="name" @submit="onSubmit" />
</template>
