<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { loginApi } from '@/apis/user.js'
import { setCookieToken } from '@/utils/cookie.js'
import { catchError } from '@/utils/catchError.js'
import { errorsFormSchema } from '@/utils/formValidate'
const router = useRouter()

/**
 * VeeValidate 套件
 */
const { errors, useFieldModel } = useForm({
  validationSchema: errorsFormSchema
})
const loginForm = ref({
  phone: useFieldModel('phone'),
  password: useFieldModel('password')
})

/**
 * 登入功能
 */
const signIn = catchError(async () => {
  const { data } = await loginApi(loginForm.value)
  const { token, titleNo } = data.user
  switch (titleNo) {
    case 1:
      await setCookieToken(token)
      router.push('/userAdmin')
      break
    case 2:
      await setCookieToken(token)
      router.push('/userAdmin')
      break
    case 3:
      await setCookieToken(token)
      router.push('/seat')
      break
    default:
      console.log('非任何職位!')
      router.push('/')
      break
  }
})
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
            v-model="loginForm.phone"
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
            v-model.trim="loginForm.password"
            required
          />
          <p class="text-sm text-primary-light mt-2">{{ errors.password }}</p>
        </div>
        <button type="submit" class="w-full btn btn-outline-dark" @click.prevent="signIn">
          登入
        </button>
      </form>
    </div>
  </div>
</template>
