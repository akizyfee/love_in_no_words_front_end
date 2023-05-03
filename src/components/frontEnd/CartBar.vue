<script setup>
import Modal from '@/components/TheModal.vue'
import { ref, nextTick } from 'vue'
/**
 * modal
 * */
const childComponentRef = ref()

const handleModalOpen = () => {
  const childComponent = childComponentRef.value

  nextTick(() => {
    if (childComponent) {
      childComponent.openModal()
    }
  })
}
const handleModalClose = () => {
  const childComponent = childComponentRef.value

  nextTick(() => {
    if (childComponent) {
      childComponent.closeModal()
    }
  })
}
</script>
<template>
  <div class="w-full h-full border-l-2 border-textself">
    <div class="h-full bg-white flex flex-col justify-between">
      <div class="flex justify-between px-3 py-4 border-b-2 border-black">
        <h1 class="text-xl font-medium">確認訂單</h1>
        <p class="text-xl font-medium">
          桌號
          <span class="text-white bg-primary-light rounded py-1 px-2">2</span>
        </p>
      </div>
      <!-- cartList：圖片 -->
      <div v-if="cartLength === 0" class="text-center">
        <img src="@/assets/img/ImgFeature02.svg" class="object-cover" alt="Feature_Card_Img2" />
        <p class="font-medium">還沒有點選餐點喔！</p>
      </div>
      <!-- cartList -->
      <ul v-else class="flex flex-col p-3 overflow-scroll">
        <li class="flex justify-between items-center border-b border-textself pb-4">
          <div>
            <h2 class="font-medium text-xl">
              <span>香草鮮奶酪</span>
              <span>&emsp;x1</span>
            </h2>
            <p class="font-medium text-xl text-primary-light my-2">$80</p>
            <p
              class="inline text-sm font-medium text-white bg-secondary-light rounded-lg py-1 px-2"
            >
              已符合 A + B
            </p>
          </div>
          <div class="flex flex-col">
            <button @click="handleModalOpen" class="btn btn-outline-dark py-2 px-3 mb-2">
              修改
            </button>
            <button @click="handleModalOpen" class="btn btn-outline-dark py-2 px-3">刪除</button>
          </div>
        </li>
        <li class="flex justify-between items-center border-b border-textself py-4">
          <div>
            <h2 class="font-medium text-xl">
              <span>巧克力糖霜甜甜圈</span>
              <span>&emsp;x2</span>
            </h2>
            <p class="font-medium text-xl text-primary-light my-2">$300</p>
            <p
              class="inline text-sm font-medium text-white bg-secondary-light rounded-lg py-1 px-2"
            >
              已符合買一送一
            </p>
          </div>
          <div class="flex flex-col">
            <button @click="handleModalOpen" class="btn btn-outline-dark py-2 px-3 mb-2">
              修改
            </button>
            <button @click="handleModalOpen" class="btn btn-outline-dark py-2 px-3">刪除</button>
          </div>
        </li>
        <li class="flex justify-between items-center border-b border-textself pb-4">
          <div>
            <h2 class="font-medium text-xl">
              <span>香草鮮奶酪</span>
              <span>&emsp;x1</span>
            </h2>
            <p class="font-medium text-xl text-primary-light my-2">$80</p>
            <p
              class="inline text-sm font-medium text-white bg-secondary-light rounded-lg py-1 px-2"
            >
              已符合 A + B
            </p>
          </div>
          <div class="flex flex-col">
            <button @click="handleModalOpen" class="btn btn-outline-dark py-2 px-3 mb-2">
              修改
            </button>
            <button @click="handleModalOpen" class="btn btn-outline-dark py-2 px-3">刪除</button>
          </div>
        </li>
        <li class="flex justify-between items-center border-b border-textself py-4">
          <div>
            <h2 class="font-medium text-xl">
              <span>巧克力糖霜甜甜圈</span>
              <span>&emsp;x2</span>
            </h2>
            <p class="font-medium text-xl text-primary-light my-2">$300</p>
            <p
              class="inline text-sm font-medium text-white bg-secondary-light rounded-lg py-1 px-2"
            >
              已符合買一送一
            </p>
          </div>
          <div class="flex flex-col">
            <button @click="handleModalOpen" class="btn btn-outline-dark py-2 px-3 mb-2">
              修改
            </button>
            <button @click="handleModalOpen" class="btn btn-outline-dark py-2 px-3">刪除</button>
          </div>
        </li>
      </ul>
      <!-- cartBtn -->
      <ul class="grid grid-cols-2 gap-3 border-y-2 p-3 border-textself">
        <li class="col-span-2 lg:col-span-1">
          <button
            @click="handleModalOpen"
            class="w-full btn btn-outline-dark flex items-center justify-center"
          >
            <span>查詢會員</span>
            <img class="ms-2" src="@/assets/img/IconMemberSearch.png" alt="IconMemberSearch" />
          </button>
        </li>
        <li class="col-span-2 lg:col-span-1">
          <button
            @click="handleModalOpen"
            class="w-full btn btn-outline-dark flex items-center justify-center"
          >
            <span>加入會員</span>
            <img class="ms-2" src="@/assets/img/IconMemberPlus.png" alt="IconMemberSearch" />
          </button>
        </li>
        <li class="col-span-2 lg:col-span-1">
          <button
            @click="handleModalOpen"
            class="w-full btn btn-outline-dark flex items-center justify-center"
          >
            <span>選擇活動</span>
            <img class="ms-2" src="@/assets/img/IconSelectaActivity.png" alt="IconMemberSearch" />
          </button>
        </li>
        <li class="col-span-2 lg:col-span-1">
          <button
            @click="handleModalOpen"
            class="w-full btn btn-outline-dark flex items-center justify-center"
          >
            <span>金額試算</span>
            <img class="ms-2" src="@/assets/img/IconCashCalculate.png" alt="IconMemberSearch" />
          </button>
        </li>
      </ul>
      <div class="flex flex-col px-3 py-4">
        <p class="flex justify-between items-center font-medium">
          <span>製作時間</span>
          <span>0 分</span>
        </p>
        <p class="flex justify-between items-center font-medium">
          <span>&emsp;&emsp;餐點</span>
          <span>0 份</span>
        </p>
        <p class="flex justify-between items-center font-medium mt-4">
          <span>折扣金額</span>
          <span class="text-primary">0</span>
        </p>
        <p class="flex justify-between items-center font-medium mb-7">
          <span class="text-xl ps-1">&emsp;合計</span>
          <span class="text-xl text-primary">NT$ 0</span>
        </p>
        <router-link to="/" class="btn btn-dark py-2 w-full"> 送出訂單 </router-link>
      </div>
    </div>
  </div>
  <Modal ref="childComponentRef">
    <div class="relative w-full h-full max-w-2xl md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Terms of Service</h3>
          <button
            @click="handleModalClose()"
            type="button"
            class="text-gray-400 bg-black hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only text-black">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <p>11</p>
        </div>
        <!-- Modal footer -->
        <div
          class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            I accept
          </button>
          <button
            type="button"
            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>
<style scoped></style>
