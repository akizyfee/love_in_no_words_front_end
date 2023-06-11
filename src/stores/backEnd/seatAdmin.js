import { ref } from 'vue'
import { defineStore } from 'pinia'
import { catchError } from '@/utils/catchError'
import { warningAlert, successAlert } from '@/plugins/toast'
import { getAdminSeat, addAdminSeat, editAdminSeat, deleteAdminSeat } from '@/apis/seat'
import { useLoadingStore } from '@/stores/TheLoading'

export const useSeatAdminStore = defineStore('seatAdminData', () => {
  const loding = useLoadingStore()

  /**
   * 取得座位列表
   **/
  const seatList = ref([])
  const getSeats = catchError(async () => {
    loding.isLoading = true
    const { data } = await getAdminSeat()
    if (data.length === 0) {
      warningAlert('尚未建立座位的資料')
      loding.isLoading = false
    }
    seatList.value = data
    loding.isLoading = false
  })

  /**
   * 新增座位功能
   **/
  const postSeat = catchError(async (seatForm) => {
    const { message } = await addAdminSeat(seatForm)
    message === '成功' && successAlert('新增成功')
    getSeats()
  })

  /**
   * 修改座位功能
   **/
  const patchSeat = catchError(async (tableNo, seatForm) => {
    const { message } = await editAdminSeat(tableNo, seatForm)
    successAlert(message)
    getSeats()
  })

  /**
   * 刪除座位功能
   **/
  const delSeat = catchError(async (tableNo) => {
    const { message } = await deleteAdminSeat(tableNo)
    successAlert(message)
    getSeats()
  })

  return { seatList, getSeats, postSeat, patchSeat, delSeat }
})
