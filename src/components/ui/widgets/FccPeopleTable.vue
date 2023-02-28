<script setup lang="ts">
import { Person } from "@/models/Person";

const props = defineProps<{
  data: Person[];
}>();
</script>

<template>
  <ElTable :data="props.data">
    <ElTableColumn type="index" label="#" />
    <ElTableColumn prop="name" label="Name" />
  </ElTable>
</template>
