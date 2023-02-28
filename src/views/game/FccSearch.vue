<script setup lang="ts">
import { ElDivider, ElLink } from "element-plus";

import FccNameSearchContainer from "@/components/containers/FccNameSearchContainer.vue";
import FccNameSearchWinnersContainer from "@/components/containers/FccNameSearchWinnersContainer.vue";
</script>

<template>
  <router-link to="/winners" v-bind="$props" v-slot="{ href, navigate }" custom>
    <ElLink type="primary" v-bind="$attrs" :href="href" @click="navigate">
      Go to the Winners page
    </ElLink>
  </router-link>

  <ElDivider />

  <FccNameSearchContainer />
  <FccNameSearchWinnersContainer class="game-winners-table" />
</template>
