<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useLoadingStore } from '@/stores/TheLoading'
import { useForm } from 'vee-validate'
import { loginApi } from '@/apis/user'
import { setCookieToken } from '@/utils/cookie'
import { setCookieTitleNo } from '@/utils/titleNo'
// import { catchError } from '@/utils/catchError'
import { errorsFormSchema } from '@/utils/formValidate'
import { errorAlert } from '@/plugins/toast'

const router = useRouter()
const loding = useLoadingStore()

/**
 * VeeValidate 套件
 */
const { errors, useFieldModel } = useForm({
  validationSchema: errorsFormSchema
})
const loginForm = reactive({
  phone: useFieldModel('phone'),
  password: useFieldModel('password')
})

/**
 * 登入功能
 */
const signIn = async () => {
  loding.isLoading = true
  try {
    const { data } = await loginApi(loginForm)
    const { token, titleNo } = data.user
    switch (titleNo) {
      case 1:
        await setCookieToken(token)
        await setCookieTitleNo(titleNo)
        router.push('/userAdmin')
        loding.isLoading = false
        break
      case 2:
        await setCookieToken(token)
        await setCookieTitleNo(titleNo)
        router.push('/seat')
        loding.isLoading = false
        break
      case 3:
        await setCookieToken(token)
        await setCookieTitleNo(titleNo)
        router.push('/chef')
        loding.isLoading = false
        break
      default:
        console.log('非任何職位!')
        router.push('/')
        loding.isLoading = false
        break
    }
  } catch (err) {
    loding.isLoading = false
    errorAlert(err.message)
  }
}
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
          <label for="tel" class="block mb-2 text-xl font-medium">電話</label>
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
