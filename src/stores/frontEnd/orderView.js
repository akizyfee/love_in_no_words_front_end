import { ref } from 'vue'
import { defineStore } from 'pinia'
import { catchError } from '@/utils/catchError'
import { warningAlert } from '@/plugins/toast'
import { searchOrder } from '@/apis/order'

// import { warningAlert, successAlert } from '@/plugins/toast'
// import { searchOrder, searchOrderDetail, addOrderRating } from '@/apis/order'

export const useOrderStore = defineStore('orderData', () => {
  /**
   * 查詢訂單功能
   **/
  const orderList = ref([])
  const currentIndex = ref(0)
  const getOrders = catchError(async (searchForm) => {
    const { orderStatus, date } = searchForm
    const { data } = await searchOrder(orderStatus, date)
    if (data.ordersList.length === 0) {
      warningAlert('沒有符合的訂單資料')
    }
    currentIndex.value = orderStatus
    orderList.value = data.ordersList
    return data.ordersList
  })

  return { currentIndex, orderList, getOrders }
})
