<script setup lang="ts">
import SearchBar from "../components/SearchBar.vue";
import RandomSearchButton from "../components/RandomSearchButton.vue";
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <SearchBar />
    <div class="flex justify-center items-center mt-6 w-full">
      <RandomSearchButton />
    </div>
  </div>
</template>
