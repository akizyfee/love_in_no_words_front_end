<script setup>
import Modal from '@/components/TheModal.vue'
import { ref, nextTick } from 'vue'
/**
 * modal
 * */
const isCreate = ref(false)
const childComponentRef = ref()

const handleModalOpen = (checkIsNew, item) => {
  isCreate.value = checkIsNew
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
  <div class="flex justify-end my-6">
    <button @click="handleModalOpen('create')" class="btn btn-dark whitespace-nowrap">
      編輯買一送一活動
    </button>
  </div>
  <!-- table -->
  <section class="overflow-auto bg-bgself-light rounded-xl p-6">
    <table class="w-full text-center">
      <thead class="text-xl font-medium text-secondary-light bg-textself">
        <tr class="border-b-2 border-black">
          <th class="py-3">商品名稱</th>
          <th class="py-3">優惠活動</th>
          <th class="py-3"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b-2 border-black">
          <td class="py-3 text-center">草莓蛋糕</td>
          <td class="py-3 text-center">買一送一</td>
          <td class="flex justify-end">
            <button
              @click="handleModalOpen('delete')"
              class="btn btn-outline-dark w-auto mx-1 my-2"
            >
              刪除
            </button>
          </td>
        </tr>
        <tr class="border-b-2 border-black">
          <td class="py-3 text-center">巧克力蛋糕</td>
          <td class="py-3 text-center">買一送一</td>
          <td class="flex justify-end">
            <button
              @click="handleModalOpen('delete')"
              class="btn btn-outline-dark w-auto mx-1 my-2"
            >
              刪除
            </button>
          </td>
        </tr>
        <tr class="border-b-2 border-black">
          <td class="py-3 text-center">玫瑰馬卡龍</td>
          <td class="py-3 text-center">買一送一</td>
          <td class="flex justify-end">
            <button
              @click="handleModalOpen('delete')"
              class="btn btn-outline-dark w-auto mx-1 my-2"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  <Modal ref="childComponentRef">
    <section class="relative w-full h-full max-w-2xl md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white border-2 border-textself rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-center justify-end border-b-2 border-textself p-3 rounded-t">
          <h2 v-if="isCreate === 'create'" class="text-xl font-medium">新增買一送一活動</h2>
          <h2 v-else-if="isCreate === 'delete'" class="text-xl font-medium">刪除買一送一活動</h2>
          <button
            @click="handleModalClose()"
            type="button"
            class="text-gray-400 bg-black hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
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
        <div class="w-full rounded-lg p-3">
          <form v-if="isCreate === 'create'" class="space-y-3" action="#">
            <!-- menu -->
            <ul class="flex text-xl font-medium">
              <li class="mr-2">
                <a
                  href="#"
                  class="block px-6 py-3 rounded-lg hover:text-primary-light hover:bg-white tabbar-active"
                  >全部</a
                >
              </li>
              <li class="mr-2">
                <a
                  href="#"
                  class="block px-6 py-3 rounded-lg hover:text-primary-light hover:bg-white"
                  >泡芙</a
                >
              </li>
              <li class="mr-2">
                <a
                  href="#"
                  class="block px-6 py-3 rounded-lg hover:text-primary-light hover:bg-white"
                  >聖代</a
                >
              </li>
              <li class="mr-2">
                <a
                  href="#"
                  class="block px-6 py-3 rounded-lg hover:text-primary-light hover:bg-white"
                  >蛋糕</a
                >
              </li>
              <li class="mr-2">
                <a
                  href="#"
                  class="block px-6 py-3 rounded-lg hover:text-primary-light hover:bg-white"
                  >氣泡水</a
                >
              </li>
              <li class="mr-2">
                <a
                  href="#"
                  class="block px-6 py-3 rounded-lg hover:text-primary-light hover:bg-white"
                  >其他</a
                >
              </li>
            </ul>
            <!-- productCard -->
            <section class="h-[300px] overflow-y-auto">
              <ul class="grid grid-cols-12 gap-4">
                <li class="col-span-4 bg-white border-2 border-textself rounded-lg shadow">
                  <div class="relative">
                    <img
                      class="rounded-t-lg object-cover w-full h-[120px]"
                      src="https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzc2VydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                      alt="ImgProduct"
                    />
                    <p
                      class="bg-secondary-light px-2 py-1 text-sm font-normal absolute bottom-2 left-2"
                    >
                      甜點
                    </p>
                  </div>
                  <div class="p-3 rounded-bl-lg rounded-br-lg">
                    <h2 class="font-medium mb-3">香草鮮奶酪</h2>
                    <div class="flex justify-between items-center">
                      <p class="text-primary-light font-bold">$80</p>
                      <p class="font-normal">
                        <span class="text-neutralself-200">庫存</span>
                        &ensp;5份
                      </p>
                    </div>
                  </div>
                </li>
                <li class="col-span-4 bg-white border-2 border-textself rounded-lg shadow">
                  <div class="relative">
                    <img
                      class="rounded-t-lg object-cover w-full h-[120px]"
                      src="https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzc2VydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                      alt="ImgProduct"
                    />
                    <p
                      class="bg-secondary-light px-2 py-1 text-sm font-normal absolute bottom-2 left-2"
                    >
                      甜點
                    </p>
                  </div>
                  <div class="p-3 rounded-bl-lg rounded-br-lg">
                    <h2 class="font-medium mb-3">香草鮮奶酪</h2>
                    <div class="flex justify-between items-center">
                      <p class="text-primary-light font-bold">$80</p>
                      <p class="font-normal">
                        <span class="text-neutralself-200">庫存</span>
                        &ensp;5份
                      </p>
                    </div>
                  </div>
                </li>
                <li class="col-span-4 bg-white border-2 border-textself rounded-lg shadow">
                  <div class="relative">
                    <img
                      class="rounded-t-lg object-cover w-full h-[120px]"
                      src="https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzc2VydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                      alt="ImgProduct"
                    />
                    <p
                      class="bg-secondary-light px-2 py-1 text-sm font-normal absolute bottom-2 left-2"
                    >
                      甜點
                    </p>
                  </div>
                  <div class="p-3 rounded-bl-lg rounded-br-lg">
                    <h2 class="font-medium mb-3">香草鮮奶酪</h2>
                    <div class="flex justify-between items-center">
                      <p class="text-primary-light font-bold">$80</p>
                      <p class="font-normal">
                        <span class="text-neutralself-200">庫存</span>
                        &ensp;5份
                      </p>
                    </div>
                  </div>
                </li>
                <li class="col-span-4 bg-white border-2 border-textself rounded-lg shadow">
                  <div class="relative">
                    <img
                      class="rounded-t-lg object-cover w-full h-[120px]"
                      src="https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzc2VydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                      alt="ImgProduct"
                    />
                    <p
                      class="bg-secondary-light px-2 py-1 text-sm font-normal absolute bottom-2 left-2"
                    >
                      甜點
                    </p>
                  </div>
                  <div class="p-3 rounded-bl-lg rounded-br-lg">
                    <h2 class="font-medium mb-3">香草鮮奶酪</h2>
                    <div class="flex justify-between items-center">
                      <p class="text-primary-light font-bold">$80</p>
                      <p class="font-normal">
                        <span class="text-neutralself-200">庫存</span>
                        &ensp;5份
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </section>
            <!-- tag -->
            <section>
              <p class="font-medium mb-2">已選擇商品</p>
              <div class="flex flex-wrap">
                <button
                  type="submit"
                  class="btn btn-secondary font-medium my-2 mr-2 px-3 py-1 rounded"
                >
                  草莓蛋糕
                </button>
                <button
                  type="submit"
                  class="btn btn-secondary font-medium my-2 mr-2 px-3 py-1 rounded"
                >
                  巧克力蛋糕
                </button>
                <button
                  type="submit"
                  class="btn btn-secondary font-medium my-2 mr-2 px-3 py-1 rounded"
                >
                  玫瑰馬卡龍
                </button>
              </div>
            </section>
            <!-- send_btn -->
            <button type="submit" class="w-full btn btn-dark">確定新增</button>
          </form>
          <form v-else-if="isCreate === 'delete'" class="space-y-3" action="#">
            <h3 class="text-xl font-medium text-neutral-400">
              請確認是否刪除
              <span class="text-primary-light">買一送一活動</span> ?
            </h3>
            <!-- send_btn -->
            <button type="submit" class="w-full btn btn-dark">確認刪除</button>
          </form>
        </div>
      </div>
    </section>
  </Modal>
</template>
<style scoped>
.tabbar-active {
  @apply bg-bgself-light;
}
</style>
