<script setup lang="ts">
import { computed, h, watchEffect } from "vue";
import { ElNotification } from "element-plus";

import { useStore } from "@/store";
import { GetterTypes } from "@/store/modules/players";
import FccNameSearchFormContainer from "@/components/containers/FccNameSearchFormContainer.vue";
import FccNameSearchPromptContainer from "@/components/containers/FccNameSearchPromptContainer.vue";

const store = useStore();

const isStatusAvailable = computed<boolean>(
  () => store.getters[GetterTypes.IS_PLAYER_STATUS_AVAILABLE]
);

watchEffect(() => {
  if (store.getters[GetterTypes.IS_WINNERS_REQUEST_FAILED]) {
    ElNotification({
      title: "API Error",
      message: h(
        "span",
        "An API error occurred during the request to get the Winners list"
      ),
      position: "bottom-right",
      appendTo: "#app",
    });
  }
});
</script>

<template>
  <FccNameSearchFormContainer />
  <FccNameSearchPromptContainer v-if="isStatusAvailable" />
</template>
