<script setup lang="ts">
import { computed } from "vue";

import { useStore } from "@/store";
import FccPeopleTable from "@/components/ui/widgets/FccPeopleTable.vue";

const store = useStore();

const winners = computed(() => store.state.players.todayWinners);
const hasWinners = computed(() => winners.value.length > 0);
</script>

<template>
  <div v-if="hasWinners">
    <span>The winners are:</span>
    <FccPeopleTable :data="winners" />
  </div>
</template>
