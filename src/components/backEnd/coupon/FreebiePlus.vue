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
      編輯 A + B 優惠活動
    </button>
  </div>
  <!-- table -->
  <section class="overflow-auto bg-bgself-light rounded-xl p-6">
    <table class="w-full text-center">
      <thead class="text-xl font-medium text-secondary-light bg-textself">
        <tr class="border-b-2 border-black">
          <th class="py-3">分類名稱</th>
          <th class="py-3">優惠活動</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b-2 border-black">
          <td class="py-3 text-center">氣泡水 + 聖代</td>
          <td class="py-3 text-center">A + B</td>
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
          <h2 v-if="isCreate === 'create'" class="text-xl font-medium">編輯 A + B 優惠活動</h2>
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
            <!-- tag -->
            <section>
              <p class="font-medium text-primary text-xl mb-2">可選擇的分類</p>
              <div class="flex flex-wrap">
                <button
                  type="submit"
                  class="btn btn-primary font-medium my-2 mr-2 px-3 py-1 rounded"
                >
                  泡芙
                </button>
                <button
                  type="submit"
                  class="btn btn-primary font-medium my-2 mr-2 px-3 py-1 rounded"
                >
                  蛋糕
                </button>
                <button
                  type="submit"
                  class="btn btn-primary font-medium my-2 mr-2 px-3 py-1 rounded"
                >
                  其他
                </button>
              </div>
            </section>
            <!-- tag checked -->
            <section>
              <p class="font-medium text-primary text-xl mb-2">已選擇的分類 (最多兩種不重複的分類、點擊黃色按鈕，即刻刪除該分類)</p>
              <div class="flex flex-wrap">
                <button
                  type="submit"
                  class="btn btn-secondary font-medium my-2 mr-2 px-3 py-1 rounded"
                >
                  氣泡水
                </button>
                <button
                  type="submit"
                  class="btn btn-secondary font-medium my-2 mr-2 px-3 py-1 rounded"
                >
                  聖代
                </button>
              </div>
            </section>
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
