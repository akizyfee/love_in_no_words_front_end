<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function redirectToLogin() {
  setTimeout(() => {
    router.push('/')
  }, 3000)
}
redirectToLogin()
</script>
<template>
  <!-- banner -->
  <section class="relative">
    <figure>
      <img src="../assets/img/ImgBanner.png" class="min-h-screen object-cover" alt="Banner_Img" />
    </figure>
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <div>
        <h1 class="text-[32px] lg:text-[64px] font-bold text-center lg:text-left relative">
          404...! （’へ’）<br />
          <span class="block lg:inline">稍後自動回首頁喲!!~</span>
          <figure class="absolute -top-14 -start-14">
            <img
              src="../assets/img/ImgTitleBg.svg"
              class="w-[66px] h-14 object-cover"
              alt="ImgTitleBg_Img"
            />
          </figure>
        </h1>
      </div>
    </div>
  </section>
</template>
<style scoped></style>
