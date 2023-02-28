<template>
  <div class="container"></div>
  <name-search-response></name-search-response>
</template>

<script>
import NameSearchResponse from "@/components/NameSearchResponse.vue";

export default {
  name: "NameSearcher",
  components: {
    NameSearchResponse,
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 50%;
}
</style>
