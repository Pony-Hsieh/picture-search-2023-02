<script setup lang="ts">
import { ref } from "vue";
import { useRouter, onBeforeRouteUpdate } from "vue-router";

// 上一個搜尋關鍵字
const previousSearchKeyword = ref("");
// 正在輸入的搜尋關鍵字(？
const typingSearchKeyword = ref("");
const router = useRouter();
function doASearch() {
  console.log(typingSearchKeyword.value);
  // 沒有輸入關鍵字
  if (typingSearchKeyword.value === "") {
    // TODO: 透過彈出訊息提示使用者
    console.warn("目前沒有輸入關鍵字");
    return;
  }
  // 輸入相同關鍵字
  if (previousSearchKeyword.value === typingSearchKeyword.value) {
    // TODO: 透過彈出訊息提示使用者
    console.warn("目前是輸入相同關鍵字");
    return;
  }
  // TODO: 有沒有考慮用 Pinia 來記？
  previousSearchKeyword.value = typingSearchKeyword.value;
  // 跳轉至 search 頁面
  router.push({
    path: "/search",
    query: {
      // q 是仿照 Google 的
      q: previousSearchKeyword.value,
    },
  });
}

// 使用者在 SearchBar 重新輸入不同關鍵字
// (因為這樣才會造成 route 跳轉，進而觸發此 function)
onBeforeRouteUpdate((to, from) => {
  console.log("SearchBar, onBeforeRouteUpdate");
  if (to.query.q !== from.query.q) {
    typingSearchKeyword.value = to.query.q as string;
  }
});
</script>

<template>
  <div>
    <input
      type="text"
      placeholder="今天想搜尋甚麼圖片呢？"
      v-model="typingSearchKeyword"
      @keyup.enter="doASearch"
    />
    <button type="button" @click="doASearch">
      <img src="../images/icon-search.svg" />
    </button>
  </div>
</template>

<style scoped></style>
