<script setup>
import SiderBar from '@/components/backEnd/SideBar.vue'
import Modal from '@/components/TheModal.vue'
import { ref, nextTick } from 'vue'
/**
 * modal
 * */
const isCreate = ref(false)
const childComponentRef = ref()

const handleModalOpen = (checkIsCreate, item) => {
  isCreate.value = checkIsCreate
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
  <aside class="fixed top-0 left-0 z-40 w-[315px] h-screen">
    <SiderBar />
  </aside>
  <div class="ml-[315px]">
    <nav class="bg-white border-b-2 border-textself p-6">
      <h1 class="flex items-center text-[36px] font-bold">座位管理</h1>
    </nav>
    <main class="bg-secondary-light min-h-screen p-6">
      <div class="flex justify-end mb-6">
        <button @click="handleModalOpen('create')" class="btn btn-dark whitespace-nowrap">編輯桌號</button>
      </div>
      <!-- table -->
      <ul class="grid grid-cols-12 gap-4">
        <li
          class="col-span-12 lg:col-span-6 xl:col-span-4 py-4 bg-white border-2 border-textself rounded-lg shadow"
        >
          <div class="flex justify-between items-center border-b-2 border-textself px-4">
            <p class="font-medium mb-5">
              桌號
              <span class="text-white bg-primary-light rounded py-1 px-2 t">1</span>
            </p>
            <p class="font-medium mb-5">
              人數
              <span class="text-white bg-textself rounded py-1 px-2">2</span>
            </p>
          </div>
          <div class="pl-4 pr-3 mt-4">
            <p class="font-medium">
              是否靠窗：
              <span class="ml-2">是</span>
            </p>
            <p class="font-medium">
              啟用日期：
              <span class="ml-2">20230101</span>
            </p>
            <div class="flex justify-between items-center mt-4">
              <p class="bg-secondary-light rounded py-1 px-2">已啟用</p>
              <div class="flex justify-between items-center">
                <button
                  @click="handleModalOpen('update')"
                  type="button"
                  class="btn btn-outline-dark mx-1"
                >
                  修改
                </button>
              </div>
            </div>
          </div>
        </li>
        <li
          class="col-span-12 lg:col-span-6 xl:col-span-4 py-4 bg-white border-2 border-textself rounded-lg shadow"
        >
          <div class="flex justify-between items-center border-b-2 border-textself px-4">
            <p class="font-medium mb-5">
              桌號
              <span class="text-white bg-primary-light rounded py-1 px-2 t">1</span>
            </p>
            <p class="font-medium mb-5">
              人數
              <span class="text-white bg-textself rounded py-1 px-2">2</span>
            </p>
          </div>
          <div class="pl-4 pr-3 mt-4">
            <p class="font-medium">
              是否靠窗：
              <span class="ml-2">是</span>
            </p>
            <p class="font-medium">
              啟用日期：
              <span class="ml-2">20230101</span>
            </p>
            <div class="flex justify-between items-center mt-4">
              <p class="bg-secondary-light rounded py-1 px-2">已啟用</p>
              <div class="flex justify-between items-center">
                <button
                  @click="handleModalOpen('update')"
                  type="button"
                  class="btn btn-outline-dark mx-1"
                >
                  修改
                </button>
              </div>
            </div>
          </div>
        </li>
        <li
          class="col-span-12 lg:col-span-6 xl:col-span-4 py-4 bg-white border-2 border-textself rounded-lg shadow"
        >
          <div class="flex justify-between items-center border-b-2 border-textself px-4">
            <p class="font-medium mb-5">
              桌號
              <span class="text-white bg-primary-light rounded py-1 px-2 t">1</span>
            </p>
            <p class="font-medium mb-5">
              人數
              <span class="text-white bg-textself rounded py-1 px-2">2</span>
            </p>
          </div>
          <div class="pl-4 pr-3 mt-4">
            <p class="font-medium">
              是否靠窗：
              <span class="ml-2">是</span>
            </p>
            <p class="font-medium">
              啟用日期：
              <span class="ml-2">20230101</span>
            </p>
            <div class="flex justify-between items-center mt-4">
              <p class="bg-secondary-light rounded py-1 px-2">已啟用</p>
              <div class="flex justify-between items-center">
                <button
                  @click="handleModalOpen('update')"
                  type="button"
                  class="btn btn-outline-dark mx-1"
                >
                  修改
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </main>
  </div>
  <Modal ref="childComponentRef">
    <section class="relative w-full h-full max-w-md md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white border-2 border-textself rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-center justify-end border-b-2 border-textself p-3 rounded-t">
          <h2 v-if="isCreate === 'create'" class="text-xl font-medium">編輯桌號</h2>
          <h2 v-else-if="isCreate === 'update'" class="text-xl font-medium">修改座位資料</h2>
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
          <form v-if="isCreate === 'create'" class="space-y-6" action="#">
            <div>
              <label for="form_seatNumber" class="block mb-2 font-medium"
                >桌號 (點擊紅色按鈕，即刻刪除該桌號資料)
              </label>
              <input type="text" id="form_seatNumber" class="form-input mr-2" />
              <div class="mt-3">
                <span class="bg-primary-light text-white font-medium mr-2 px-3 py-1 rounded"
                  >1</span
                >
                <span class="bg-primary-light text-white font-medium mr-2 px-3 py-1 rounded"
                  >2</span
                >
                <span class="bg-primary-light text-white font-medium mr-2 px-3 py-1 rounded"
                  >3</span
                >
              </div>
            </div>
            <!-- send_btn -->
            <div class="flex">
              <button type="button" class="w-full mr-1 btn btn-outline-dark">取消</button>
              <button type="submit" class="w-full ml-1 btn btn-dark">確定新增</button>
            </div>
          </form>
          <form v-else-if="isCreate === 'update'" class="space-y-6">
            <section class="flex justify-between items-center bg-bgself-light p-3 mb-3">
              <p class="font-medium">
                桌號
                <span class="text-white bg-primary-light rounded py-1 px-2 t">1</span>
              </p>
              <div class="flex items-center">
                <label for="form_seatPeopleLimit" class="block font-medium whitespace-nowrap mr-1"
                  >人數</label
                >
                <select id="form_seatPeopleLimit" class="form-select py-1 rounded">
                  <option value="2" selected>2</option>
                  <option value="4">4</option>
                  <option value="4">6</option>
                  <option value="4">8</option>
                </select>
              </div>
            </section>
            <div>
              <label for="form_seatWindow" class="block mb-2 font-medium">是否靠窗</label>
              <select id="form_seatWindow" class="form-select">
                <option value="是" selected>是</option>
                <option value="否">否</option>
              </select>
            </div>
            <div>
              <label for="form_seatStatus" class="block mb-2 font-medium">狀態</label>
              <select id="form_seatStatus" class="form-select">
                <option value="停用" selected>停用</option>
                <option value="啟用">啟用</option>
              </select>
            </div>
            <!-- send_btn -->
            <div class="flex">
              <button type="button" class="w-full mr-1 btn btn-outline-dark">取消</button>
              <button type="submit" class="w-full ml-1 btn btn-dark">確定</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </Modal>
</template>
<style scoped></style>
