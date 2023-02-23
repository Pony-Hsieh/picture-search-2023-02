import { defineStore } from "pinia";
import type IPhotoSearchResult from "../types/PhotoSearchResultType";
import type ISinglePhoto from "../types/SinglePhotoType";

// Option Stores
// TODO: 之後可以再嘗試看看 Setup Stores
export const useSearchResultStore = defineStore("searchResult", {
  state: () => ({
    // 目前存資料的搜尋關鍵字
    searchKeyword: "",
    // 目前展示的內容
    showPhotos: [] as Array<ISinglePhoto>,
    // 是否有上一頁
    havePrevPage: false,
    // 是否有下一頁
    haveNextPage: false,
    // 資料庫中是否有圖片
    havePhotosInDatabase: false,
    // 是否為最後一頁
    isLastPage: false,
  }),
  actions: {
    /**
     * 更新當前搜尋關鍵字
     * 可以無論如何都存，但是如果沒有圖片可以顯示的話，再告知使用者目前沒有照片可供顯示
     */
    updateSearchKeyword(q: string) {
      this.searchKeyword = q;
    },
    /**
     * 判斷 load 回來的資料
     */
    judgeSearchResult(photoSearchRes: IPhotoSearchResult) {
      // const searchResult = useSearchResultStore();
      // 是否有上一頁
      if (photoSearchRes.prev_page) {
        this.havePrevPage = true;
      }
      // 是否有下一頁
      if (photoSearchRes.next_page) {
        this.haveNextPage = true;
      }
      // 資料庫中是否有該關鍵字的圖片
      if (photoSearchRes.page === 1 && photoSearchRes.photos.length === 0) {
        this.havePhotosInDatabase = false;
      } else {
        this.havePhotosInDatabase = true;
      }
    },
    /**
     * 清除搜尋結果
     * 不過如果有 `store.$reset()` 這個方法，不確定這個 function 還有沒有需要留
     */
    clearSearchResult() {
      // function 內的 this 指向 state
      this.showPhotos = [] as Array<ISinglePhoto>;
    },
    /**
     * 更新要顯示的圖片
     */
    updateShowingPhotosData(photos: Array<ISinglePhoto>) {
      this.showPhotos.push(...photos);
    },
    /**
     * 判斷是否為最後一頁
     */
    judgeIsLastPage(photoSearchRes: IPhotoSearchResult) {
      if (photoSearchRes.page === 1 && photoSearchRes.next_page === undefined) {
        this.isLastPage = true;
        return true;
      }
      if (photoSearchRes.prev_page && photoSearchRes.next_page === undefined) {
        this.isLastPage = true;
        return true;
      }
      this.isLastPage = false;
      return false;
    },
  },
});

/**
 * note:
 * 透過 store 的 $reset() 方法將 state 重置為初始值
    const store = useStore();
    store.$reset();
 * 
 */
