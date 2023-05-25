<script setup>
import SiderBar from '@/components/frontEnd/SideBar.vue'
import Modal from '@/components/TheModal.vue'
import { ref, reactive, nextTick, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSeatStore } from '@/stores/frontEnd/seatView'
import { useForm } from 'vee-validate'
import { errorsFormSchema } from '@/utils/formValidate'
import { dayWeek } from '@/plugins/day'
const router = useRouter()
const seatStore = useSeatStore()

const statusList = ref(['', '未使用', '使用中', '已預約'])
const dateList = ref(dayWeek())
const timeList = ref(['上午', '下午'])
const searchForm = reactive({
  status: statusList.value[0],
  reservationDate: dateList.value[0],
  reservationTime: timeList.value[0],
  tableNo: 0
})

/**
 * 查詢座位功能
 **/
onMounted(() => {
  seatStore.searchSeats(searchForm)
})

watch(
  [() => searchForm.status, () => searchForm.reservationDate, () => searchForm.reservationTime],
  () => {
    seatStore.searchSeats(searchForm)
  },
  {
    immediate: true,
    deep: true
  }
)

/**
 * 入座功能
 **/
const haveASeat = (tableNo) => {
  searchForm.tableNo = tableNo
  seatStore.haveASeat(searchForm)
}

/**
 * VeeValidate 套件
 */
const { errors, useFieldModel } = useForm({
  validationSchema: errorsFormSchema
})

const initSeatForm = reactive({
  tableNo: 1,
  tableName: '',
  seats: 1,
  status: statusList.value[3],
  reservationId: '',
  reservationDate: dateList.value[0],
  reservationTime: timeList.value[0],
  name: '',
  phone: ''
})

const seatForm = reactive({
  tableNo: 1,
  tableName: '',
  seats: 1,
  status: statusList.value[3],
  reservationId: '',
  reservationDate: dateList.value[0],
  reservationTime: timeList.value[0],
  name: useFieldModel('name'),
  phone: useFieldModel('phone')
})

/**
 * 新增訂位功能
 **/
const postReservation = () => {
  seatStore.postReservation(seatForm, searchForm)
  handleModalClose()
}

/**
 * 修改訂位功能
 **/
const patchReservation = () => {
  seatStore.patchReservation(seatForm, searchForm)
  handleModalClose()
}

/**
 * 取消訂位功能
 **/
const delReservation = () => {
  seatStore.delReservation(seatForm, searchForm)
  handleModalClose()
}

/**
 * 跳轉至點餐頁面
 */
