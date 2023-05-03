<script setup></script>
<template>
  <div class="w-full h-full border-r-2 border-textself">
    <div class="h-full bg-white flex flex-col justify-between">
      <section>
        <router-link to="signin" class="flex justify-center my-12">
          <img src="@/assets/img/LOGO_horizon.svg" class="w-1/2 object-cover" alt="Logo_PC" />
        </router-link>
        <ul class="font-medium text-center px-10">
          <li class="mb-4">
            <h2 class="flex justify-center p-3 text-2xl">管理者您好</h2>
          </li>
          <li class="mb-4">
            <router-link
              to="userAdmin"
              class="flex justify-center p-3 rounded-lg hover:bg-bgself-light"
            >
              使用者管理
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="seatAdmin"
              class="flex justify-center p-3 rounded-lg hover:bg-bgself-light"
            >
              座位管理
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="productAdmin"
              class="flex justify-center p-3 rounded-lg hover:bg-bgself-light"
            >
              商品管理
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="couponAdmin"
              class="flex justify-center p-3 rounded-lg hover:bg-bgself-light"
            >
              活動管理
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="reportAdmin"
              class="flex justify-center p-3 rounded-lg hover:bg-bgself-light"
            >
              報表查詢
            </router-link>
          </li>
          <li class="mb-4">
            <router-link to="seat" class="flex justify-center p-3 rounded-lg hover:bg-bgself-light">
              回到前台
            </router-link>
          </li>
        </ul>
      </section>
      <section class="flex items-center">
        <router-link to="/" class="btn btn-outline-dark m-6 w-full"> 登出 </router-link>
      </section>
    </div>
  </div>
</template>
<style scoped></style>
