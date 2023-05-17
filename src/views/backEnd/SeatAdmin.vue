<script setup>
import SiderBar from '@/components/backEnd/SideBar.vue'
import Modal from '@/components/TheModal.vue'
import { ref, nextTick, onMounted, reactive } from 'vue'
import { getAdminSeat, addAdminSeat, editAdminSeat, deleteAdminSeat } from '@/apis/seat'
import { catchError } from '@/utils/catchError'
import { warningAlert, successAlert } from '@/plugins/toast'
import { dayFormat } from '@/plugins/day'
import { useForm } from 'vee-validate'
import { errorsFormSchema } from '@/utils/formValidate'

/**
 * 取得座位列表
 **/
const seatList = ref([])

const getSeats = catchError(async () => {
  const { data } = await getAdminSeat()
  if (data.length === 0) {
    warningAlert('尚未建立座位的資料')
  }
  seatList.value = data
})

onMounted(() => {
  getSeats()
})

/**
 * VeeValidate 套件
 */
const { errors, useFieldModel } = useForm({
  validationSchema: errorsFormSchema
})
const seatForm = reactive({
  _id: '',
  tableNo: 1,
  tableName: useFieldModel('tableName'),
  seats: 1,
  isWindowSeat: false,
  isDisabled: false,
  createdAt: ''
})

/**
 * 新增座位功能
 **/
const postSeat = catchError(async () => {
  const { message } = await addAdminSeat(seatForm)
  handleModalClose()
  successAlert(message === '成功' ? '新增成功' : message)
  getSeats()
})

/**
 * 修改座位功能
 **/
const patchSeat = catchError(async (tableNo) => {
  const { message } = await editAdminSeat(tableNo, seatForm)
  handleModalClose()
  successAlert(message)
  getSeats()
})

/**
 * 刪除座位功能
 **/
const delSeat = catchError(async (tableNo) => {
  const { message } = await deleteAdminSeat(tableNo)
  handleModalClose()
  successAlert(message)
  getSeats()
})

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
    if (isCreate.value === 'update') {
      const { tableNo, tableName, seats, isWindowSeat, isDisabled } = item
      seatForm.tableNo = tableNo
      seatForm.tableName = tableName
      seatForm.seats = seats
      seatForm.isWindowSeat = isWindowSeat
      seatForm.isDisabled = isDisabled
    }
  })
}

const handleModalClose = () => {
  const childComponent = childComponentRef.value

  nextTick(() => {
    if (childComponent) {
      childComponent.closeModal()
      /**
       * 清空欄位功能
       **/
      seatForm.tableName = ''
    }
  })
}
</script>
<template>
  <aside class="fixed top-0 left-0 z-40 w-[315px] h-screen">
    <SiderBar />
  </aside>
  <div class="ml-[315px] bg-white">
    <nav class="border-b-2 border-textself p-6">
      <h1 class="flex items-center text-[36px] font-bold">座位管理</h1>
    </nav>
    <main class="min-h-screen p-6">
      <div class="flex justify-end mb-6">
        <button @click="handleModalOpen('create')" class="btn btn-dark whitespace-nowrap">
          編輯桌號
        </button>
      </div>
      <!-- table -->
      <ul class="grid grid-cols-12 gap-4">
        <li
          class="col-span-12 lg:col-span-6 xl:col-span-4 py-4 bg-white border-2 border-textself rounded-xl shadow"
          v-for="seat in seatList"
          :key="seat._id"
        >
          <div class="flex justify-between items-center border-b-2 border-textself px-4">
            <p class="font-medium mb-5">
              桌號
              <span class="text-white bg-primary-light rounded py-1 px-2 t">{{
                seat.tableName
              }}</span>
            </p>
            <p class="font-medium mb-5">
              人數
              <span class="text-white bg-textself rounded py-1 px-2">{{ seat.seats }}</span>
            </p>
          </div>
          <div class="pl-4 pr-3 mt-4">
            <p class="font-medium">
              是否靠窗：
              <span class="ml-2">{{ seat.isWindowSeat ? '是' : '否' }}</span>
            </p>
            <p class="font-medium">
              啟用日期：
              <span class="ml-2">{{ dayFormat(seat.createdAt) }}</span>
            </p>
            <div class="flex justify-between items-center mt-4">
              <p
                class="rounded py-1 px-2"
                :class="
                  seat.isDisabled
                    ? 'bg-neutralself-100 text-white'
                    : 'bg-secondary-light text-textself'
                "
              >
                {{ seat.isDisabled ? '已停用' : '已啟用' }}
              </p>
              <div class="flex justify-between items-center">
                <button
                  @click="handleModalOpen('update', seat)"
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
          <form v-if="isCreate === 'create'" class="space-y-3" action="#">
            <div>
              <label for="form_seatNumber" class="block mb-2 font-medium"
                >桌號 (點擊黃色按鈕，即刻刪除該桌號資料)
              </label>
              <input
                type="number"
                name="tableName"
                id="form_seatNumber"
                class="form-input"
                placeholder="請輸入桌號"
                v-model.number="seatForm.tableName"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.tableName }}</p>
              <div class="flex flex-wrap mt-3">
                <button
                  type="submit"
                  class="btn btn-secondary font-medium my-2 mr-2 px-3 py-1 rounded"
                  v-for="seat in seatList"
                  :key="seat._id"
                  @click.prevent="delSeat(seat.tableNo)"
                >
                  {{ seat.tableName }}
                </button>
              </div>
            </div>
            <!-- send_btn -->
            <button type="submit" class="w-full btn btn-dark" @click.prevent="postSeat">
              確定新增
            </button>
          </form>
          <form v-else-if="isCreate === 'update'" class="space-y-3" action="#">
            <section class="flex justify-between items-center bg-bgself-light rounded-xl p-3 mb-3">
              <p class="font-medium">
                桌號
                <span class="text-white bg-primary-light rounded py-1 px-2">{{
                  seatForm.tableName
                }}</span>
              </p>
              <div class="flex items-center">
                <label for="form_seatPeopleLimit" class="block font-medium whitespace-nowrap mr-1"
                  >人數</label
                >
                <select
                  id="form_seatPeopleLimit"
                  class="form-select py-1 rounded"
                  v-model="seatForm.seats"
                >
                  <option v-for="index in 20" :key="index" :value="index">{{ index }}</option>
                </select>
              </div>
            </section>
            <div>
              <label for="form_seatWindow" class="block mb-2 font-medium">是否靠窗</label>
              <select id="form_seatWindow" class="form-select" v-model="seatForm.isWindowSeat">
                <option :value="false" selected>否</option>
                <option :value="true">是</option>
              </select>
            </div>
            <div>
              <label for="form_seatStatus" class="block mb-2 font-medium">狀態</label>
              <select id="form_seatStatus" class="form-select" v-model="seatForm.isDisabled">
                <option :value="false" selected>停用</option>
                <option :value="true">啟用</option>
              </select>
            </div>
            <!-- send_btn -->
            <button
              type="submit"
              class="w-full btn btn-dark"
              @click.prevent="patchSeat(seatForm.tableNo)"
            >
              確認修改
            </button>
          </form>
        </div>
      </div>
    </section>
  </Modal>
</template>
