<script setup>
import { useRouter } from 'vue-router'
import { clearCookieToken } from '@/utils/cookie.js'
import { catchError } from '@/utils/catchError.js'
const router = useRouter()

/**
 * 清除 Cookie 功能
 */
const signOut = catchError(async () => {
  await clearCookieToken()
  router.push('/')
})
</script>
<template>
  <div class="w-full h-full border-r-2 border-textself">
    <div class="h-full bg-bgself flex flex-col justify-between">
      <section>
        <router-link to="signin" class="flex justify-center my-12">
          <img src="@/assets/img/LOGO_horizon.svg" class="w-1/2 object-cover" alt="Logo_PC" />
        </router-link>
        <ul class="font-medium text-center px-10">
          <li class="mb-4">
            <router-link to="seat" class="flex justify-center p-3 rounded-lg hover:bg-bgself-light">
              座位
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="product"
              class="flex justify-center p-3 rounded-lg hover:bg-bgself-light"
            >
              點餐 <br />(之後會砍)
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="order"
              class="flex justify-center p-3 rounded-lg hover:bg-bgself-light"
            >
              訂單
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="member"
              class="flex justify-center p-3 rounded-lg hover:bg-bgself-light"
            >
              會員
            </router-link>
          </li>
          <li class="mb-4">
            <router-link to="chef" class="flex justify-center p-3 rounded-lg hover:bg-bgself-light">
              廚師 <br />(之後會砍)
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="userAdmin"
              class="flex justify-center p-3 rounded-lg hover:bg-bgself-light"
            >
              後台管理
            </router-link>
          </li>
        </ul>
      </section>
      <section class="flex items-center">
        <button type="button" class="w-full btn btn-outline-dark m-6" @click="signOut">登出</button>
      </section>
    </div>
  </div>
</template>
