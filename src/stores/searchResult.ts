import { defineStore } from "pinia";
import type IPhotoSearchResult from "../types/PhotoSearchResultType";
import type ISinglePhoto from "../types/SinglePhotoType";

// Option Stores
// TODO: 之後可以再嘗試看看 Setup Stores
export const useSearchResultStore = defineStore("searchResult", {
  state: () => ({
    // 目前存資料的搜尋關鍵字
    searchKeyword: "",
    // AJAX load 回來的所有資料 (這個也許不用存，因為存進 showPhotos 之後，這個東西就用不到了)
    allResultdata: {} as IPhotoSearchResult,
    // 目前展示的內容
    showPhotos: [] as Array<ISinglePhoto>,
    // 是否有上一頁
    havePrevPage: false,
    // 是否有下一頁
    haveNextPage: false,
  }),
  actions: {
    /**
     * 清除搜尋結果
     * 不過如果有 `store.$reset()` 這個方法，不確定這個 function 還有沒有需要留
     */
    clearSearchResult() {
      // function 內的 this 指向 state
      this.allResultdata = {} as IPhotoSearchResult;
      this.showPhotos = [] as Array<ISinglePhoto>;
    },
    /**
     * 更新要顯示的圖片
     */
    updateShowPhotosData(photos: Array<ISinglePhoto>) {
      // 如果沒有下一頁的話
      // 判斷 load 回來的資料是否有圖片可供顯示
      // this.allResultdata = photoSearchRes;
      // if (photoSearchRes.hasOwnProperty("photos")) {
      //   this.showPhotos = this.showPhotos.concat(photoSearchRes.photos);
      // }
    },
    /**
     * 更新當前搜尋關鍵字
     * 但這個好像也不一定需要，可以再想想看
     * 或者是說，如果 load 回來的資料有至少一張圖片可以顯示的話，那就再把 keyword 存起來
     */
    updateSearchKeyword(keyword: string) {
      this.searchKeyword = keyword;
    },
    /**
     * 判斷 load 回來的資料
     * TODO: 待完善
     */
    judgeSearchResult(photoSearchRes: IPhotoSearchResult) {
      console.log("judgeSearchResult", photoSearchRes);
      if (photoSearchRes.prev_page) {
        this.havePrevPage = true;
      }
      if (photoSearchRes.next_page) {
        this.haveNextPage = true;
      }
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
