<script setup>
import { useForm } from 'vee-validate'
// import { signInAPI } from '@/apis/user.js'
// import { setCookieToken } from '@/utils/cookie.js'
// import { catchError } from '@/utils/catchError'

/**
 * VeeValidate 套件
 */
const errorsSchema = {
  phone(value) {
    // 定義驗證後的回傳內容
    if (!value) {
      return '欄位必填'
    }
    if (value.length < 10) {
      return '內容有誤'
    }
    return true
  },
  password(value) {
    if (!value) {
      return '欄位必填'
    }
    return true
  }
}

const { errors, useFieldModel } = useForm({
  validationSchema: errorsSchema
})
const phone = useFieldModel('phone')
const password = useFieldModel('password')
</script>
<template>
  <div class="px-8 py-12">
    <figure class="flex justify-center pb-10">
      <img src="@/assets/img/LOGO_horizon.svg" class="h-full object-cover" alt="Logo_Mobile" />
    </figure>
    <div
      class="max-w-screen-xl px-8 grid gap-8 grid-cols-1 md:grid-cols-2 py-16 mx-auto bg-bgself-dark rounded-lg shadow-lg"
    >
      <div class="flex flex-col justify-between">
        <h1 class="text-4xl font-semibold text-center">登入</h1>
        <figure class="text-center pt-16">
          <img src="@/assets/img/ImgLogin.svg" class="h-full object-cover" alt="Login_Img" />
        </figure>
      </div>
      <form class="flex flex-col justify-center lg:py-10">
        <div class="mb-6">
          <label for="tel" class="block mb-2 text-xl font-medium">手機號碼</label>
          <input
            type="tel"
            id="tel"
            class="form-input"
            placeholder="0912345678"
            name="phone"
            v-model="phone"
            required
          />
          <p class="text-sm text-primary-light mt-2">{{ errors.phone }}</p>
        </div>
        <div class="mb-6">
          <label for="password" class="block mb-2 text-xl font-medium">密碼</label>
          <input
            type="password"
            id="password"
            class="form-input"
            placeholder="A0912345678"
            name="password"
            v-model="password"
            required
          />
          <p class="text-sm text-primary-light mt-2">{{ errors.password }}</p>
        </div>
        <button type="submit" class="w-full btn btn-outline-dark">登入</button>
      </form>
    </div>
  </div>
</template>
