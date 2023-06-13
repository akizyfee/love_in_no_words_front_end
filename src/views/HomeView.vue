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
 * 跳轉至對應的錨點、寄信
 */
const toHref = (id) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
const mailtoHref = () => {
  const mail = 'mailto:loveinnowords@gmail.com'
  self.location.href = mail
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
      <div dir="rtl">
        <h1 class="text-[32px] lg:text-[64px] font-bold text-center lg:text-left relative">
          傲嬌甜點
          <span class="block lg:inline">POS 點餐系統</span>
          <figure class="absolute -top-14 -start-14">
            <img
              src="../assets/img/ImgTitleBg.svg"
              class="w-[66px] h-14 object-cover"
              alt="ImgTitleBg_Img"
            />
          </figure>
        </h1>
      </div>
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
    <section class="bg-secondary-light border-y-2 border-textself relative overflow-hidden -z-20">
      <figure class="absolute -left-44 lg:-left-0 pt-[86px] lg:pt-[120px] lg:pl-[120px] -z-10">
        <img
          src="../assets/img/ImgPointBg01.svg"
          class="w-[350px] h-[109px] object-cover"
          alt="ImgPointBg01_Img"
        />
      </figure>
      <figure class="absolute -bottom-6 -right-16 lg:bottom-0 lg:right-0 pb-0 lg:pr-6">
        <img
          src="../assets/img/ImgPointBg02.svg"
          class="w-[311px] h-[114px] lg:w-[580px] lg:h-[213px] object-cover"
          alt="ImgPointBg02_Img"
        />
      </figure>
      <h3 class="text-center text-[28px] lg:text-[32px] font-bold p-12 lg:pt-24 lg:pb-16 z-10">
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
        <ul class="col-span-12 lg:col-span-5 flex flex-col items-center list-none list-inside z-10">
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
    <section id="feature" class="relative overflow-hidden">
      <figure class="absolute -left-16 lg:pt-[360px] hidden lg:block">
        <img
          src="../assets/img/ImgFeatureBg01.svg"
          class="w-[270px] h-[310px] object-cover"
          alt="ImgFeatureBg01_Img"
        />
      </figure>
      <figure class="absolute right-2.5 lg:pt-[665px] hidden lg:block">
        <img
          src="../assets/img/ImgFeatureBg02.svg"
          class="w-[203px] h-[110px] object-cover"
          alt="ImgFeatureBg02_Img"
        />
      </figure>
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
    <section class="relative overflow-hidden" id="about">
      <figure class="absolute -top-20 -left-20 -z-10">
        <img
          src="../assets/img/ImgAboutBg01.svg"
          class="w-[284px] h-[282px] object-cover"
          alt="ImgAboutBg01_Img"
        />
      </figure>
      <figure class="absolute -right-4 pt-[101px] lg:right-2.5 lg:pr-[254px]">
        <img
          src="../assets/img/ImgAboutBg02.svg"
          class="w-[89px] h-[68px] object-cover"
          alt="ImgAboutBg02_Img"
        />
      </figure>
      <figure class="absolute left-1/4 lg:pt-[756px] hidden lg:block">
        <img
          src="../assets/img/ImgAboutBg03.svg"
          class="w-[218px] h-[152px] object-cover"
          alt="ImgAboutBg03_Img"
        />
      </figure>
      <div class="pt-[60px] pb-12 lg:py-24 mx-3 lg:mx-[240px]">
        <h3 class="text-center text-[28px] lg:text-[32px] font-bold z-10">關於我們</h3>
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
            <a class="flex flex-col max-w-3xl" href="https://github.com/hiYifang" target="_blank">
              <div class="card-secondary-p0 lg:mr-3">
                <figure class="-mt-24">
                  <img
                    src="../assets/img/Eva.png"
                    class="w-[180px] h-[180px] lg:w-60 lg:h-60 rounded-full object-cover"
                    alt="Eva_Img"
                  />
                </figure>
                <figure class="flex mt-[26px] mb-[14px]">
                  <img src="../assets/img/IconGithub.svg" class="w-6 h-6" alt="Github_Img" />
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
                  前端工程師
                </h5>
                <ul class="list-none list-outside p-6">
                  <li class="flex">
                    <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                    <p>由非本科系轉職，主要以 Vue.js 技術開發約半年的經驗</p>
                  </li>
                  <li class="flex">
                    <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                    <p>喜歡共同學習、成長的感覺，報名課程給予一個自我挑戰的目標</p>
                  </li>
                  <li class="flex">
                    <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                    <p>目前熱衷於寶可夢的太晶團體戰，可以一起揪團連線！</p>
                  </li>
                </ul>
              </div>
            </a>
          </swiper-slide>
          <swiper-slide class="pt-40 pb-[92px] lg:pt-[188px] lg:pb-48">
            <a class="max-w-3xl flex flex-col" href="https://github.com/ChrisC0210" target="_blank">
              <div class="card-secondary-p0 lg:mr-3">
                <figure class="-mt-24">
                  <img
                    src="../assets/img/Christina.png"
                    class="w-[180px] h-[180px] lg:w-60 lg:h-60 rounded-full object-cover"
                    alt="Christina_Img"
                  />
                </figure>
                <figure class="flex mt-[26px] mb-[14px]">
                  <img src="../assets/img/IconGithub.svg" class="w-6 h-6" alt="Github_Img" />
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
                    <p>擁有 3~4 年網頁設計經驗，掌握 Bootstrap、Vue.js 技術開發約半年的經驗</p>
                  </li>
                  <li class="flex">
                    <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                    <p>為了探索 Node.js，報名課程提升自我</p>
                  </li>
                  <li class="flex">
                    <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                    <p>喜歡樂高、公仔和玩遊戲，歡迎同好找我一起討論～</p>
                  </li>
                </ul>
              </div>
            </a>
          </swiper-slide>
          <swiper-slide class="pt-40 pb-[92px] lg:pt-[188px] lg:pb-48">
            <a class="max-w-3xl flex flex-col" href="https://github.com/akizyfee" target="_blank">
              <div class="card-secondary-p0 lg:mr-3">
                <figure class="-mt-24">
                  <img
                    src="../assets/img/Pause.png"
                    class="w-[180px] h-[180px] lg:w-60 lg:h-60 rounded-full object-cover"
                    alt="Pause_Img"
                  />
                </figure>
                <figure class="flex mt-[26px] mb-[14px]">
                  <img src="../assets/img/IconGithub.svg" class="w-6 h-6" alt="Github_Img" />
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
                  前端工程師
                </h5>
                <ul class="list-none list-outside p-6">
                  <li class="flex">
                    <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                    <p>擁有 Bootstrap、Vue.js 開發經驗一年</p>
                  </li>
                  <li class="flex">
                    <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                    <p>重視團隊合作，報名課程來強化與後端的溝通技巧</p>
                  </li>
                  <li class="flex">
                    <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                    <p>夢想得到各種讓生活更便利和貼近人性的科技技術，如果買不到，就自己 coding!</p>
                  </li>
                </ul>
              </div>
            </a>
          </swiper-slide>
          <swiper-slide class="pt-40 pb-[92px] lg:pt-[188px] lg:pb-48">
            <a class="max-w-3xl flex flex-col" href="https://github.com/kerickkkkk" target="_blank">
              <div class="card-secondary-p0 lg:mr-3">
                <figure class="-mt-24">
                  <img
                    src="../assets/img/Eric.png"
                    class="w-[180px] h-[180px] lg:w-60 lg:h-60 rounded-full object-cover"
                    alt="Eric_Img"
                  />
                </figure>
                <figure class="flex mt-[26px] mb-[14px]">
                  <img src="../assets/img/IconGithub.svg" class="w-6 h-6" alt="Github_Img" />
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
                  前端工程師
                </h5>
                <ul class="list-none list-outside p-6">
                  <li class="flex">
                    <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                    <p>主要使用 Bootstrap、Vue.js 技術進行開發</p>
                  </li>
                  <li class="flex">
                    <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                    <p>
                      秉持著一群人走得更遠的想法，常扮演溝通的橋樑，報名課程來磨練如何建立團隊技巧
                    </p>
                  </li>
                  <li class="flex">
                    <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                    <p>喜歡美食，歡迎找我一起吃遍台南小吃</p>
                  </li>
                </ul>
              </div>
            </a>
          </swiper-slide>
          <swiper-slide class="pt-40 pb-[92px] lg:pt-[188px] lg:pb-48">
            <a
              class="max-w-3xl flex flex-col"
              href="https://github.com/Patrick-Kao"
              target="_blank"
            >
              <div class="card-secondary-p0 lg:mr-3">
                <figure class="-mt-24">
                  <img
                    src="../assets/img/Kao.png"
                    class="w-[180px] h-[180px] lg:w-60 lg:h-60 rounded-full object-cover"
                    alt="Kao_Img"
                  />
                </figure>
                <figure class="flex mt-[26px] mb-[14px]">
                  <img src="../assets/img/IconGithub.svg" class="w-6 h-6" alt="Github_Img" />
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
                  全端工程師
                </h5>
                <ul class="list-none list-outside p-6">
                  <li class="flex">
                    <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                    <p>擁有 Bootstrap、Nuxt.js、Java、Spring Boot 等一年的開發經驗</p>
                  </li>
                  <li class="flex">
                    <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                    <p>想讓未來的自己更貼近心目中理想的日本企業要求，報名課程來鍛鍊</p>
                  </li>
                  <li class="flex">
                    <img src="../assets/img/IconList.svg" class="w-6 h-6" alt="List_Img" />
                    <p>重視健康管理，平時有進行飲食控制，歡迎有興趣者找我討論如何規劃！</p>
                  </li>
                </ul>
              </div>
            </a>
          </swiper-slide>
        </swiper>
        <!-- mail -->
        <button
          type="button"
          class="w-full btn btn-secondary flex justify-between items-center mt-15 lg:mt-24"
          @click="mailtoHref"
        >
          <div class="flex flex-col lg:flex-row lg:justify-between items-center">
            <div class="flex lg:justify-between items-center">
              <img src="../assets/img/IconEmail.svg" class="w-6 h-6" alt="Mail_Img" />
              <p class="text-[28px] lg:text-[32px] font-bold ms-5">聯絡我們</p>
            </div>
            <p class="block lg:hidden text-xl lg:text-[28px] font-medium">
              loveinnowords@gmail.com
            </p>
          </div>
          <p class="hidden lg:block text-xl lg:text-[28px] font-medium">loveinnowords@gmail.com</p>
          <img src="../assets/img/IconArrowRight.svg" class="w-6 h-6" alt="Mail_ArrowRight_Img" />
        </button>
      </div>
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
