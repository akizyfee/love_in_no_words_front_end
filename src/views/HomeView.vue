<script setup>
import { ref, onMounted, computed } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Mousewheel, Keyboard } from 'swiper'
import { Collapse } from 'flowbite'
import { useWindowSize } from '@vueuse/core'

/**
 * swiper 套件
 */
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const modules = [Navigation, Mousewheel, Keyboard]

/**
 * nav 開關
 */
let collapse
const navDropEl = ref(null)
const openNavBtn = ref(null)

const DropToggle = () => {
  if (navDropEl.value && openNavBtn.value) {
    collapse.toggle()
  }
}

onMounted(() => {
  collapse = new Collapse(navDropEl.value, openNavBtn.value)
})

/**
 * tailwind 樣式變化
 */
const { width } = useWindowSize()

const isMobile = computed(() => {
  return width.value < 1024
})

/**
 * 跳轉至對應的錨點
 */
const toHref = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <nav class="bg-white">
    <div class="flex flex-wrap items-center justify-between lg:justify-around">
      <a href="#" class="flex items-center m-5">
        <img src="../assets/img/LOGO.svg" class="w-full hidden lg:block" alt="Logo_PC" />
        <img src="../assets/img/LOGO_horizon.svg" class="h-11 block lg:hidden" alt="Logo_Mobile" />
      </a>
      <button
        @click="DropToggle"
        ref="openNavBtn"
        type="button"
        class="inline-flex items-center m-5 lg:hidden hover:text-primary-light focus:outline-none"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <img @click="DropToggle" src="../assets/img/IconMenu.svg" class="w-6 h-6" alt="Menu_Img" />
      </button>
      <div
        class="hidden w-full border-t-2 border-textself lg:flex lg:w-auto lg:border-0 lg:p-5"
        ref="navDropEl"
      >
        <ul class="font-bold text-xl flex flex-col text-center bg-white lg:flex-row lg:space-x-12">
          <li
            class="hover:text-white hover:bg-primary lg:border-0 lg:hover:text-primary lg:hover:bg-white p-6 lg:p-0"
          >
            <a href="#" class="block" @click.prevent="toHref('feature')">平台特色</a>
          </li>
          <li
            class="hover:text-white hover:bg-primary lg:border-0 lg:hover:text-primary lg:hover:bg-white p-6 lg:p-0"
          >
            <a href="#" class="block" @click.prevent="toHref('brand')">合作夥伴</a>
          </li>
          <li
            class="hover:text-white hover:bg-primary lg:border-0 lg:hover:text-primary lg:hover:bg-white p-6 lg:p-0"
          >
            <a href="#" class="block" @click.prevent="toHref('about')">關於我們</a>
          </li>
          <li
            class="hover:text-white hover:bg-primary lg:border-0 lg:hover:text-primary lg:hover:bg-white p-6 lg:p-0"
          >
            <a href="#" class="block" @click.prevent="toHref('mail')">聯絡我們</a>
          </li>
          <li class="p-10 pt-60 lg:p-0 w-full lg:w-auto grid grid-col-12 lg:block">
            <router-link to="signIn" class="btn btn-outline-dark"> 店家後台 </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- banner -->
  <section class="relative">
    <figure>
      <img
        src="../assets/img/ImgBanner.png"
        class="h-[640px] lg:h-[840px] object-cover"
        alt="Banner_Img"
      />
    </figure>
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <h1 class="text-[32px] lg:text-[64px] font-bold text-center lg:text-left">
        傲嬌甜點
        <span class="block lg:inline">POS 點餐系統</span>
      </h1>
      <h2 class="text-xl lg:text-2xl mt-6 mb-12">輕鬆管理，以智慧重新定義餐飲體驗</h2>
      <button type="button" class="btn btn-dark flex items-center text-xl">
        瞭解更多
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-4 h-4 inline-block ml-3 stroke-2"
        >
          <path
            fill-rule="evenodd"
            d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </section>
  <main>
    <!-- point -->
    <section class="bg-secondary-light border-y-2 border-textself">
      <h3 class="text-center text-[28px] lg:text-[32px] font-bold p-12 lg:pt-24 lg:pb-16">
        解決以下困擾
      </h3>
      <div class="w-11/12 lg:w-9/12 mx-auto grid grid-cols-12 gap-3 pb-16 lg:pb-24">
        <figure class="col-span-12 lg:col-span-7">
          <img
            src="../assets/img/ImgPoint.png"
            class="w-full h-full object-cover rounded-lg border-2 border-b-4 border-r-4 border-textself drop-shadow-lg"
            alt="Point_Img"
          />
        </figure>
        <ul class="col-span-12 lg:col-span-5 flex flex-col items-center list-none list-inside">
          <li class="card-white">
            <figure class="border-4 border-textself rounded-full overflow-hidden">
              <img
                src="../assets/img/ImgPoints01.svg"
                class="w-full h-full object-cover"
                alt="Point_Card_Img1"
              />
            </figure>
            <p class="font-medium text-xl ml-4">你有無法好好管理座位的困擾嗎？</p>
          </li>
          <li class="card-white my-6">
            <figure class="border-4 border-textself rounded-full overflow-hidden">
              <img
                src="../assets/img/ImgPoints02.svg"
                class="w-full h-full object-cover"
                alt="Point_Card_Img2"
              />
            </figure>
            <p class="font-medium text-xl ml-4">你有無法輕鬆規劃菜單的困擾嗎？</p>
          </li>
          <li class="card-white">
            <figure class="border-4 border-textself rounded-full overflow-hidden">
              <img
                src="../assets/img/ImgPoints03.svg"
                class="w-full h-full object-cover"
                alt="Point_Card_Img3"
              />
            </figure>
            <p class="font-medium text-xl ml-4">你有無法掌握營運狀況的困擾嗎？</p>
          </li>
        </ul>
      </div>
    </section>
    <!-- feature -->
    <section id="feature">
      <h3 class="text-[32px] font-bold text-center border-b-2 border-textself py-12 lg:py-16">
        平台特色
      </h3>
      <!-- reverse -->
      <ul class="w-full lg:w-2/3 mx-auto list-none list-inside px-3 pt-8 py-20 lg:py-28">
        <li class="flex flex-wrap justify-center items-center relative">
          <div
            class="card-secondary"
            :class="[isMobile ? 'card-arrow-bottom' : 'card-arrow-right']"
          >
            <p class="text-2xl lg:text-[28px] font-medium mb-2 lg:mb-4">座位狀況管理</p>
            <p class="text-xl lg:text-2xl">一眼掌握整間店內座位的狀態</p>
          </div>
          <figure class="w-full lg:w-1/2">
            <img
              src="../assets/img/ImgFeature01.svg"
              class="w-full h-full object-cover"
              alt="Feature_Card_Img1"
            />
          </figure>
        </li>
        <li class="flex flex-row-reverse flex-wrap justify-center items-center">
          <div class="card-secondary" :class="[isMobile ? 'card-arrow-bottom' : 'card-arrow-left']">
            <p class="text-2xl lg:text-[28px] font-medium mb-2 lg:mb-4">客製菜單設置</p>
            <p class="text-xl lg:text-2xl">輕鬆滿足不同供應時段的需求</p>
          </div>
          <figure class="w-full lg:w-1/2">
            <img
              src="../assets/img/ImgFeature02.svg"
              class="w-full h-full object-cover"
              alt="Feature_Card_Img2"
            />
          </figure>
        </li>
        <li class="flex flex-wrap justify-center items-center">
          <div
            class="card-secondary"
            :class="[isMobile ? 'card-arrow-bottom' : 'card-arrow-right']"
          >
            <p class="text-2xl lg:text-[28px] font-medium mb-2 lg:mb-4">優惠活動設置</p>
            <p class="text-xl lg:text-2xl">吸引新客、保留舊客，提高回購率</p>
          </div>
          <figure class="w-full lg:w-1/2">
            <img
              src="../assets/img/ImgFeature03.svg"
              class="w-full h-full object-cover"
              alt="Feature_Card_Img3"
            />
          </figure>
        </li>
        <li class="flex flex-row-reverse flex-wrap justify-center items-center">
          <div class="card-secondary" :class="[isMobile ? 'card-arrow-bottom' : 'card-arrow-left']">
            <p class="text-2xl lg:text-[28px] font-medium mb-2 lg:mb-4">餐點庫存追蹤</p>
            <p class="text-xl lg:text-2xl">輕鬆追蹤餐點庫存及銷售狀況</p>
          </div>
          <figure class="w-full lg:w-1/2">
            <img
              src="../assets/img/ImgFeature04.svg"
              class="w-full h-full object-cover"
              alt="Feature_Card_Img4"
            />
          </figure>
        </li>
        <li class="flex flex-wrap justify-center items-center">
          <div
            class="card-secondary"
            :class="[isMobile ? 'card-arrow-bottom' : 'card-arrow-right']"
          >
            <p class="text-2xl lg:text-[28px] font-medium mb-2 lg:mb-4">圖形分析報表</p>
            <p class="text-xl lg:text-2xl">方便隨時調整營運，做出更好的決策</p>
          </div>
          <figure class="w-full lg:w-1/2">
            <img
              src="../assets/img/ImgFeature05.svg"
              class="w-full h-full object-cover"
              alt="Feature_Card_Img5"
            />
          </figure>
        </li>
      </ul>
    </section>
    <!-- brand -->
    <section class="bg-textself py-12 px-3 lg:pt-16" id="brand">
      <h3 class="text-secondary-light text-center text-[28px] lg:text-[32px] font-bold pb-6">
        合作夥伴
      </h3>
      <ul class="flex flex-wrap lg:flex-row justify-center items-center list-none list-inside">
        <li>
          <img
            src="../assets/img/ImgBrand01.png"
            class="w-[175px] h-[140px] lg:w-[240px] lg:h-[192px] object-cover"
            alt="Brand_Img1"
          />
        </li>
        <li>
          <img
            src="../assets/img/ImgBrand02.png"
            class="w-[175px] h-[140px] lg:w-[240px] lg:h-[192px] object-cover"
            alt="Brand_Img2"
          />
        </li>
        <li>
          <img
            src="../assets/img/ImgBrand03.png"
            class="w-[175px] h-[140px] lg:w-[240px] lg:h-[192px] object-cover"
            alt="Brand_Img3"
          />
        </li>
        <li>
          <img
            src="../assets/img/ImgBrand04.png"
            class="w-[175px] h-[140px] lg:w-[240px] lg:h-[192px] object-cover"
            alt="Brand_Img4"
          />
        </li>
        <li>
          <img
            src="../assets/img/ImgBrand05.png"
            class="w-[175px] h-[140px] lg:w-[240px] lg:h-[192px] object-cover"
            alt="Brand_Img5"
          />
        </li>
        <li>
          <img
            src="../assets/img/ImgBrand06.png"
            class="w-[175px] h-[140px] lg:w-[240px] lg:h-[192px] object-cover"
            alt="Brand_Img6"
          />
        </li>
      </ul>
    </section>
    <!-- about -->
    <section class="pt-[60px] pb-12 lg:py-24 mx-3 lg:mx-[240px]" id="about">
      <h3 class="text-center text-[28px] lg:text-[32px] font-bold">關於我們</h3>
      <!-- swiper -->
      <swiper
        :modules="modules"
        :mousewheel="true"
        :keyboard="true"
        :navigation="!isMobile"
        :slidesPerView="2"
        :spaceBetween="24"
        :centeredSlides="true"
        :breakpoints="{
          320: {
            slidesPerView: 1,
            spaceBetween: 0
          },
          375: {
            slidesPerView: 1,
            spaceBetween: 0
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24
          }
        }"
        class="mySwiper relative"
        :style="isMobile ? '' : 'margin-right: -240px'"
      >
        <swiper-slide class="pt-40 pb-[92px] lg:pt-[188px] lg:pb-48">
          <div class="flex flex-col max-w-3xl">
            <div class="card-secondary-p0 lg:mr-3">
              <figure class="-mt-24">
                <img
                  src="../assets/img/Ellipse01.png"
                  class="w-[180px] h-[180px] lg:w-60 lg:h-60 rounded-full object-cover"
                  alt="Ellipse_Img1"
                />
              </figure>
              <figure class="flex mt-[26px] mb-[14px]">
                <img src="../assets/img/IconGithub.svg" class="w-6 h-6" alt="Github_Img" />
                <img
                  src="../assets/img/IconInstagram.svg"
                  class="w-6 h-6 mx-4"
                  alt="Instagram_Img"
                />
                <img src="../assets/img/IconFacebook.svg" class="w-6 h-6" alt="Facebook_Img" />
              </figure>
              <h4 class="text-2xl font-medium">Eva Li</h4>
              <p class="flex items-center mt-3 mb-4">
                <img
                  src="../assets/img/IconLocation.svg"
                  class="w-[9px] h-[13px]"
                  alt="Facebook_Img"
                />
                <span class="ml-2">高雄</span>
              </p>
              <h5 class="text-xl font-medium text-white text-center bg-textself w-full py-6">
                網頁前端工程師
              </h5>
              <ul class="list-none list-outside p-6">
                <li class="flex">
                  <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                  <p>前端開發和設計的工作經驗</p>
                </li>
                <li class="flex">
                  <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                  <p>注重網頁的可用性和使用者體驗設計</p>
                </li>
                <li class="flex">
                  <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                  <p>使用 HTML、CSS、JavaScript 、Vue 前端技術完成工作需求</p>
                </li>
              </ul>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="pt-40 pb-[92px] lg:pt-[188px] lg:pb-48">
          <div class="max-w-3xl flex flex-col">
            <div class="card-secondary-p0 lg:mr-3">
              <figure class="-mt-24">
                <img
                  src="../assets/img/Ellipse02.png"
                  class="w-[180px] h-[180px] lg:w-60 lg:h-60 rounded-full object-cover"
                  alt="Ellipse_Img2"
                />
              </figure>
              <figure class="flex mt-[26px] mb-[14px]">
                <img src="../assets/img/IconGithub.svg" class="w-6 h-6" alt="Github_Img" />
                <img
                  src="../assets/img/IconInstagram.svg"
                  class="w-6 h-6 mx-4"
                  alt="Instagram_Img"
                />
                <img src="../assets/img/IconFacebook.svg" class="w-6 h-6" alt="Facebook_Img" />
              </figure>
              <h4 class="text-2xl font-medium">Christina</h4>
              <p class="flex items-center mt-3 mb-4">
                <img
                  src="../assets/img/IconLocation.svg"
                  class="w-[9px] h-[13px]"
                  alt="Facebook_Img"
                />
                <span class="ml-2">台南</span>
              </p>
              <h5 class="text-xl font-medium text-white text-center bg-textself w-full py-6">
                網頁前端工程師
              </h5>
              <ul class="list-none list-outside p-6">
                <li class="flex">
                  <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                  <p>前端開發和設計的工作經驗</p>
                </li>
                <li class="flex">
                  <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                  <p>注重網頁的可用性和使用者體驗設計</p>
                </li>
                <li class="flex">
                  <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                  <p>使用 HTML、CSS、JavaScript 、Vue 前端技術完成工作需求</p>
                </li>
              </ul>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="pt-40 pb-[92px] lg:pt-[188px] lg:pb-48">
          <div class="max-w-3xl flex flex-col">
            <div class="card-secondary-p0 lg:mr-3">
              <figure class="-mt-24">
                <img
                  src="../assets/img/Ellipse03.png"
                  class="w-[180px] h-[180px] lg:w-60 lg:h-60 rounded-full object-cover"
                  alt="Ellipse_Img3"
                />
              </figure>
              <figure class="flex mt-[26px] mb-[14px]">
                <img src="../assets/img/IconGithub.svg" class="w-6 h-6" alt="Github_Img" />
                <img
                  src="../assets/img/IconInstagram.svg"
                  class="w-6 h-6 mx-4"
                  alt="Instagram_Img"
                />
                <img src="../assets/img/IconFacebook.svg" class="w-6 h-6" alt="Facebook_Img" />
              </figure>
              <h4 class="text-2xl font-medium">Pause</h4>
              <p class="flex items-center mt-3 mb-4">
                <img
                  src="../assets/img/IconLocation.svg"
                  class="w-[9px] h-[13px]"
                  alt="Facebook_Img"
                />
                <span class="ml-2">台南</span>
              </p>
              <h5 class="text-xl font-medium text-white text-center bg-textself w-full py-6">
                網頁前端工程師
              </h5>
              <ul class="list-none list-outside p-6">
                <li class="flex">
                  <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                  <p>前端開發和設計的工作經驗</p>
                </li>
                <li class="flex">
                  <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                  <p>注重網頁的可用性和使用者體驗設計</p>
                </li>
                <li class="flex">
                  <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                  <p>使用 HTML、CSS、JavaScript 、Vue 前端技術完成工作需求</p>
                </li>
              </ul>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="pt-40 pb-[92px] lg:pt-[188px] lg:pb-48">
          <div class="max-w-3xl flex flex-col">
            <div class="card-secondary-p0 lg:mr-3">
              <figure class="-mt-24">
                <img
                  src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2866&q=80"
                  class="w-[180px] h-[180px] lg:w-60 lg:h-60 rounded-full object-cover"
                  alt="Ellipse_Img4"
                />
              </figure>
              <figure class="flex mt-[26px] mb-[14px]">
                <img src="../assets/img/IconGithub.svg" class="w-6 h-6" alt="Github_Img" />
                <img
                  src="../assets/img/IconInstagram.svg"
                  class="w-6 h-6 mx-4"
                  alt="Instagram_Img"
                />
                <img src="../assets/img/IconFacebook.svg" class="w-6 h-6" alt="Facebook_Img" />
              </figure>
              <h4 class="text-2xl font-medium">艾瑞克</h4>
              <p class="flex items-center mt-3 mb-4">
                <img
                  src="../assets/img/IconLocation.svg"
                  class="w-[9px] h-[13px]"
                  alt="Facebook_Img"
                />
                <span class="ml-2">嘉義</span>
              </p>
              <h5 class="text-xl font-medium text-white text-center bg-textself w-full py-6">
                網頁前端工程師
              </h5>
              <ul class="list-none list-outside p-6">
                <li class="flex">
                  <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                  <p>前端開發和設計的工作經驗</p>
                </li>
                <li class="flex">
                  <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                  <p>注重網頁的可用性和使用者體驗設計</p>
                </li>
                <li class="flex">
                  <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                  <p>使用 HTML、CSS、JavaScript 、Vue 前端技術完成工作需求</p>
                </li>
              </ul>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="pt-40 pb-[92px] lg:pt-[188px] lg:pb-48">
          <div class="max-w-3xl flex flex-col">
            <div class="card-secondary-p0 lg:mr-3">
              <figure class="-mt-24">
                <img
                  src="https://images.unsplash.com/photo-1497021707778-a743a0bb2961?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjg1fHxwZXJzb258ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                  class="w-[180px] h-[180px] lg:w-60 lg:h-60 rounded-full object-cover"
                  alt="Ellipse_Img4"
                />
              </figure>
              <figure class="flex mt-[26px] mb-[14px]">
                <img src="../assets/img/IconGithub.svg" class="w-6 h-6" alt="Github_Img" />
                <img
                  src="../assets/img/IconInstagram.svg"
                  class="w-6 h-6 mx-4"
                  alt="Instagram_Img"
                />
                <img src="../assets/img/IconFacebook.svg" class="w-6 h-6" alt="Facebook_Img" />
              </figure>
              <h4 class="text-2xl font-medium">祥 Kao</h4>
              <p class="flex items-center mt-3 mb-4">
                <img
                  src="../assets/img/IconLocation.svg"
                  class="w-[9px] h-[13px]"
                  alt="Facebook_Img"
                />
                <span class="ml-2">東京</span>
              </p>
              <h5 class="text-xl font-medium text-white text-center bg-textself w-full py-6">
                網頁前端工程師
              </h5>
              <ul class="list-none list-outside p-6">
                <li class="flex">
                  <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                  <p>前端開發和設計的工作經驗</p>
                </li>
                <li class="flex">
                  <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                  <p>注重網頁的可用性和使用者體驗設計</p>
                </li>
                <li class="flex">
                  <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                  <p>使用 HTML、CSS、JavaScript 、Vue 前端技術完成工作需求</p>
                </li>
              </ul>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <!-- mail -->
      <button
        type="button"
        class="w-full btn btn-secondary flex justify-between items-center mt-15 lg:mt-24"
        id="mail"
      >
        <div class="flex flex-col lg:flex-row lg:justify-between items-center">
          <div class="flex lg:justify-between items-center">
            <img src="../assets/img/IconEmail.svg" class="w-6 h-6" alt="Mail_Img" />
            <p class="text-[28px] lg:text-[32px] font-bold ms-5">聯絡我們</p>
          </div>
          <p class="block lg:hidden text-xl lg:text-[28px] font-medium">email@mail.com</p>
        </div>
        <p class="hidden lg:block text-xl lg:text-[28px] font-medium">email@mail.com</p>
        <img src="../assets/img/IconArrowRight.svg" class="w-6 h-6" alt="Mail_ArrowRight_Img" />
      </button>
    </section>
    <!-- copyright -->
    <footer class="bg-textself text-white text-center">
      <p class="font-medium py-6">Copyright © 2023 傲嬌甜點 POS 系統</p>
    </footer>
  </main>
</template>

<style lang="scss" scoped>
::v-deep(.swiper-button-prev:after) {
  content: '';
  background-image: url('../assets/img/swiper_arrow_l.png');
  background-position: center center;
  height: 65px;
  width: 65px;
  border: 2px solid #171717;
  border-right: 4px solid #171717;
  border-bottom: 4px solid #171717;
  border-radius: 50%;
}

::v-deep(.swiper-button-next:after) {
  content: '';
  background-image: url('../assets/img/swiper_arrow_r.png');
  background-position: center center;
  height: 65px;
  width: 65px;
  border: 2px solid #171717;
  border-right: 4px solid #171717;
  border-bottom: 4px solid #171717;
  border-radius: 50%;
}

::v-deep(.swiper-button-prev) {
  height: 65px;
  width: 65px;
  left: 65%;
  top: 92%;
}

::v-deep(.swiper-button-next) {
  height: 65px;
  width: 65px;
  right: 15%;
  top: 92%;
}
</style>
