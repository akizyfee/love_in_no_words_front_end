<script setup>
import Modal from '@/components/TheModal.vue'
import IconMinus from '@/assets/img/IconMinus.png'
import IconAdd from '@/assets/img/IconAdd.png'
import { ref, nextTick, onMounted, watch, reactive, getCurrentInstance } from 'vue'
import { dayFormat, dayInterval } from '@/plugins/day'
import { getCookieToken } from '@/utils/cookie'
import { useForm } from 'vee-validate'
import { errorsFormSchema } from '@/utils/formValidate'
import { warningAlert } from '@/plugins/toast'

import { useOrderStore } from '@/stores/frontEnd/orderView'
const orderStore = useOrderStore()

const statusList = ref(['', '未結帳', '已結帳'])
const dateList = ref(dayInterval())
const searchForm = reactive({
  orderStatus: statusList.value[0],
  createdAt: ''
})
const checkboxArray = ref([])

/**
 * 由於 Router 跳轉，所以強制更新頁面
 **/
const internalInstance = getCurrentInstance()
const forceUpdate = internalInstance.ctx.$forceUpdate

onMounted(() => {
  forceUpdate()
})

/**
 * 分頁
 */
const lastPageIndex = ref(1)

const fetchLoadNewFile = () => {
  lastPageIndex.value++
  orderStore.LoadNewFile(searchForm, lastPageIndex.value)
}

/**
 * 查詢訂單功能
 **/
onMounted(() => {
  orderStore.getOrders(searchForm, 1)
  lastPageIndex.value = 1
})

watch(
  [() => searchForm.orderStatus, () => searchForm.createdAt],
  () => {
    orderStore.getOrders(searchForm, 1)
    lastPageIndex.value = 1
  },
  {
    immediate: true,
    deep: true
  }
)

/**
 * 查詢訂單詳細內容
 **/
const getOrderDetail = (orderId, orderNo) => {
  orderStore.getOrderDetail(orderId, orderNo)
}

/**
 * 取得 Token、LinePay 結帳、VeeValidate 套件、滿意度及建議回饋
 **/
const token = ref(`${getCookieToken()}`)
const linepayUrl = ref('')
const linepayForm = ref()

const { errors, useFieldModel } = useForm({
  validationSchema: errorsFormSchema
})

const initRatingForm = reactive({
  orderId: '',
  orderNo: '',
  tableName: '1',
  payment: '',
  orderType: '已結帳',
  satisfaction: 10,
  description: ''
})

const ratingForm = reactive({
  orderId: '',
  orderNo: '',
  tableName: '1',
  payment: useFieldModel('payment'),
  orderType: '已結帳',
  satisfaction: 10,
  description: ''
})

const postOrderRating = () => {
  if (!ratingForm.payment) {
    warningAlert('請選擇付款類型')
    return
  }
  searchForm.orderStatus = statusList.value[1]
  searchForm.createdAt = ''
  if (ratingForm.payment === '現金') {
    orderStore.postOrderRating(ratingForm.orderId, ratingForm, searchForm)
  } else if (ratingForm.payment === 'LinePay') {
    ratingForm.orderType = '未結帳'
    orderStore.postOrderRating(ratingForm.orderId, ratingForm, searchForm)
    nextTick(() => {
      if (linepayUrl.value) {
        linepayForm.value.submit()
      }
    })
  }
  handleModalClose()
}

/**
 * 查詢訂單是否用 LinePay 完成結帳
 **/
