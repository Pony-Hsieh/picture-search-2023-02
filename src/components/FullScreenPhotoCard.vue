<script setup lang="ts">
import { useFullScreenPhotoStore } from "../stores/fullScreenPhoto"; // 引入 Pinia 中自定義的 fullScreenPhoto

const fullScreenPhoto = useFullScreenPhotoStore(); // 取出 searchResult 內的方法

/**
 * 停止顯示全螢幕圖片
 */
function closeFullScreenPhoto() {
  fullScreenPhoto.updateShowStatus(false);
}
</script>

<template>
  <div
    v-show="fullScreenPhoto.showStatus"
    class="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-zinc-900/[.95]"
    @click="closeFullScreenPhoto"
  >
    <img
      :src="fullScreenPhoto.showPhoto?.src?.large"
      :alt="fullScreenPhoto.showPhoto?.alt"
      class="max-w-full max-h-full"
    />
  </div>
</template>
