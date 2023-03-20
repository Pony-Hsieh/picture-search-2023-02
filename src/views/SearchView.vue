<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import axios from "axios";
import Loading from "vue-loading-overlay";
import { useSearchResultStore } from "../stores/searchResult"; // 引入 Pinia 中自定義的 searchResult
import { useFullScreenPhotoStore } from "../stores/fullScreenPhoto"; // 引入 Pinia 中自定義的 fullScreenPhoto
import SearchBar from "../components/SearchBar.vue";
import PhotoCard from "../components/PhotoCard.vue";
import FullScreenPhotoCard from "../components/FullScreenPhotoCard.vue";
import RandomSearchButton from "../components/RandomSearchButton.vue";
import type ISinglePhoto from "../types/SinglePhotoType";

const route = useRoute();
const router = useRouter();
const searchResult = useSearchResultStore(); // 取出 searchResult 內的方法
const fullScreenPhoto = useFullScreenPhotoStore(); // 取出 fullScreenPhoto 內的方法
// 搜尋關鍵字
const searchKeyword = ref("");
// 網頁可見區域寬度
const clientWidth = document.body.clientWidth;

// 目前是否仍在 load 資料
const loadingPhotosStatus = ref(false);
const loadingSetting = {
  // Tailwind CSS blue-700
  color: "#1d4ed8",
  // Tailwind CSS bg-zinc-900
  backgroundColor: "#18181b",
};
// 每頁幾筆
let perPage = 5;
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
 * 依據網頁可見區域寬度決定一次要 load 多少圖片
 */
function adjustLoadPhotosQuantity() {
  if (clientWidth < 640) {
    // default
    perPage = 5;
    return;
  }
  if (clientWidth >= 640 && clientWidth < 1280) {
    // sm
    perPage = 10;
    return;
  }
  if (clientWidth >= 1280) {
    // xl
    perPage = 15;
    return;
  }
}

/**
 * 封裝圖片請求
 */
function loadPhotos() {
  const searchURL = `https://api.pexels.com/v1/search?query=${searchKeyword.value}&per_page=${perPage}&page=${page}`;
  // const searchURL = `https://api.pexels.com/v1/search?query=cube&per_page=${perPage}&page=165`; // test for judge last page function
  if (loadingPhotosStatus.value) {
    throw new Error("目前仍在請求圖片中，請勿重複請求");
  }
  loadingPhotosStatus.value = true;
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
  if (searchResult.isLastPage) {
    console.log("目前是最後一頁");
    return;
  }
  try {
    page++;
    const res = await loadPhotos();
    // console.log("initial res", res);
    // 判斷搜尋結果(是否有上下一頁、目前是否有圖片)
    searchResult.judgeSearchResult(res.data);
    // 更新圖片顯示陣列
    searchResult.updateShowingPhotosData(res.data.photos);
    // 判斷是否為最後一頁
    searchResult.judgeIsLastPage(res.data);
  } catch (err) {
    // 失敗的話則將剛剛 + 1 的 page 減回來
    page--;
    console.error(err);
  } finally {
    loadingPhotosStatus.value = false;
  }
}

/**
 * 點擊小圖，全螢幕顯示圖片
 */
function showFullScreenPhoto(photo: ISinglePhoto) {
  fullScreenPhoto.updateShowPhoto(photo);
  fullScreenPhoto.updateShowStatus(true);
}

// 有輸入關鍵字
if (haveSearchKeyword()) {
  // 使用 Pinia 儲存該關鍵字
  searchResult.updateSearchKeyword(route.query.q as string);
} else {
  // 導回首頁
  router.push({
    path: "/",
  });
}

initial();
/**
 * 進入頁面後需要做的事情
 */
async function initial() {
  try {
    page = 1;
    // 依據網頁可見區域寬度決定一次要 load 多少圖片
    adjustLoadPhotosQuantity();
    // 重置 Pinia State 資料
    searchResult.$reset();
    const res = await loadPhotos();
    // 判斷搜尋結果(是否有上下一頁、目前是否有圖片)
    searchResult.judgeSearchResult(res.data);
    // 更新圖片顯示陣列
    searchResult.updateShowingPhotosData(res.data.photos);
    // 判斷是否為最後一頁
    searchResult.judgeIsLastPage(res.data);
  } catch (err) {
    console.error(err);
  } finally {
    loadingPhotosStatus.value = false;
  }
}

// 進到頁面後，使用者直接修改網址
// (這樣會造成 route 跳轉，進而觸發此 function)
onBeforeRouteUpdate((to, from) => {
  // 不同搜尋關鍵字
  if (to.query.q !== from.query.q) {
    // 更新搜尋關鍵字
    searchKeyword.value = to.query.q as string;
    initial();
  }
});
</script>

<template>
  <loading :active="loadingPhotosStatus"
    :color="loadingSetting.color"
    :backgroundColor="loadingSetting.backgroundColor"
  />
  <div class="sticky xl:static top-6 flex justify-center items-center my-6">
    <SearchBar />
  </div>
  <!-- 全螢幕顯示圖片 -->
  <FullScreenPhotoCard />
  <!-- 圖片搜尋結果 -->
  <div class="flex flex-wrap justify-evenly items-center">
    <PhotoCard
      v-for="photo in searchResult.showPhotos"
      :key="photo.id"
      :singlePhotoData="photo"
      class="my-2 sm:my-4 xl:mx-1 w-full sm:w-5/12 xl:w-3/12"
      @click="showFullScreenPhoto(photo)"
    />
  </div>
  <!-- 如果有搜尋結果 -->
  <div
    v-show="searchResult.showPhotos.length !== 0"
    class="flex justify-center items-center py-12"
  >
    <p v-show="searchResult.isLastPage">您已看完所有圖片</p>
    <button
      v-show="!searchResult.isLastPage"
      type="button"
      class="px-4 py-2 bg-blue-700 text-white border border-blue-700 rounded-full"
      @click="() => loadMorePhotos()"
    >
      load more photos
    </button>
  </div>
  <!-- 如果沒有搜尋結果 -->
  <div v-show="searchResult.showPhotos.length === 0">
    <p class="flex justify-center items-center py-6">
      很抱歉，圖庫中沒有找到相關的圖片
    </p>
    <div class="flex justify-center items-center mt-6 w-full">
      <RandomSearchButton />
    </div>
  </div>
</template>
