<script setup lang="ts">
import { computed, ref } from "vue";
import {
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  FormInstance,
  FormItemRule,
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

const rules = computed<Record<keyof FormModelValue, FormItemRule[]>>(() => ({
  name: [
    {
      required: true,
      message: "The field value is required",
    },
    {
      pattern: new RegExp(/^[a-zA-Z]+$/),
      message: "The field value must contain only letters",
    },
    {
      min: 2,
      message: "The length of the name should be at least 2 letters",
    },
  ],
}));

const name = computed({
  get: () => props.name,
  set: (newName) => {
    emit("update:name", newName);
  },
});

async function onFormSubmit(formInstance: FormInstance | undefined) {
  if (!formInstance) {
    return;
  }

  const isValid = await formInstance.validate();

  if (isValid) {
    emit("submit");
  }
}
</script>

<template>
  <ElForm ref="formRef" :model="props" :rules="rules" label-width="50px">
    <ElFormItem label="Name" prop="name">
      <ElInput v-model="name" />
    </ElFormItem>

    <ElFormItem>
      <ElButton type="primary" @click="onFormSubmit(formRef)">Submit</ElButton>
    </ElFormItem>
  </ElForm>
</template>
