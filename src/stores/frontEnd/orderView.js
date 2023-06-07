import { ref } from 'vue'
import { defineStore } from 'pinia'
import { catchError } from '@/utils/catchError'
import { warningAlert, successAlert } from '@/plugins/toast'
import { searchOrder, searchOrderDetail, addOrderRating } from '@/apis/order'

export const useOrderStore = defineStore('orderData', () => {
  /**
   * 載入新資料
   */
  const tempOrderList = ref([])
  const prePage = ref(null)

  const LoadNewFile = catchError(async (searchForm, currentPage) => {
    const { orderStatus, date } = searchForm
    const { data } = await searchOrder(orderStatus, date, currentPage)
    prePage.value = data.meta?.pagination.nextPage
    tempOrderList.value = data.ordersList
    tempOrderList.value.forEach((item) => {
      orderList.value.push(item)
    })
  })

  /**
   * 查詢訂單功能
   **/
  const orderList = ref([])
  const currentIndex = ref(0)
  const getOrders = catchError(async (searchForm, currentPage) => {
    const { orderStatus, date } = searchForm
    const { data } = await searchOrder(orderStatus, date, currentPage)
    prePage.value = data.meta?.pagination.nextPage
    currentIndex.value = orderStatus
    orderList.value = data.ordersList
  })

  /**
   * 查詢訂單詳細內容
   **/
  const orderDetail = ref([])
  const getOrderDetail = catchError(async (orderId) => {
    const { data } = await searchOrderDetail(orderId)
    if (data.orderList.length === 0) {
      warningAlert('沒有符合的訂單資料')
    }
    orderDetail.value = data
  })

  /**
   * 滿意度及建議回饋
   **/
  const postOrderRating = catchError(async (orderId, ratingForm, searchForm) => {
    const { payment, orderType, satisfaction, description } = ratingForm
    const { message } = await addOrderRating(orderId, {
      payment, orderType, satisfaction, description
    })
    successAlert(message)
    getOrders(searchForm)
  })

  return { prePage, currentIndex, orderList, orderDetail, LoadNewFile, getOrders, getOrderDetail, postOrderRating }
})