const toProduct = (tableName) => {
  router.push({
    path: '/product',
    query: {
      table: `${tableName}`
    }
  })
}

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
    if (isCreate.value === 'create') {
      const { tableNo, tableName, seats } = item
      seatForm.tableNo = tableNo
      seatForm.tableName = tableName
      seatForm.seats = seats
    }
    if (isCreate.value === 'update' || isCreate.value === 'delete') {
      const { tableNo, tableName, seats, status, reservation } = item
      seatForm.tableNo = tableNo
      seatForm.tableName = tableName
      seatForm.seats = seats
      seatForm.status = status
      seatForm.reservationDate = reservation.reservationDate
      seatForm.reservationId = reservation.reservationId
      seatForm.reservationTime = reservation.reservationTime
      seatForm.name = reservation.name
      seatForm.phone = reservation.phone
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
      Object.assign(seatForm, initSeatForm)
    }
  })
}
</script>
<template>
  <aside class="fixed top-0 left-0 z-40 w-[315px] h-screen">
    <SiderBar />
  </aside>
  <section class="ml-[315px] bg-white">
    <!-- title -->
    <nav class="border-b-2 border-textself p-6">
      <h1 class="flex items-center text-[36px] font-bold">座位資訊</h1>
    </nav>
    <main class="min-h-screen p-6">
      <!-- select -->
      <ul class="grid grid-cols-12 gap-4 items-center mb-6">
        <li class="col-span-3">
          <label for="seat_status" class="block mb-2 font-medium">狀態</label>
          <select id="seat_status" class="form-select py-3" v-model="searchForm.status">
            <option v-for="(option, key) in statusList" :value="option" :key="key">
              {{ option === '' ? '全部' : option }}
            </option>
          </select>
        </li>
        <li class="col-span-3">
          <label for="seat_reservationDate" class="block mb-2 font-medium">日期</label>
          <select
            id="seat_reservationDate"
            class="form-select py-3"
            v-model="searchForm.reservationDate"
          >
            <option v-for="(option, key) in dateList" :value="option" :key="key">
              {{ option }}
            </option>
          </select>
        </li>
        <li class="col-span-3">
          <label for="seat_reservationTime" class="block mb-2 font-medium">訂位時段</label>
          <select
            id="seat_reservationTime"
            class="form-select py-3"
            v-model="searchForm.reservationTime"
          >
            <option v-for="(option, key) in timeList" :value="option" :key="key">
              {{ option }}
            </option>
          </select>
        </li>
      </ul>
      <!-- table -->
      <ul class="grid grid-cols-12 gap-4">
        <li
          class="col-span-12 lg:col-span-6 xl:col-span-4 py-4 bg-white border-2 border-textself rounded-lg shadow"
          v-for="seat in seatStore.seatList"
          :key="seat._id"
        >
          <div class="flex justify-between items-center border-b-2 border-textself px-4">
            <p class="font-medium mb-5">
              桌號
              <span class="text-white bg-primary-light rounded py-1 px-2">{{
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
              {{ seat?.reservation?.name ? seat.reservation.name : '&emsp;' }}
              <span class="ml-2">{{
                seat?.reservation?.phone ? seat.reservation.phone : '&emsp;'
              }}</span>
            </p>
            <div class="flex justify-between items-center mt-4">
              <p>
                <span
                  class="rounded py-1 px-2 mr-2"
                  :class="
                    seat.status === '未使用'
                      ? 'bg-neutralself-100 text-white'
                      : 'bg-secondary-light text-textself'
                  "
                >
                  {{ seat.status }}</span
                >
                <span
                  class="rounded py-1 px-2"
                  :class="seat.isWindowSeat ? 'bg-primary text-white' : 'hidden'"
                  >{{ seat.isWindowSeat ? '靠窗' : '' }}</span
                >
              </p>
              <div class="flex justify-between items-center">
                <button
                  @click="haveASeat(seat.tableNo)"
                  type="button"
                  class="btn btn-outline-dark mx-1"
                  :class="seat.status === '未使用' ? '' : 'hidden'"
                >
                  入座
                </button>
                <button
                  @click="handleModalOpen('create', seat)"
                  type="button"
                  class="btn btn-outline-dark mx-1"
                  :class="seat.status === '未使用' ? '' : 'hidden'"
                >
                  預約
                </button>
                <button
                  @click="handleModalOpen('update', seat)"
                  type="button"
                  class="btn btn-outline-dark mx-1"
                  :class="seat.status === '已預約' ? '' : 'hidden'"
                >
                  修改
                </button>
                <button
                  @click="toProduct(seat.tableName)"
                  type="button"
                  class="btn btn-outline-dark mx-1"
                  :class="seat.status === '使用中' ? '' : 'hidden'"
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
          <p v-if="isCreate === 'create'" class="text-xl font-medium">新增訂位</p>
          <p v-else-if="isCreate === 'update'" class="text-xl font-medium">修改訂位 / 座位</p>
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
        <div class="w-full rounded-lg p-3" v-if="isCreate === 'create'">
          <div class="flex justify-between items-center bg-bgself-light rounded-xl p-3 mb-3">
            <p class="font-medium">
              桌號
              <span class="text-white bg-primary-light rounded py-1 px-2">{{
                seatForm.tableName
              }}</span>
            </p>
            <p class="font-medium">
              人數
              <span class="text-white bg-textself rounded py-1 px-2">{{ seatForm.seats }}</span>
            </p>
          </div>
          <form class="space-y-3" action="#">
            <div>
              <label for="form_reservationDate" class="block mb-2 font-medium">日期</label>
              <select
                id="form_reservationDate"
                class="form-select py-3"
                v-model="seatForm.reservationDate"
              >
                <option v-for="(option, key) in dateList" :value="option" :key="key">
                  {{ option }}
                </option>
              </select>
            </div>
            <div>
              <label for="form_reservationTime" class="block mb-2 font-medium">訂位時段</label>
              <select
                id="form_reservationTime"
                class="form-select py-3"
                v-model="seatForm.reservationTime"
              >
                <option v-for="(option, key) in timeList" :value="option" :key="key">
                  {{ option }}
                </option>
              </select>
            </div>
            <div>
              <label for="form_name" class="block mb-2 font-medium">姓名</label>
              <input
                type="text"
                name="name"
                id="form_name"
                class="form-input"
                placeholder="name"
                v-model.trim="seatForm.name"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.name }}</p>
            </div>
            <div>
              <label for="form_tel" class="block mb-2 font-medium">電話</label>
              <input
                type="tel"
                name="phone"
                id="form_tel"
                class="form-input"
                placeholder="0912345678"
                v-model="seatForm.phone"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.phone }}</p>
            </div>
            <!-- send_btn -->
            <button type="submit" class="w-full btn btn-dark" @click.prevent="postReservation">
              確定新增
            </button>
          </form>
        </div>
        <div class="w-full rounded-lg p-3" v-else-if="isCreate === 'update'">
          <div class="flex justify-between items-center bg-bgself-light rounded-xl p-3 mb-3">
            <p class="font-medium">
              桌號
              <span class="text-white bg-primary-light rounded py-1 px-2">{{
                seatForm.tableName
              }}</span>
            </p>
            <p class="font-medium">
              人數
              <span class="text-white bg-textself rounded py-1 px-2">{{ seatForm.seats }}</span>
            </p>
          </div>
          <form class="space-y-3" action="#">
            <div>
              <label for="form_reservationDate" class="block mb-2 font-medium">日期</label>
              <select
                id="form_reservationDate"
                class="form-select py-3"
                v-model="seatForm.reservationDate"
              >
                <option v-for="(option, key) in dateList" :value="option" :key="key">
                  {{ option }}
                </option>
              </select>
            </div>
            <div>
              <label for="form_reservationTime" class="block mb-2 font-medium">訂位時段</label>
              <select
                id="form_reservationTime"
                class="form-select py-3"
                v-model="seatForm.reservationTime"
              >
                <option v-for="(option, key) in timeList" :value="option" :key="key">
                  {{ option }}
                </option>
              </select>
            </div>
            <div>
              <label for="form_name" class="block mb-2 font-medium">姓名</label>
              <input
                type="text"
                name="name"
                id="form_name"
                class="form-input"
                placeholder="name"
                v-model.trim="seatForm.name"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.name }}</p>
            </div>
            <div>
              <label for="form_tel" class="block mb-2 font-medium">電話</label>
              <input
                type="tel"
                name="phone"
                id="form_tel"
                class="form-input"
                placeholder="0912345678"
                v-model="seatForm.phone"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.phone }}</p>
            </div>
            <div>
              <label for="form_status" class="block mb-2 font-medium">狀態</label>
              <select id="form_status" class="form-select py-3" v-model="seatForm.status">
                <option v-for="(option, key) in statusList" :value="option" :key="key">
                  {{ option }}
                </option>
              </select>
            </div>
            <!-- send_btn -->
            <div class="flex">
              <button
                type="button"
                class="w-full mr-1 btn btn-outline-dark"
                @click.prevent="delReservation(seatForm.reservationId)"
              >
                取消預約
              </button>
              <button
                type="submit"
                class="w-full ml-1 btn btn-dark"
                @click.prevent="patchReservation"
              >
                確認修改
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </Modal>
</template>
