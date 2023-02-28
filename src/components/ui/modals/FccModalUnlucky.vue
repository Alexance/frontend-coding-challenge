<script setup lang="ts">
import { ElButton, ElDialog } from "element-plus";

const emit = defineEmits<{
  (event: "close"): void;
}>();
</script>

<template>
  <ElDialog :model-value="true" @click="emit('close')" width="30%" center>
    <span>
      I'm sorry, `<slot name="name"></slot>` is not in today's list of lucky
      names.
    </span>

    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="emit('close')">Ok</ElButton>
      </div>
    </template>
  </ElDialog>
</template>
