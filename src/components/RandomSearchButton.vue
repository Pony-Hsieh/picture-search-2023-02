<script setup lang="ts">
import { useRouter } from "vue-router";
import randomWords from "random-words";

const router = useRouter();
function doRandomSearch() {
  router.push({
    path: "/search",
    query: {
      q: randomWords(1)[0],
    },
  });
}
</script>

<template>
  <button
    type="button"
    @click="doRandomSearch"
    class="flex justify-center items-center px-3 py-2 bg-orange-500 text-white rounded-full"
  >
    試試好手氣！
  </button>
</template>
