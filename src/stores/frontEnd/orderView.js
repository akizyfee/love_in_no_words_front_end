import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { catchError } from '@/utils/catchError'
import { warningAlert, successAlert } from '@/plugins/toast'
import { searchOrder, searchOrderDetail, addOrderRating, searchLinePayOrderStatus } from '@/apis/order'
import { useLoadingStore } from '@/stores/TheLoading'

export const useOrderStore = defineStore('orderData', () => {
  const loding = useLoadingStore()

  /**
   * 載入新資料
   */
  const tempOrderList = ref([])
  const prePage = ref(null)

  const LoadNewFile = catchError(async (searchForm, currentPage) => {
    loding.isLoading = true
    const { orderStatus, createdAt } = searchForm
    const { data } = await searchOrder(orderStatus, createdAt, currentPage)
    prePage.value = data.meta?.pagination.nextPage
    tempOrderList.value = data.ordersList
    tempOrderList.value.forEach((item) => {
      orderList.value.push(item)
    })
    loding.isLoading = false
  })

  /**
   * 查詢訂單功能
   **/
  const orderList = ref([])
  const currentIndex = ref(0)
  const getOrders = catchError(async (searchForm, currentPage) => {
    loding.isLoading = true
    const { orderStatus, createdAt } = searchForm
    const { data } = await searchOrder(orderStatus, createdAt, currentPage)
    prePage.value = data.meta?.pagination.nextPage
    currentIndex.value = orderStatus
    orderList.value = data.ordersList
    loding.isLoading = false
  })

  /**
   * 查詢訂單詳細內容
   **/
  const orderDetail = reactive({})
  const getOrderDetail = catchError(async (orderId, orderNo) => {
    loding.isLoading = true
    const { data } = await searchOrderDetail(orderId)
    if (data.orderList.length === 0) {
      warningAlert('沒有符合的訂單資料')
      loding.isLoading = false
    }
    orderDetail.value = { [orderNo]: data, ...orderDetail.value }
    loding.isLoading = false
  })

  /**
   * 滿意度及建議回饋
   **/
  const postOrderRating = catchError(async (orderId, ratingForm, searchForm) => {
    const { payment, orderType, satisfaction, description } = ratingForm
    const { status, message } = await addOrderRating(orderId, {
      payment, orderType, satisfaction, description
    })
    if (status === 'NG') {
      return status
    } else {
      successAlert(message)
      getOrders(searchForm)
    }
  })

  /**
   * 查詢訂單是否用 LinePay 完成結帳
   **/
  const getLinePayStatus = catchError(async (orderNo) => {
    loding.isLoading = true
    const { message } = await searchLinePayOrderStatus(orderNo)
    successAlert(message)
    loding.isLoading = false
  })

  return { prePage, currentIndex, orderList, orderDetail, LoadNewFile, getOrders, getOrderDetail, postOrderRating, getLinePayStatus }
})
