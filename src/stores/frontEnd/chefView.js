import { defineStore } from 'pinia'
import { ref } from 'vue'
import { catchError } from '@/utils/catchError'
import { searchPickUp, editPickUp } from '@/apis/order'
import { successAlert } from '@/plugins/toast'

export const useChefStore = defineStore('chefData', () => {
  const selectStatus = ref(['未出餐', '已出餐'])
  const currentStatus = ref('未出餐')
  const pickUpList = ref([])

  /**
 * 出餐時間計算
 */
  const useProductionTimeCaculater = (data) => {
    return data.map((temp) => {
      const totalTime = temp.orderList
        .map((item) => {
          return item.qty * item.productionTime
        })
        .reduce((acc, cur) => acc + cur, 0)
      return { ...temp, totalTime }
    })
  }
  /**
 * 查詢訂單
 */
  const fetchSearchPickUp = catchError(async () => {
    const { data } = await searchPickUp(currentStatus.value)
    const newDessertList = useProductionTimeCaculater(data)
    pickUpList.value = newDessertList
  })

  /**
 * 出餐
 */
  const overStatus = ref({
    status: '已出餐'
  })
  const fetchSendPickUp = catchError(async (oderId) => {
    const { data } = await editPickUp(oderId, overStatus.value)
    successAlert(data.status)
    fetchSearchPickUp()
  })

  return { selectStatus, currentStatus, pickUpList, fetchSearchPickUp, fetchSendPickUp }
})
