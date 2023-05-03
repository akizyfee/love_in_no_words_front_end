<script setup>
import SiderBar from '@/components/frontEnd/SideBar.vue'
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
  <section class="ml-[315px]">
    <!-- title -->
    <nav class="bg-white border-b-2 border-textself p-6">
      <h1 class="flex items-center text-[36px] font-bold">座位資訊</h1>
    </nav>
    <main class="bg-secondary-light min-h-screen p-6">
      <!-- select -->
      <ul class="grid grid-cols-12 gap-4 items-center mb-6">
        <li class="col-span-3">
          <label for="seat_status" class="block mb-2 font-medium">狀態</label>
          <select id="seat_status" class="form-select py-3">
            <option value="未使用" selected>未使用</option>
            <option value="使用中">使用中</option>
            <option value="已預約">已預約</option>
          </select>
        </li>
        <li class="col-span-3">
          <label for="seat_reservationDate" class="block mb-2 font-medium">日期</label>
          <select id="seat_reservationDate" class="form-select py-3">
            <option value="2023/04/26" selected>2023/04/26</option>
            <option value="2023/04/27">2023/04/27</option>
            <option value="2023/04/28">2023/04/28</option>
          </select>
        </li>
        <li class="col-span-3">
          <label for="seat_reservationTime" class="block mb-2 font-medium">訂位時段</label>
          <select id="seat_reservationTime" class="form-select py-3">
            <option value="上午" selected>上午</option>
            <option value="下午">下午</option>
          </select>
        </li>
      </ul>
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
              王先生
              <span class="ml-2">0912-345678</span>
            </p>
            <div class="flex justify-between items-center mt-4">
              <p class="bg-secondary-light rounded py-1 px-2">已預約</p>
              <div class="flex justify-between items-center">
                <button
                  @click="handleModalOpen(false)"
                  type="button"
                  class="btn btn-outline-dark mx-1 hidden"
                >
                  帶位
                </button>
                <button
                  @click="handleModalOpen(false)"
                  type="button"
                  class="btn btn-outline-dark mx-1 hidden"
                >
                  預約
                </button>
                <button
                  @click="handleModalOpen(false)"
                  type="button"
                  class="btn btn-outline-dark mx-1"
                >
                  修改
                </button>
                <button
                  @click="handleModalOpen(false)"
                  type="button"
                  class="btn btn-outline-dark mx-1 hidden"
                >
                  點餐
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
              <span class="text-white bg-primary-light rounded py-1 px-2">2</span>
            </p>
            <p class="font-medium mb-5">
              人數
              <span class="text-white bg-textself rounded py-1 px-2">4</span>
            </p>
          </div>
          <div class="pl-4 pr-3 mt-4">
            <p class="font-medium">
              {{ &emsp; }}
              <span class="ml-2">{{ &emsp; }}</span>
            </p>
            <div class="flex justify-between items-center mt-4">
              <p class="bg-secondary-light rounded py-1 px-2">使用中</p>
              <div class="flex justify-between items-center">
                <button
                  @click="handleModalOpen(false)"
                  type="button"
                  class="btn btn-outline-dark mx-1 hidden"
                >
                  帶位
                </button>
                <button
                  @click="handleModalOpen(false)"
                  type="button"
                  class="btn btn-outline-dark mx-1 hidden"
                >
                  預約
                </button>
                <button
                  @click="handleModalOpen(false)"
                  type="button"
                  class="btn btn-outline-dark mx-1 hidden"
                >
                  修改
                </button>
                <button
                  @click="handleModalOpen(false)"
                  type="button"
                  class="btn btn-outline-dark mx-1"
                >
                  點餐
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
              <span class="text-white bg-primary-light rounded py-1 px-2">3</span>
            </p>
            <p class="font-medium mb-5">
              人數
              <span class="text-white bg-textself rounded py-1 px-2">2</span>
            </p>
          </div>
          <div class="pl-4 pr-3 mt-4">
            <p class="font-medium">
              {{ &emsp; }}
              <span class="ml-2">{{ &emsp; }}</span>
            </p>
            <div class="flex justify-between items-center mt-4">
              <p class="bg-secondary-light rounded py-1 px-2">未使用</p>
              <div class="flex justify-between items-center">
                <button
                  @click="handleModalOpen(false)"
                  type="button"
                  class="btn btn-outline-dark mx-1"
                >
                  帶位
                </button>
                <button
                  @click="handleModalOpen(false)"
                  type="button"
                  class="btn btn-outline-dark mx-1"
                >
                  預約
                </button>
                <button
                  @click="handleModalOpen(false)"
                  type="button"
                  class="btn btn-outline-dark mx-1 hidden"
                >
                  修改
                </button>
                <button
                  @click="handleModalOpen(false)"
                  type="button"
                  class="btn btn-outline-dark mx-1 hidden"
                >
                  點餐
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </main>
  </section>
  <Modal ref="childComponentRef">
    <section class="relative w-full h-full max-w-md md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white border-2 border-textself rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-center justify-end border-b-2 border-textself p-3 rounded-t">
          <h2 v-if="isCreate" class="text-xl font-medium">新增訂位</h2>
          <h2 v-if="!isCreate" class="text-xl font-medium">修改訂位 / 座位</h2>
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
          <div class="flex justify-between items-center bg-bgself-light p-3 mb-3">
            <p class="font-medium">
              桌號
              <span class="text-white bg-primary-light rounded py-1 px-2">1</span>
            </p>
            <p class="font-medium">
              人數
              <span class="text-white bg-textself rounded py-1 px-2">2</span>
            </p>
          </div>
          <form v-if="isCreate" class="space-y-6" action="#">
            <div>
              <label for="form_reservationDate" class="block mb-2 font-medium">日期</label>
              <select id="form_reservationDate" class="form-select">
                <option value="2023/04/26" selected>2023/04/26</option>
                <option value="2023/04/27">2023/04/27</option>
                <option value="2023/04/28">2023/04/28</option>
              </select>
            </div>
            <div>
              <label for="form_reservationTime" class="block mb-2 font-medium">訂位時段</label>
              <select id="form_reservationTime" class="form-select">
                <option value="上午" selected>上午</option>
                <option value="下午">下午</option>
              </select>
            </div>
            <div>
              <label for="form_name" class="block mb-2 font-medium">姓名</label>
              <input
                type="text"
                id="form_name"
                class="form-input"
                placeholder="0912345678"
                required
              />
              <p class="text-sm text-primary-light mt-2">Twitter username is required</p>
            </div>
            <div>
              <label for="form_tel" class="block mb-2 font-medium">手機號碼</label>
              <input
                type="tel"
                id="form_tel"
                class="form-input"
                placeholder="0912345678"
                required
              />
              <p class="text-sm text-primary-light mt-2">Twitter username is required</p>
            </div>
            <div>
              <label for="seat_status" class="block mb-2 font-medium">狀態</label>
              <select id="form_status" class="form-select">
                <option value="未使用" selected>未使用</option>
                <option value="使用中">使用中</option>
                <option value="已預約">已預約</option>
              </select>
            </div>
            <!-- send_btn -->
            <div class="flex">
              <button type="submit" class="w-full btn btn-dark">新增訂位</button>
            </div>
          </form>
          <form v-if="!isCreate" class="space-y-6" action="#">
            <div>
              <label for="form_reservationDate" class="block mb-2 font-medium">日期</label>
              <select id="form_reservationDate" class="form-select">
                <option value="2023/04/26" selected>2023/04/26</option>
                <option value="2023/04/27">2023/04/27</option>
                <option value="2023/04/28">2023/04/28</option>
              </select>
            </div>
            <div>
              <label for="form_reservationTime" class="block mb-2 font-medium">訂位時段</label>
              <select id="form_reservationTime" class="form-select">
                <option value="上午" selected>上午</option>
                <option value="下午">下午</option>
              </select>
            </div>
            <div>
              <label for="form_name" class="block mb-2 font-medium">姓名</label>
              <input
                type="text"
                id="form_name"
                class="form-input"
                placeholder="0912345678"
                required
              />
              <p class="text-sm text-primary-light mt-2">Twitter username is required</p>
            </div>
            <div>
              <label for="form_tel" class="block mb-2 font-medium">手機號碼</label>
              <input
                type="tel"
                id="form_tel"
                class="form-input"
                placeholder="0912345678"
                required
              />
              <p class="text-sm text-primary-light mt-2">Twitter username is required</p>
            </div>
            <div>
              <label for="seat_status" class="block mb-2 font-medium">狀態</label>
              <select id="form_status" class="form-select">
                <option value="未使用" selected>未使用</option>
                <option value="使用中">使用中</option>
                <option value="已預約">已預約</option>
              </select>
            </div>
            <!-- send_btn -->
            <div class="flex">
              <button type="button" class="w-full mr-1 btn btn-outline-dark">取消預約</button>
              <button type="submit" class="w-full ml-1 btn btn-dark">確認修改</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </Modal>
</template>
<style scoped></style>
