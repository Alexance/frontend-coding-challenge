<script setup lang="ts">
import { ElButton, ElDialog } from "element-plus";

const emit = defineEmits<{
  (event: "close"): void;
}>();
</script>

<template>
  <ElDialog :model-value="true" @close="emit('close')" width="30%" center>
    <span>
      I'm sorry, `<slot name="name"></slot>` has already received their prize
      today or yesterday!
    </span>

    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="emit('close')">Ok</ElButton>
      </div>
    </template>
  </ElDialog>
</template>
