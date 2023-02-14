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
let loadingPhotosStatus = false;
// 每頁幾筆
let perPage = 10;
// 第幾頁
let page = 1;

console.warn("route.query.q", route.query.q);
searchKeyword.value = route.query.q as string;

/**
 * 判斷網址內是否有搜尋關鍵字
 */
function haveSearchKeyword() {
  if (searchKeyword.value === "" || searchKeyword.value === undefined) {
    return false;
  }
  return true;
}

/**
 * 封裝圖片請求
 */
function loadPhotos() {
  const searchURL = `https://api.pexels.com/v1/search?query=${searchKeyword.value}&per_page=${perPage}&page=${page}`;
  // const searchURL = `https://api.pexels.com/v1/search?query=cube&per_page=${perPage}&page=165`; // test for judge last page function
  if (loadingPhotosStatus) {
    throw new Error("目前仍在請求圖片中，請勿重複請求");
  }
  return axios.get(searchURL, {
    headers: {
      Authorization: import.meta.env.VITE_API_AUTH,
    },
  });
}

/**
 * 載入更多圖片
 */
async function loadMorePhotos() {
  try {
    page++;
    const res = await loadPhotos();
    // console.log("initial res", res);
    // 判斷搜尋結果(是否有上下一頁、目前是否有圖片)
    searchResult.judgeSearchResult(res.data);
    // 更新圖片顯示陣列
    searchResult.updateShowingPhotosData(res.data.photos);
  } catch (err) {
    // 失敗的話則將剛剛 + 1 的 page 減回來
    page--;
    console.error(err);
  } finally {
    loadingPhotosStatus = false;
  }
}

// 沒有輸入關鍵字
if (!haveSearchKeyword()) {
  // 導回首頁
  router.push({
    path: "/",
  });
}
// 有輸入關鍵字
// 使用 Pinia 儲存該關鍵字
searchResult.updateSearchKeyword(route.query.q);

initial();
/**
 * 進入頁面後需要做的事情
 */
async function initial() {
  try {
    page = 1;
    const res = await loadPhotos();
    // console.warn("initial res", res);
    // 判斷搜尋結果(是否有上下一頁、目前是否有圖片)
    searchResult.judgeSearchResult(res.data);
    // 更新圖片顯示陣列
    searchResult.updateShowingPhotosData(res.data.photos);
  } catch (err) {
    console.error(err);
  } finally {
    loadingPhotosStatus = false;
  }
}
</script>

<template>
  <div>This is search page.</div>
  <p>Search Keyword is: {{ searchResult.searchKeyword }}</p>
  <p>目前 load 到第幾頁了： {{ page }}</p>
  <div v-for="photo in searchResult.showPhotos" :key="photo.id">
    <!-- portrait 會統一尺寸，還不錯，就用這個吧 -->
    <img :src="photo.src.portrait" />
  </div>
  <!-- TODO: 如果沒有更多圖片了，則不顯示此按鈕，並顯示一個區塊提示使用者已經看完所有圖片 -->
  <button type="button" @click="() => loadMorePhotos()">
    load more photos
  </button>
</template>

<style scoped></style>
