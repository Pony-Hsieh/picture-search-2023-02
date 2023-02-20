import { defineStore } from "pinia";
import type ISinglePhoto from "../types/SinglePhotoType";

// Option Stores
// TODO: 之後可以再嘗試看看 Setup Stores
export const useFullScreenPhotoStore = defineStore("fullScreenPhoto", {
  state: () => ({
    // 全螢幕圖片顯示狀態
    showStatus: false,
    // 目前展示的全螢幕圖片
    showPhoto: {} as ISinglePhoto,
  }),
  actions: {
    /**
     * 更新顯示狀態
     */
    updateShowStatus(statusParam: boolean) {
      this.showStatus = statusParam;
    },
    /**
     * 更新全螢幕顯示圖片
     */
    updateShowPhoto(photoData: ISinglePhoto) {
      this.showPhoto = photoData;
    },
  },
});
