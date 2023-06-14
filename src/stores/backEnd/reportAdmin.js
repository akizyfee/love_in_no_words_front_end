import { ref } from 'vue'
import { defineStore } from 'pinia'
import { catchError } from '@/utils/catchError'
import { successAlert } from '@/plugins/toast'
import { useLoadingStore } from '@/stores/TheLoading'
import { searchAdminOrders, searchAllAdminOrders } from '@/apis/report'

export const useReportAdminStore = defineStore('reportAdminData', () => {
  const loding = useLoadingStore()
  /**
 * 初始化報表表格資訊
 */
  const orderReportList = ref([])
  const orderReportListPrice = ref([])
  const fetchSearchAllAdminOrders = catchError(async () => {
    loding.isLoading = true
    const { data } = await searchAllAdminOrders()
    orderReportList.value = data.data
    orderReportListPrice.value = orderReportList.value.reduce((sum, item) => sum + item.totalPrice, 0)
    loding.isLoading = false
  })
  /**
 * 條件搜尋定單資訊
 */
  const fetchSearchAdminOrders = catchError(async (searchMouth, searchNumber) => {
    const { data, message } = await searchAdminOrders(searchMouth, searchNumber)
    orderReportList.value = data.data
    orderReportListPrice.value = orderReportList.value.reduce((sum, item) => sum + item.totalPrice, 0)
    successAlert(message)
  })

  return { orderReportList, orderReportListPrice, fetchSearchAllAdminOrders, fetchSearchAdminOrders }
})
