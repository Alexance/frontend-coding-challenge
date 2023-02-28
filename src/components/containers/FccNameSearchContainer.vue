<script setup lang="ts">
import { computed } from "vue";

import { useStore } from "@/store";
import { GetterTypes } from "@/store/modules/players";
import FccNameSearchFormContainer from "@/components/containers/FccNameSearchFormContainer.vue";
import FccNameSearchPromptContainer from "@/components/containers/FccNameSearchPromptContainer.vue";
import FccNameSearchWinnersContainer from "@/components/containers/FccNameSearchWinnersContainer.vue";

const store = useStore();

const isStatusAvailable = computed<boolean>(
  () => store.getters[GetterTypes.IS_PLAYER_STATUS_AVAILABLE]
);
</script>

<template>
  <FccNameSearchFormContainer />
  <FccNameSearchPromptContainer v-if="isStatusAvailable" />
  <FccNameSearchWinnersContainer />
</template>
