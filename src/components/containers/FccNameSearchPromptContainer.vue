<script setup lang="ts">
import { computed } from "vue";

import { Person } from "@/models/Person";
import { PlayerStatus } from "@/constants/PlayerStatus";
import { useStore } from "@/store";
import { GetterTypes, MutationTypes } from "@/store/modules/players";
import FccModalLucky from "@/components/ui/modals/FccModalLucky.vue";
import FccModalUnlucky from "@/components/ui/modals/FccModalUnlucky.vue";
import FccModalDuplicate from "@/components/ui/modals/FccModalDuplicate.vue";
import FccModalLimitExceeded from "@/components/ui/modals/FccModalLimitExceeded.vue";

const store = useStore();

const status = computed(() => store.state.players.status);
const name = computed(() => store.state.players.user.name);

function onAccept() {
  // It can't be undefined because the status has already been checked
  const user: Person = store.getters[GetterTypes.GET_WINNER];

  store.commit(MutationTypes.ADD_TODAY_WINNER, user);
  store.commit(MutationTypes.SET_PLAYER_STATUS, PlayerStatus.NO_DETAILS); // To hide the modal window
  store.commit(MutationTypes.SET_USER_NAME, "");
}

function onReject() {
  store.commit(MutationTypes.SET_PLAYER_STATUS, PlayerStatus.NO_DETAILS);
}
</script>

<template>
  <FccModalLucky
    v-if="status === PlayerStatus.WIN"
    @accept="onAccept"
    @reject="onReject"
    data-test="fcc-modal-lucky"
  >
    <template #name>{{ name }}</template>
  </FccModalLucky>

  <FccModalUnlucky
    v-else-if="status === PlayerStatus.NO_WIN"
    @close="onReject"
    data-test="fcc-modal-unlucky"
  >
    <template #name>{{ name }}</template>
  </FccModalUnlucky>

  <FccModalDuplicate
    v-else-if="status === PlayerStatus.DUPLICATE"
    @close="onReject"
  >
    <template #name>{{ name }}</template>
  </FccModalDuplicate>

  <FccModalLimitExceeded
    v-else-if="status === PlayerStatus.LIMIT_EXCEEDED"
    @close="onReject"
  />
</template>