const getLinePayStatus = (orderId) => {
  orderStore.getLinePayStatus(orderId)
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
      const { _id, orderNo, tableName } = item
      ratingForm.orderId = _id
      ratingForm.orderNo = orderNo
      ratingForm.tableName = tableName
      linepayUrl.value = `${
        import.meta.env.VITE_API_URL
      }/v1/line_pay/${orderNo}?redirectDevUrl=true`
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
      Object.assign(ratingForm, initRatingForm)
      linepayUrl.value = ''
    }
  })
}
</script>
<template>
  <main class="min-h-screen p-6">
    <!-- menu -->
    <div class="flex justify-between items-center mb-6">
      <ul class="flex text-xl font-medium">
        <li class="mr-2" v-for="(status, key) in statusList" :key="key">
          <a
            @click.prevent="searchForm.orderStatus = status"
            href="#"
            class="block px-6 py-3 rounded-lg hover:text-primary-light hover:bg-white"
            :class="{ 'tabbar-active': orderStore.currentIndex === status }"
            >{{ !status ? '全部' : status }}</a
          >
        </li>
      </ul>
      <div>
        <label for="form_createdAt" class="block mb-2 font-medium">日期</label>
        <select id="form_createdAt" class="form-select" v-model="searchForm.createdAt">
          <option v-for="(option, key) in dateList" :value="option" :key="key">
            {{ option }}
          </option>
        </select>
      </div>
    </div>
    <!-- orderList -->
    <div class="overflow-auto">
      <table class="w-full border-2 text-center border-black rounded-lg border-separate">
        <thead class="text-xl font-medium text-secondary-light bg-textself">
          <tr class="grid grid-cols-12">
            <th class="p-4 col-span-1"></th>
            <th class="p-4 col-span-3">日期</th>
            <th class="p-4 col-span-1">時段</th>
            <th class="p-4 col-span-3">訂單編號</th>
            <th class="p-4 col-span-1">桌號</th>
            <th class="p-4 col-span-3"></th>
          </tr>
        </thead>
      </table>
      <!-- 整個元件包裹起來 -->
      <table
        class="w-full border-2 text-center border-separate mt-4 rounded-lg border-black overflow-hidden"
        v-for="(order, index) in orderStore.orderList"
        :key="order._id"
      >
        <!-- 選單的選項 -->
        <tbody class="bg-white relative">
          <tr class="grid grid-cols-12 p-4">
            <td class="p-4 col-span-1 align-middle">
              <input
                type="checkbox"
                class="sr-only"
                v-model="checkboxArray[index]"
                :id="order.orderNo"
              />
              <label :for="order.orderNo">
                <img
                  @click="getOrderDetail(order._id, order.orderNo)"
                  :src="checkboxArray[index] === true ? IconMinus : IconAdd"
                  width="32"
                  height="32"
                  alt="IconMinus"
              /></label>
            </td>
            <td class="p-4 col-span-3 align-middle">{{ dayFormat(order.createdAt) }}</td>
            <td class="p-4 col-span-1 align-middle">{{ order.time }}</td>
            <td class="p-4 col-span-3 align-middle">{{ order.orderNo }}</td>
            <td class="p-4 col-span-1 align-middle">
              <span class="text-white bg-primary-light rounded py-1 px-2">{{
                order.tableName
              }}</span>
            </td>
            <td class="col-span-3 align-middle">
              <div class="flex">
                <button
                  type="button"
                  class="w-full mr-1 btn btn-outline-dark"
                  @click="handleModalOpen('create', order)"
                >
                  結帳
                </button>
                <button
                  type="button"
                  class="w-full ml-1 btn btn-dark"
                  @click="getLinePayStatus(order.orderNo)"
                >
                  查詢
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <!-- 選單內容區域 -->
        <tbody
          :class="[
            checkboxArray[index] === true ? '' : 'hidden',
            'bg-white relative',
            'overflow-hidden transition-all'
          ]"
        >
          <!-- 選單實際內容 -->
          <tr class="grid grid-cols-12 p-4">
            <td class="p-4 col-span-1"></td>
            <td class="p-4 col-span-11 bg-bgself-light rounded-lg">
              <table class="w-full">
                <thead>
                  <tr class="border-b-2 border-textself">
                    <th class="p-4">#</th>
                    <th class="p-4">餐點名稱</th>
                    <th class="p-4">價錢</th>
                    <th class="p-4">數量</th>
                    <th class="p-4">備註</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="border-b-2 border-textself"
                    v-for="(product, index) in orderStore.orderDetail.value?.[order.orderNo]
                      ?.orderList"
                    :key="product._id"
                  >
                    <td class="p-4">{{ index + 1 }}</td>
                    <td class="p-4">{{ product.productName }}</td>
                    <td class="p-4">{{ product.price }}</td>
                    <td class="p-4">{{ product.qty }}</td>
                    <td class="p-4">這是備註，記得補上</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr class="bg-white text-left grid grid-cols-12">
            <td class="p-4 col-span-1"></td>
            <td class="p-4 col-span-11">
              <span class="text-neutralself-200">製作時間</span>
              <span class="ml-4 text-xl font-medium"
                >{{ orderStore.orderDetail.value?.[order.orderNo]?.totalTime }} 分</span
              >
            </td>
          </tr>
          <tr class="bg-white text-left grid grid-cols-12">
            <td class="p-4 col-span-1"></td>
            <td class="p-4 col-span-11">
              <span class="text-neutralself-200">出餐狀態</span>
              <span
                class="ml-4 inline text-sm font-medium rounded-lg py-1 px-2"
                :class="
                  orderStore.orderDetail.value?.[order.orderNo]?.status === '未出餐'
                    ? 'bg-neutralself-100 text-white'
                    : 'bg-primary-light text-white'
                "
                >{{ orderStore.orderDetail.value?.[order.orderNo]?.status }}</span
              >
            </td>
          </tr>
          <tr class="bg-white text-left grid grid-cols-12">
            <td class="p-4 col-span-1"></td>
            <td class="p-4 col-span-11">
              <span class="text-neutralself-200">優惠活動</span>
              <span class="ml-4 inline text-sm font-medium bg-secondary-light rounded-lg py-1 px-2"
                >已符合 A + B</span
              >
              <span class="ml-5 inline text-sm font-medium bg-secondary-light rounded-lg py-1 px-2"
                >買一送一</span
              >
            </td>
          </tr>
          <tr class="bg-white text-left grid grid-cols-12">
            <td class="p-4 col-span-1"></td>
            <td class="p-4 col-span-11">
              <span class="text-neutralself-200">折扣金額</span>
              <span class="ml-4 text-primary font-medium"
                >$ {{ orderStore.orderDetail.value?.[order.orderNo]?.discount }}</span
              >
            </td>
          </tr>
          <tr class="bg-white text-left grid grid-cols-12">
            <td class="p-4 pb-4 col-span-1"></td>
            <td class="p-4 pb-4 col-span-11">
              <span class="text-neutralself-200">付款金額</span>
              <span class="ml-4 text-primary text-xl font-medium"
                >$ {{ orderStore.orderDetail.value?.[order.orderNo]?.totalPrice }}</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 載入分頁內容 -->
    <button
      type="button"
      class="w-full btn btn-secondary my-6"
      v-if="orderStore.prePage !== null"
      @click="fetchLoadNewFile"
    >
      <span class="text-xl lg:text-[28px] font-medium">點選以載入新資料</span>
    </button>
    <!-- LinePay 表單 -->
    <form :action="linepayUrl" method="POST" ref="linepayForm" class="sr-only">
      <input type="hidden" name="_token" :value="token" />
      <button type="submit">送出表單</button>
    </form>
  </main>
  <Modal ref="childComponentRef">
    <section class="relative w-full h-full max-w-md md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white border-2 border-textself rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-center justify-end border-b-2 border-textself p-3 rounded-t">
          <h2 v-if="isCreate === 'create'" class="text-xl font-medium">填寫付款資訊</h2>
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
              訂單編號
              <span class="py-1 px-2">{{ ratingForm.orderNo }}</span>
            </p>
            <p class="font-medium">
              桌號
              <span class="text-white bg-primary-light rounded py-1 px-2">{{
                ratingForm.tableName
              }}</span>
            </p>
          </div>
          <form class="space-y-3" action="#">
            <div>
              <label for="form_satisfaction" class="block mb-2 font-medium">滿意度</label>
              <select
                id="form_satisfaction"
                class="form-select py-3"
                v-model="ratingForm.satisfaction"
              >
                <option v-for="(option, key) in 10" :value="option" :key="key">
                  {{ option }}
                </option>
              </select>
            </div>
            <div>
              <label for="form_description" class="block font-medium">建議</label>
              <textarea
                id="form_description"
                rows="5"
                class="form-input my-2"
                placeholder="請輸入建議"
                v-model.trim="ratingForm.description"
              ></textarea>
            </div>
            <div>
              <h3 class="font-medium mb-1">付款方式</h3>
              <ul class="flex">
                <li class="mr-3">
                  <div class="flex items-center">
                    <input
                      id="payment_money"
                      type="radio"
                      value="現金"
                      v-model="ratingForm.payment"
                      name="form-radio"
                      class="form-radio"
                    />
                    <label for="payment_money" class="ml-2 text-xl font-medium"> 現金 </label>
                  </div>
                </li>
                <li>
                  <div class="flex items-center">
                    <input
                      id="payment_LinePay"
                      type="radio"
                      value="LinePay"
                      v-model="ratingForm.payment"
                      name="form-radio"
                      class="form-radio"
                    />
                    <label for="payment_LinePay" class="ml-2 text-xl font-medium"> LinePay </label>
                  </div>
                </li>
              </ul>
              <p class="text-sm text-primary-light mt-2">{{ errors.payment }}</p>
            </div>
            <!-- send_btn -->
            <button type="submit" class="w-full btn btn-dark" @click.prevent="postOrderRating">
              結帳
            </button>
          </form>
        </div>
      </div>
    </section>
  </Modal>
</template>
<style scoped>
table {
  border-spacing: 0;
}

.tabbar-active {
  @apply bg-bgself-light;
}
</style>
