<script setup>
import Modal from '../components/TheModal.vue'
import TheIcon from '../components/TheIcon.vue'
// import TheAlert from '../components/TheAlert.vue'

import { ref, nextTick } from 'vue'

// const msgs = ref([])

/**
 * 環境變數測試
 * 如果沒有要暴露給用戶看到的取名的時候不要加VITE開頭
 * */
console.log(import.meta.env.VITE_APP_TITLE)

/**
 * modal開關
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

/**
 * 變色卡
 * */
const theme = ref('red')
</script>

<template>
  <main>
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
    <button
      @click="handleModalOpen"
      class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="button"
    >
      Toggle modal
    </button>
    <TheIcon icon="home" />
    <div>123</div>
  </main>
  <!-- <button @click="msgs.push(`餐點消息${msgs.length + 1}`)"
      class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="button">
      通知++
  </button> -->
  <TheAlert v-for="msg in msgs" :key="msg">
    {{ msg }}
  </TheAlert>
  <!-- 變色卡 -->
  <div
    class="w-[232px] relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="relative">
      <a href="#"></a>
      <p class="absolute bottom-0">分類:氣泡水</p>
    </div>
    <div
      :class="[
        'transition-all duration-500 p-3',
        theme === 'red' && 'text-red-600 bg-red-300',
        theme === 'blue' && 'text-blue-600 bg-blue-300',
        theme === 'green' && 'text-green-600 bg-green-300'
      ]"
    >
      <p class="mb-0">檸檬氣泡水</p>
      <p class="mb-0">＄40</p>
      <p class="text-end">庫存：9份</p>
      <p class="text-end">製作時間：20分鐘</p>
    </div>
    <section
      v-if="theme === 'over'"
      class="absolute top-0 bottom-0 left-0 right-0 bg-gray-800 opacity-70"
    >
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span class="text-2xl text-white py-4 px-8 whitespace-nowrap bg-pink-950">已售完</span>
      </div>
    </section>
    <section
      v-if="theme === 'stop'"
      class="absolute top-0 bottom-0 left-0 right-0 bg-gray-800 opacity-70"
    >
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span class="text-2xl text-white py-4 px-8 whitespace-nowrap bg-pink-950">已停用</span>
      </div>
    </section>
  </div>
  <button @click="theme = 'red'" class="p-1 m-1 bg-gray-200 rounded">紅色主題</button>
  <button @click="theme = 'blue'" class="p-1 m-1 bg-gray-200 rounded">藍色主題</button>
  <button @click="theme = 'green'" class="p-1 m-1 bg-gray-200 rounded">綠色主題</button>
  <button @click="theme = 'over'" class="p-1 m-1 bg-gray-200 rounded">已售完</button>
  <button @click="theme = 'stop'" class="p-1 m-1 bg-gray-200 rounded">已售完</button>
</template>
<style></style>
