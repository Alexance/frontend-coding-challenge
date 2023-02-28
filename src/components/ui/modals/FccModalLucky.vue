<script setup lang="ts">
import { ElButton, ElDialog } from "element-plus";

const emit = defineEmits<{
  (event: "update:modelValue", newValue: boolean): void;
  (event: "reject" | "accept"): void;
}>();
</script>

<template>
  <ElDialog :model-value="true" @close="emit('reject')" width="30%" center>
    <span>
      Congratulations, `<slot name="name"></slot>` is a lucky name! You've won a
      prize. Will you accept it?
    </span>

    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="emit('reject')">Reject</ElButton>
        <ElButton type="primary" @click="emit('accept')">Accept</ElButton>
      </div>
    </template>
  </ElDialog>
</template>
