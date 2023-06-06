<script setup>
// import Modal from '@/components/TheModal.vue'
import IconMinus from '@/assets/img/IconMinus.png'
import IconAdd from '@/assets/img/IconAdd.png'
import { ref, onMounted, watch, reactive } from 'vue'
import { dayFormat, dayInterval } from '@/plugins/day'

import { useOrderStore } from '@/stores/frontEnd/orderView'
const orderStore = useOrderStore()

const statusList = ref(['', '未結帳', '已結帳'])
const dateList = ref(dayInterval())
const searchForm = reactive({
  orderStatus: statusList.value[0],
  date: ''
})
const checkboxArray = ref([])

/**
 * 查詢訂單功能
 **/

onMounted(() => {
  orderStore.getOrders(searchForm)
})

watch(
  [() => searchForm.orderStatus, () => searchForm.date],
  () => {
    orderStore.getOrders(searchForm)
  },
  {
    immediate: true,
    deep: true
  }
)
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
        <label for="seat_reservationDate" class="block mb-2 font-medium">日期</label>
        <select id="seat_reservationDate" class="form-select" v-model="searchForm.date">
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
            <th class="p-4 col-span-4">訂單編號</th>
            <th class="p-4 col-span-2">座位編號</th>
            <th class="p-4 col-span-2"></th>
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
                  :src="checkboxArray[index] === true ? IconMinus : IconAdd"
                  width="32"
                  height="32"
                  alt="IconMinus"
              /></label>
            </td>
            <td class="p-4 col-span-3 align-middle">{{ dayFormat(order.createdAt) }}</td>
            <td class="p-4 col-span-4 align-middle">{{ order.orderNo }}</td>
            <td class="p-4 col-span-2 align-middle">
              <span class="text-white bg-primary-light rounded py-1 px-2">{{
                order.tableName
              }}</span>
            </td>
            <td class="col-span-2 align-middle">
              <button type="button" class="btn btn-outline-dark py-2 px-3 mt-1">結帳</button>
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
                  <tr class="border-b-2 border-textself">
                    <td class="p-4">1</td>
                    <td class="p-4">鬆餅</td>
                    <td class="p-4">150</td>
                    <td class="p-4">1</td>
                    <td class="p-4">無</td>
                  </tr>
                  <tr class="border-b-2 border-textself">
                    <td class="p-4">2</td>
                    <td class="p-4">甜甜圈</td>
                    <td class="p-4">300</td>
                    <td class="p-4">2</td>
                    <td class="p-4">不要太甜</td>
                  </tr>
                  <tr class="border-b-2 border-textself">
                    <td class="p-4">3</td>
                    <td class="p-4">瑪得蓮</td>
                    <td class="p-4">250</td>
                    <td class="p-4">5</td>
                    <td class="p-4">1</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr class="bg-white text-left grid grid-cols-12">
            <td class="p-4 col-span-1"></td>
            <td class="p-4 col-span-11">
              <span class="text-neutralself-200">製作時間</span>
              <span class="ml-4 text-xl font-medium">20 分</span>
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
              <span class="ml-4 text-primary font-medium">$9</span>
            </td>
          </tr>
          <tr class="bg-white text-left grid grid-cols-12">
            <td class="p-4 pb-4 col-span-1"></td>
            <td class="p-4 pb-4 col-span-11">
              <span class="text-neutralself-200">付款金額</span>
              <span class="ml-4 text-primary text-xl font-medium">$999</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>
<style scoped>
table {
  border-spacing: 0;
}

.tabbar-active {
  @apply bg-bgself-light;
}
</style>
