<script setup>
import SiderBar from '@/components/frontEnd/SideBar.vue'
import Modal from '@/components/TheModal.vue'
import { ref, nextTick } from 'vue'
/**
 * modal
 * */
const isCreate = ref(false)
const childComponentRef = ref()

const handleModalOpen = (checkisCreate, item) => {
  isCreate.value = checkisCreate
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
  <section class="ml-[315px]">
    <!-- title -->
    <nav class="bg-white border-b-2 border-textself p-6">
      <h1 class="flex items-center text-[36px] font-bold">會員資料</h1>
    </nav>
    <main class="bg-secondary-light min-h-screen p-6">
      <div class="flex justify-between items-end mb-6">
        <div class="flex flex-col">
          <label for="searchPhone" class="block mb-2 font-medium">手機號碼</label>
            <input
            type="searchPhone"
            id="searchPhone"
            class="block form-input p-3"
            placeholder="0912345678"
          />
        </div>
        <button @click="handleModalOpen('create')" class="btn btn-dark whitespace-nowrap">新增會員</button>
      </div>
      <!-- table -->
      <section class="relative overflow-x-auto bg-bgself-light rounded-xl p-5">
        <table class="w-full text-center">
          <thead class="text-xl font-medium text-secondary-light bg-textself">
            <tr class="border-b-2 border-black">
              <th class="py-3">會員姓名</th>
              <th class="py-3">聯絡電話</th>
              <th class="py-3">註冊日期</th>
              <th class="py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b-2 border-black">
              <td class="py-3">來亂的</td>
              <td class="py-3">0900456123</td>
              <td class="py-3">2023/05/01</td>
              <th class="flex justify-end items-center">
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
            <tr class="border-b-2 border-black">
              <td class="py-3">來亂的</td>
              <td class="py-3">0900456123</td>
              <td class="py-3">2023/05/01</td>
              <th class="flex justify-end items-center">
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
    </main>
  </section>
  <Modal ref="childComponentRef">
    <section class="relative w-full h-full max-w-md md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white border-2 border-textself rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-center justify-end border-b-2 border-textself p-3 rounded-t">
          <p v-if="isCreate === 'create'" class="text-xl font-medium">新增使用者資料</p>
          <p v-else-if="isCreate === 'update'" class="text-xl font-medium">修改使用者資料</p>
          <p v-else-if="isCreate === 'delete'" class="text-xl font-medium">刪除使用者資料</p>
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
        <div class="w-full rounded-lg">
          <form v-if="isCreate === 'create'" class="space-y-6 p-3" action="#">
            <div>
              <label for="name" class="block mb-2 text-xl font-medium text-gray-900">姓名</label>
              <input
                type="text"
                name="name"
                id="name"
                class="form-input"
                placeholder="name"
                required
              />
            </div>
            <div>
              <label for="phone" class="block mb-2 text-xl font-medium text-gray-900">電話</label>
              <input
                type="text"
                name="phone"
                id="phone"
                class="form-input"
                placeholder="0900456123"
                required
              />
            </div>
            <!-- send_btn -->
            <section class="flex">
              <button
                @click="handleModalClose()"
                type="button"
                class="w-full mr-3 btn btn-outline-dark"
              >
                取消
              </button>
              <button type="submit" class="w-full btn btn-dark">確認新增</button>
            </section>
          </form>
          <form v-else-if="isCreate === 'update'" class="space-y-6 p-3" action="#">
            <div>
              <label for="name" class="block mb-2 text-xl font-medium text-gray-900">姓名</label>
              <input
                type="text"
                name="name"
                id="name"
                class="form-input"
                placeholder="name"
                required
              />
            </div>
            <div>
              <label for="phone" class="block mb-2 text-xl font-medium text-gray-900">電話</label>
              <input
                type="text"
                name="phone"
                id="phone"
                class="form-input"
                placeholder="0900456123"
                required
              />
            </div>
            <!-- send_btn -->
            <section class="flex">
              <button
                @click="handleModalClose()"
                type="button"
                class="w-full mr-3 btn btn-outline-dark"
              >
                取消
              </button>
              <button type="submit" class="w-full btn btn-dark">確認修改</button>
            </section>
          </form>
          <form v-else-if="isCreate === 'delete'" class="space-y-6 p-3">
            <div>
              <p class="block mb-2 text-xl font-medium text-gray-900">姓名</p>
              <p>XXX</p>
            </div>
            <div>
              <p class="block mb-2 text-xl font-medium text-gray-900">電話</p>
              <p>0908 000 123</p>
            </div>
            <p class="text-xl font-semibold text-gray-900">是否要刪除使用者資料?</p>
            <!-- send_btn -->
            <section class="flex mt-12">
              <button
                @click="handleModalClose()"
                type="button"
                class="w-full mr-3 btn btn-outline-dark"
              >
                取消
              </button>
              <button type="submit" class="w-full btn btn-dark">確認刪除</button>
            </section>
          </form>
        </div>
      </div>
    </section>
  </Modal>
</template>
<style scoped></style>
