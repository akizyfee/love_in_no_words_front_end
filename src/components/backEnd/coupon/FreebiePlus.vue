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
  <p>A+B</p>
  <div class="flex justify-end my-6">
    <button @click="handleModalOpen('create')" class="btn btn-dark whitespace-nowrap">
      編輯優惠
    </button>
  </div>
  <!-- table -->
  <section class="relative overflow-x-auto bg-bgself-light rounded-xl p-6">
    <table class="w-full text-center">
      <thead class="text-xl font-medium text-secondary-light bg-textself">
        <tr class="border-b-2 border-black">
          <th class="py-3">分類名稱</th>
          <th class="py-3">優惠活動</th>
          <th class="py-3"></th>
          <!-- <th class="py-3"></th> -->
        </tr>
      </thead>
      <tbody>
        <tr class="border-b-2 border-black">
          <td class="py-3 text-center">飲料 + 蛋糕</td>
          <td class="py-3 text-center">A + B</td>
          <th class="py-3">
            <button class="btn btn-outline-dark w-auto mx-1 my-2">刪除</button>
          </th>
          <!-- <th class="flex justify-end">
            <button
              @click="handleModalOpen('update')"
              class="btn btn-outline-dark w-auto mx-1 my-2"
            >
              修改
            </button>
            <button
              @click="handleModalOpen('update')"
              class="btn btn-outline-dark w-auto mx-1 my-2"
            >
              刪除
            </button>
          </th> -->
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
          <h2 v-if="isCreate === 'create'" class="text-xl font-medium">A + B 優惠活動</h2>
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
            <!-- tag -->
            <section>
              <p class="font-medium text-primary text-xl">可選擇的分類</p>
              <div class="mt-3">
                <span class="bg-primary-light text-white font-medium mr-2 px-3 py-1 rounded"
                  >檸檬水</span
                >
                <span class="bg-primary-light text-white font-medium mr-2 px-3 py-1 rounded"
                  >聖代</span
                >
                <span class="bg-primary-light text-white font-medium mr-2 px-3 py-1 rounded"
                  >馬卡龍</span
                >
              </div>
            </section>
            <!-- tag checked -->
            <section>
              <p class="font-medium text-primary text-xl">已選擇的分類 ( 最多兩種不重複的分類 )</p>
              <div class="mt-3">
                <span class="bg-primary-light text-white font-medium mr-2 px-3 py-1 rounded"
                  >檸檬水</span
                >
                <span class="bg-primary-light text-white font-medium mr-2 px-3 py-1 rounded"
                  >聖代</span
                >
                <span class="bg-primary-light text-white font-medium mr-2 px-3 py-1 rounded"
                  >馬卡龍</span
                >
              </div>
              <p class="text-primary-dark mt-2">點擊標籤即可取消</p>
            </section>
            <!-- send_btn -->
            <div class="flex">
              <button type="button" class="w-full mr-1 btn btn-outline-dark">清空選擇</button>
              <button type="submit" class="w-full ml-1 btn btn-dark">確定</button>
            </div>
          </form>
          <form v-else-if="isCreate === 'update'" class="space-y-6" action="#">
            <!-- number -->
            <div>
              <label for="form_couponNumber" class="block mb-2 font-medium">優惠編號 </label>
              <input type="text" id="form_couponNumber" class="form-input mr-2" />
            </div>
            <!-- name -->
            <div>
              <label for="form_couponName" class="block mb-2 font-medium">優惠名稱 </label>
              <input type="text" id="form_couponName" class="form-input mr-2" />
            </div>
            <!-- couponCode -->
            <div>
              <label for="form_couponCode" class="block mb-2 font-medium">優惠代碼 </label>
              <input type="text" id="form_couponCode" class="form-input mr-2" />
            </div>
            <!-- couponDiscount -->
            <div>
              <label for="form_couponDiscount " class="block mb-2 font-medium">折扣比例 </label>
              <input type="text" id="form_couponDiscount" class="form-input mr-2" />
            </div>
            <!-- status -->
            <div>
              <label for="form_couponStatus" class="block mb-2 font-medium">狀態</label>
              <select id="form_couponStatus" class="form-select">
                <option value="停用" selected>停用</option>
                <option value="啟用">啟用</option>
              </select>
            </div>
            <!-- send_btn -->
            <div class="flex">
              <button type="button" class="w-full mr-1 btn btn-outline-dark">刪除</button>
              <button type="submit" class="w-full ml-1 btn btn-dark">確定</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </Modal>
</template>
<style scoped>
.tabbar-active {
  @apply text-primary-light;
}
</style>
