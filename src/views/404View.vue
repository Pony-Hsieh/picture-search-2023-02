<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
// 5 秒後跳轉回首頁
const countDownSeconds = ref(5);
const countDownTimer = setInterval(() => {
  if (countDownSeconds.value >= 1) {
    countDownSeconds.value--;
    return;
  }
  if (countDownSeconds.value === 0) {
    clearInterval(countDownTimer);
    router.push({
      path: "/",
    });
    return;
  }
}, 1000);
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center bg-slate-900">
    <img src="@/images/cry-dinasor.png" class="w-2/5 md:w-auto" alt="" />
    <p class="mt-10 text-white text-xl sm:text-2xl">抱歉，沒有找到您要的頁面</p>
    <p class="mt-20 text-white sm:text-xl">
      {{ countDownSeconds }} 秒後跳轉回首頁
    </p>
  </div>
</template>
