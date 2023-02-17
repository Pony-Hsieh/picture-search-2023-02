<template>
  <div class="flex justify-center items-center">
    <img
      :src="singlePhotoData.src.portrait"
      :alt="singlePhotoData.alt"
      class="mw-full mh-full"
    />
  </div>
</template>

<!-- TODO: 嘗試用 <script setup lang="ts"></script> 改寫看看-->
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  // 要接收哪些傳入的屬性(props)
  props: ["singlePhotoData"],
});
</script>
