<script setup>
import SiderBar from '@/components/backEnd/SideBar.vue'
import { onMounted, ref } from 'vue'
import {
  getAdminRevenue,
  getAdminOrdersQty,
  getAdminSellQty,
  searchAdminOrders,
  searchAllAdminOrders
} from '@/apis/report'
import { catchError } from '@/utils/catchError'
import c3 from 'c3'

/**
 * C3繪製
 */
const drawChart = () => {
  c3.generate({
    bindto: '#chart1',
    data: {
      columns: c3RevenueReport,
      type: 'donut'
    },
    donut: {
      title: '本月營收',
      label: {
        format: function (value, ratio, id) {
          return value
        }
      }
    }
  })
  c3.generate({
    bindto: '#chart2',
    data: {
      columns: c3OerderQtyReport,
      type: 'donut'
    },
    donut: {
      title: '本月訂單量',
      label: {
        format: function (value, ratio, id) {
          return value
        }
      }
    }
  })
  c3.generate({
    bindto: '#chart3',
    data: {
      columns: c3SellQtyReport,
      type: 'donut'
    },
    donut: {
      title: '本月各產品銷量',
      label: {
        format: function (value, ratio, id) {
          return value
        }
      }
    }
  })
}

/**
 * 取得營收資料
 */
const revenueYear = ref(2023)
const c3RevenueReport = []
const fetchGetAdminRevenue = catchError(async () => {
  const { data } = await getAdminRevenue(revenueYear)
  const filterReport = data.map((item) => {
    const month = item.month
    const total = item.monthTotal
    return [`mouth:${month}`, total]
  })
  c3RevenueReport.push(...filterReport)
  drawChart()
})

onMounted(() => {
  fetchGetAdminRevenue()
})

/**
 * 取得訂單數量資料
 */
const c3OerderQtyReport = []
const fetchGetAdminOrdersQty = catchError(async () => {
  const { data } = await getAdminOrdersQty()
  const filterReport = data.map((item) => {
    const month = item.month
    const orderNumber = item.orderNumber
    return [`mouth:${month}`, orderNumber]
  })
  c3OerderQtyReport.push(...filterReport)
  drawChart()
})

onMounted(() => {
  fetchGetAdminOrdersQty()
})

/**
 * 取得賣出數量資料
 */
const sellQtyYear = ref(2023)
const c3SellQtyReport = []
const fetchGetAdminSellQty = catchError(async () => {
  const { data } = await getAdminSellQty(sellQtyYear)
  const filterReport = data.map((item) => {
    const productName = item.productName
    const amount = item.amount
    return [`${productName}`, amount]
  })
  c3SellQtyReport.push(...filterReport)
  drawChart()
})

onMounted(() => {
  fetchGetAdminSellQty()
})

/**
 * 初始化報表表格資訊
 */
const orderReportList = ref([])
const orderReportListPrice = ref([])
const fetchSearchAllAdminOrders = catchError(async () => {
  const { data } = await searchAllAdminOrders()
  orderReportList.value = data.data
  orderReportListPrice.value = orderReportList.value.reduce((sum, item) => sum + item.totalPrice, 0)
})

onMounted(() => {
  fetchSearchAllAdminOrders()
})

/**
 * 條件搜尋定單資訊
 */
const searchMouth = ref(5)
const searchNumber = ref(100)
const fetchSearchAdminOrders = catchError(async () => {
  const { data } = await searchAdminOrders(searchMouth.value, searchNumber.value)
  orderReportList.value = data.data
  orderReportListPrice.value = orderReportList.value.reduce((sum, item) => sum + item.totalPrice, 0)
})
</script>
<template>
  <aside class="fixed top-0 left-0 z-40 w-[315px] h-screen">
    <SiderBar />
  </aside>
  <div class="ml-[315px]">
    <nav class="bg-white border-b-2 border-textself p-6">
      <h1 class="flex items-center text-[36px] font-bold">報表查詢</h1>
    </nav>
    <main class="bg-secondary-light min-h-screen p-6">
      <!-- imgReport -->
      <ul class="grid grid-cols-12 gap-5">
        <li
          class="col-span-6 max-w-lg p-6 bg-white border border-black rounded-lg shadow flex flex-col justify-between mx-3"
        >
          <div id="chart1"></div>
          <button href="#" class="btn btn-dark py-2">寄信</button>
        </li>
        <li
          class="col-span-6 max-w-lg p-6 bg-white border border-black rounded-lg shadow flex flex-col justify-between mx-3"
        >
          <div id="chart2"></div>
          <button href="#" class="btn btn-dark py-2">寄信</button>
        </li>
        <li
          class="col-span-6 max-w-lg p-6 bg-white border border-black rounded-lg shadow flex flex-col justify-between mx-3"
        >
          <div id="chart3"></div>
          <button href="#" class="btn btn-dark py-2">寄信</button>
        </li>
      </ul>
      <!-- select -->
      <div class="flex mt-5 mb-3">
        <div class="flex items-end gap-4 mb-3">
          <!-- saerchNumber -->
          <section class="flex-col items-center">
            <label for="form_limit" class="block mb-2 font-medium">筆數</label>
            <select id="form_limit" class="form-select py-3" v-model="searchNumber">
              <option value="50" selected>50</option>
              <option value="100">100</option>
              <option value="150">150</option>
            </select>
          </section>
          <!-- searchMouth -->
          <section class="flex-col items-center">
            <label for="countries_disabled" class="block mb-2 font-medium">月份</label>
            <select id="countries_disabled" class="form-select py-3" v-model="searchMouth">
              <option value="1" selected>1月</option>
              <option value="2">2月</option>
              <option value="3">3月</option>
              <option value="4">4月</option>
              <option value="5">5月</option>
            </select>
          </section>
          <!-- searchBtn -->
          <button
            @click.prevent="fetchSearchAdminOrders"
            type="button"
            class="btn btn-outline-dark whitespace-nowrap"
          >
            搜尋
          </button>
        </div>
      </div>
      <!-- table -->
      <section class="relative overflow-x-auto bg-bgself-light rounded-xl p-6 mb-6">
        <table class="w-full text-center">
          <thead class="text-xl font-medium text-secondary-light bg-textself">
            <tr class="border-b-2 border-black">
              <th class="py-3">訂單編號</th>
              <th class="py-3">成立時間</th>
              <th class="py-3">金額</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="reportList in orderReportList"
              :key="reportList.orderNo"
              class="border-b-2 border-black"
            >
              <td class="py-3">{{ reportList.orderNo }}</td>
              <td class="py-3">{{ reportList.createdAt }}</td>
              <td class="py-3">{{ reportList.totalPrice }}</td>
            </tr>
            <tr class="border-b-2 border-black">
              <td class="py-3">淨利</td>
              <td></td>
              <td class="py-3">{{ orderReportListPrice }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>
<style scoped></style>
