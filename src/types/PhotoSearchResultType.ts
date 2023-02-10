// call 這支 api 撈回來的結果
// `https://api.pexels.com/v1/search?query=${searchKeyword.value}&per_page=${perPage}&page=${page}`

import type ISinglePhoto from "./SinglePhotoType";

interface IPhotoSearchResult {
  prev_page?: string;
  next_page?: string;
  page: number;
  per_page: number;
  photos: Array<ISinglePhoto>;
  total_results: number;
}

export default IPhotoSearchResult;
