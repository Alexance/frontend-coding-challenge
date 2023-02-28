<script setup lang="ts">
import { computed, ref } from "vue";
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  FormInstance,
} from "element-plus";

type FormModelValue = {
  name: string;
};

const props = defineProps<FormModelValue>();

const emit = defineEmits<{
  (event: "update:name", value: FormModelValue["name"]): void;
  (event: "submit"): void;
}>();

const formRef = ref<FormInstance>();

const name = computed({
  get: () => props.name,
  set: (newName) => {
    emit("update:name", newName);
  },
});
</script>

<template>
  <ElForm ref="formRef" :model="props" label-width="50px">
    <ElFormItem label="Name" prop="name">
      <ElInput v-model="name" />
    </ElFormItem>

    <ElFormItem>
      <ElButton type="primary" @click="emit('submit')">Submit</ElButton>
    </ElFormItem>
  </ElForm>
</template>
