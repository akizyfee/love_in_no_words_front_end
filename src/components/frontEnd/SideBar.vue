<script setup>
import { useRouter } from 'vue-router'
import { clearCookieToken } from '@/utils/cookie'
import { clearCookieTitleNo, getCookieTitleNo } from '@/utils/titleNo'
import { catchError } from '@/utils/catchError'
const router = useRouter()

/**
 * 取得職位功能
 */
const titleNo = getCookieTitleNo()

/**
 * 清除 Cookie 功能
 */
const signOut = catchError(async () => {
  await clearCookieToken()
  await clearCookieTitleNo()
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
          <li class="mb-4" :class="titleNo === 3 ? 'hidden' : ''">
            <router-link to="seat" class="flex justify-center p-3 rounded-lg hover:bg-bgself-light">
              座位
            </router-link>
          </li>
          <li class="mb-4" :class="titleNo === 3 ? 'hidden' : ''">
            <router-link
              to="order"
              class="flex justify-center p-3 rounded-lg hover:bg-bgself-light"
            >
              訂單
            </router-link>
          </li>
          <li class="mb-4" :class="titleNo === 3 ? 'hidden' : ''">
            <router-link
              to="member"
              class="flex justify-center p-3 rounded-lg hover:bg-bgself-light"
            >
              會員
            </router-link>
          </li>
          <li class="mb-4" :class="titleNo !== 3 ? 'hidden' : ''">
            <router-link to="chef" class="flex justify-center p-3 rounded-lg hover:bg-bgself-light">
              廚房訂單
            </router-link>
          </li>
          <li class="mb-4" :class="titleNo !== 1 ? 'hidden' : ''">
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
        <button type="button" class="w-full btn btn-bgself m-6" @click="signOut">登出</button>
      </section>
    </div>
  </div>
</template>
