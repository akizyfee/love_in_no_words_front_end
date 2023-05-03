<script setup>
import Modal from '@/components/TheModal.vue'
import { ref, nextTick } from 'vue'
/**
 * modal
 * */
const isNew = ref(false)
const childComponentRef = ref()

const handleModalOpen = (checkIsNew, item) => {
  isNew.value = checkIsNew
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
  <p>優惠碼</p>
  <div class="flex justify-end my-6">
    <button @click="handleModalOpen(true)" class="btn btn-dark whitespace-nowrap">新增優惠碼</button>
  </div>
  <!-- table -->
  <section class="relative overflow-x-auto bg-bgself-light rounded-xl p-6">
    <table class="w-full text-center">
      <thead class="text-xl font-medium text-secondary-light bg-textself">
        <tr class="border-b-2 border-textself">
          <th class="py-3">優惠名稱</th>
          <th class="py-3">優惠代碼</th>
          <th class="py-3">折扣比例</th>
          <th class="py-3">停用時間</th>
          <th class="py-3">停用狀態</th>
          <th class="py-3"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b-2 border-textself">
          <td class="py-3">85折</td>
          <td class="py-3">15%off</td>
          <td class="py-3">15%</td>
          <th class="py-3">2023/05/01</th>
          <th class="py-3">停用</th>
          <th class="flex justify-end">
            <button
              @click="handleModalOpen('update')"
              class="btn btn-outline-dark w-auto mx-1 my-2"
            >
              修改
            </button>
            <button
              @click="handleModalOpen('delete')"
              class="btn btn-outline-dark w-auto mx-1 my-2"
            >
              刪除
            </button>
          </th>
        </tr>
      </tbody>
    </table>
  </section>
  <Modal ref="childComponentRef">
    <div class="relative w-full h-full max-w-sm md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow pt-10">
        <!-- Modal header -->
        <div class="flex items-start justify-end px-8 rounded-t">
          <p v-if="isNew === true" class="text-2xl font-semibold text-gray-900">新增使用者資料</p>
          <p v-if="isNew === false" class="text-2xl font-semibold text-gray-900">修改使用者資料</p>
          <p v-if="isNew === 'delete'" class="text-2xl font-semibold text-gray-900">
            刪除使用者資料
          </p>
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
        <div class="w-full p-4 bg-white rounded-lg sm:p-6 md:p-8 mx-auto">
          <form v-if="isNew !== 'delete'" class="space-y-6" action="#">
            <div>
              <label for="name" class="block mb-2 text-xl font-medium text-gray-900">姓名</label>
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name"
                required
              />
            </div>
            <div>
              <label for="phone" class="block mb-2 text-xl font-medium text-gray-900">電話</label>
              <input
                type="phone"
                name="phone"
                id="phone"
                placeholder="0908-xxx-xxx"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label for="job" class="block mb-2 text-xl font-medium text-gray-900">職位</label>
              <input
                type="text"
                name="job"
                id="job"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="job"
                required
              />
            </div>
            <div v-if="isNew === false">
              <label for="password" class="block mb-2 text-xl font-medium text-gray-900"
                >密碼</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <!-- time -->
            <p v-if="isNew === false" class="text-xl font-semibold text-gray-900">
              註冊日期 : 2023/03/10
            </p>
            <!-- ratio -->
            <section class="flex justify-center">
              <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-black hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
                >
                  <label for="bordered-radio-1" class="text-xl">
                    啟用
                    <input
                      checked
                      id="bordered-radio-1"
                      type="radio"
                      value=""
                      name="bordered-radio"
                      class="hidden"
                    />
                  </label>
                </button>
                <button
                  type="button"
                  class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-black hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
                >
                  <label for="bordered-radio-2" class="text-xl">
                    停用
                    <input
                      id="bordered-radio-2"
                      type="radio"
                      value=""
                      name="bordered-radio"
                      class="hidden"
                    />
                  </label>
                </button>
              </div>
            </section>
            <!-- send_btn -->
            <section class="flex">
              <button
                type="button"
                class="w-full mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                取消
              </button>
              <button
                type="submit"
                class="w-full mx-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                確認新增
              </button>
            </section>
          </form>
          <section v-if="isNew === 'delete'">
            <p class="text-xl font-semibold text-gray-900">是否要刪除使用者資料?</p>
            <!-- send_btn -->
            <section class="flex mt-12">
              <button
                type="button"
                class="w-full me-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                取消
              </button>
              <button
                type="submit"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                確認新增
              </button>
            </section>
          </section>
        </div>
      </div>
    </div>
  </Modal>
</template>
