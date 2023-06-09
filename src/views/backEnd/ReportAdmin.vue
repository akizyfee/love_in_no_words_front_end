<script setup>
import SiderBar from '@/components/backEnd/SideBar.vue'
import { onMounted, ref, watch } from 'vue'
import { getAdminRevenue, getAdminOrdersQty, getAdminSellQty, sendAdminReport } from '@/apis/report'
import { catchError } from '@/utils/catchError'
import { nowYear } from '@/plugins/day'
import useDountChart from '@/utils/useDountChar'
import useBarChart from '@/utils/useEcharBar'
import { useWindowSize } from '@vueuse/core'
import { successAlert } from '@/plugins/toast'
import axios from 'axios'
import { getCookieToken } from '@/utils/cookie'
import { useLoadingStore } from '@/stores/TheLoading'
import { useReportAdminStore } from '@/stores/backEnd/reportAdmin'

const loding = useLoadingStore()
const reportStore = useReportAdminStore()

/**
 * 取得每月營收和訂單量
 */
const { width } = useWindowSize()
const revenueYear = ref(nowYear)
const BarcharDom = ref()

const fetchGetAdminRevenueAndOrders = catchError(async () => {
  loding.isLoading = true
  const dataCash = await getAdminRevenue(revenueYear)
  const dataOrder = await getAdminOrdersQty(revenueYear)
  const setOption = useBarChart(BarcharDom.value)
  setOption.updateChart(dataCash.data, dataOrder.data)
  setOption.resize()
  loding.isLoading = false
})

onMounted(() => {
  fetchGetAdminRevenueAndOrders()
})

watch(
  () => width,
  () => {
    fetchGetAdminRevenueAndOrders()
  },
  {
    immediate: true,
    deep: true
  }
)

/**
 * 取得每月賣出數量資料
 */
const sellQtyYear = ref(nowYear)
const c3SellQtyReport = []
const fetchGetAdminSellQty = catchError(async () => {
  loding.isLoading = true
  const { data } = await getAdminSellQty(sellQtyYear)
  const filterReport = data.map((item) => {
    const productName = item.productName
    const amount = item.amount
    return [`${productName}`, amount]
  })
  c3SellQtyReport.push(...filterReport)
  useDountChart(c3SellQtyReport)
  loding.isLoading = false
})

onMounted(() => {
  fetchGetAdminSellQty()
})

/**
 * 初始化報表表格資訊
 */
onMounted(() => {
  reportStore.fetchSearchAllAdminOrders()
})

/**
 * 條件搜尋定單資訊
 */
const searchMouth = ref()
const searchNumber = ref()
const fetchSearchAdminOrders = async () => {
  loding.isLoading = true
  await reportStore.fetchSearchAdminOrders(searchMouth.value, searchNumber.value)
  loding.isLoading = false
}

/**
 * 營收報表+賣出訂單報表寄送
 */
const fetchSendAdminRreport = catchError(async (reportType1, reportType2 = null) => {
  loding.isLoading = true
  if (reportType1) {
    const { message } = await sendAdminReport(reportType1)
    successAlert(message)
    loding.isLoading = false
  }
  if (reportType1 && reportType2) {
    const message1 = await sendAdminReport(reportType1)
    const message2 = await sendAdminReport(reportType2)
    if (message1 === '報表寄送成功' && message2 === '報表寄送成功') {
      successAlert('報表寄送成功')
      loding.isLoading = false
    }
    loding.isLoading = false
  }
})

/**
 * O-5-6 下載訂單：Excel
 */
const downloadFile = async () => {
  loding.isLoading = true
  const token = getCookieToken()
  const url = `https://love-in-no-words-api.onrender.com/v1/reports/admin/orders/download?month=${searchMouth.value}&dataAmount=${searchNumber.value}`
  const response = await axios.get(url, {
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const downloadLink = document.createElement('a')
  const blob = new Blob([response.data], { type: response.headers['content-type'] })
  const fileName = `${revenueYear.value}年${searchMouth.value}月營收報表`
  downloadLink.href = URL.createObjectURL(blob)
  downloadLink.download = fileName
  downloadLink.click()
  loding.isLoading = false
}
</script>
<template>
  <aside class="fixed top-0 left-0 z-40 w-[315px] h-screen">
    <SiderBar />
  </aside>
  <div class="ml-[315px] bg-white">
    <nav class="border-b-2 border-textself p-6">
      <h1 class="flex items-center text-[36px] font-bold">報表查詢</h1>
    </nav>
    <main class="min-h-screen p-6">
      <!-- imgReport -->
      <ul class="grid grid-cols-12 gap-5">
        <li
          class="col-span-12 p-6 bg-white border border-black rounded-lg shadow flex flex-col justify-between mx-3"
        >
          <p class="flex items-center text-[36px] font-bold">本年度每月營收和訂單量</p>
          <div ref="BarcharDom" class="w-full h-[500px] mt-10"></div>
          <button @click.prevent="fetchSendAdminRreport(1, 3)" class="btn btn-dark py-2">
            寄信
          </button>
        </li>
        <li
          class="col-span-12 p-6 bg-white border border-black rounded-lg shadow flex flex-col justify-between mx-3"
        >
          <p class="flex items-center text-[36px] font-bold">本年度各產品銷量占比</p>
          <div id="dountChar" class="w-full h-[500px] mt-10"></div>
          <button @click.prevent="fetchSendAdminRreport(2)" class="btn btn-dark py-2">寄信</button>
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
              <option v-for="number in 12" :key="number" :value="number" selected>
                {{ number }}月
              </option>
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
          <button
            @click.prevent="downloadFile"
            type="button"
            class="btn btn-outline-dark whitespace-nowrap"
          >
            下載
          </button>
        </div>
      </div>
      <!-- table -->
      <section class="overflow-auto bg-bgself-light rounded-xl p-6 mb-6">
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
              v-for="reportList in reportStore.orderReportList"
              :key="reportList.orderNo"
              class="border-b-2 border-black"
            >
              <td class="py-3">{{ reportList.orderNo }}</td>
              <td class="py-3">{{ reportList.createdAt }}</td>
              <td class="py-3">{{ reportList.totalPrice }}</td>
            </tr>
            <tr class="border-b-2 border-black">
              <td class="py-3">總營業額</td>
              <td></td>
              <td class="py-3">{{ reportStore.orderReportListPrice }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>
