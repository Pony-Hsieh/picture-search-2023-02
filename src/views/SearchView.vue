<script setup lang="ts">
import { ref, defineComponent } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import axios from "axios";
import { useSearchResultStore } from "../stores/searchResult"; // 引入 Pinia 中自定義的 searchResult

const route = useRoute();
const router = useRouter();
const searchResult = useSearchResultStore(); // 取出 searchResult 內的方法
// 搜尋關鍵字
const searchKeyword = ref("");
// 判斷搜尋結果的關鍵字
const judgeResultMessage = ref("");

// 目前是否仍在 load 資料
let ajaxStatus = false;
// 每頁幾筆
let perPage = 10;
// 第幾頁
let page = 2;

console.warn("route.query.q", route.query.q);
searchKeyword.value = route.query.q as string;

/**
 * 判斷是否有輸入搜尋關鍵字
 */
function haveSearchKeyword() {
  if (searchKeyword.value === "" || searchKeyword.value === undefined) {
    return false;
  }
  return true;
}

loadPhotos();
/**
 *
 */
function loadPhotos() {
  const searchURL = `https://api.pexels.com/v1/search?query=${searchKeyword.value}&per_page=${perPage}&page=${page}`;

  if (ajaxStatus) {
    return;
  }

  axios
    .get(searchURL, {
      headers: {
        Authorization: import.meta.env.VITE_API_AUTH,
      },
    })
    .then((res) => {
      console.warn("res", res);
      // 將資料存入 Pinia 中
      searchResult.updatePhotosData(res.data);
    })
    .catch((err) => {})
    .finally(() => {});
}

// 沒有輸入關鍵字
if (!haveSearchKeyword()) {
  router.push({
    path: "/",
  });
}
</script>

<template>
  <div>This is search page.</div>
</template>

<style scoped></style>
