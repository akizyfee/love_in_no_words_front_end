import { ref } from 'vue'
import { defineStore } from 'pinia'
import { catchError } from '@/utils/catchError'
import { warningAlert, successAlert } from '@/plugins/toast'
import {
  noReservation,
  searchReservation,
  addReservation,
  editReservation,
  deleteReservation
} from '@/apis/seat'

export const useSeatStore = defineStore('seatData', () => {
  /**
   * 入座功能
   **/
  const haveASeat = catchError(async (searchForm) => {
    const { reservationDate, reservationTime, tableNo } = searchForm
    const { message } = await noReservation({
      reservationDate,
      reservationTime,
      tableNo
    })
    message === '成功' && successAlert('修改入座成功')
    searchSeats(searchForm)
  })

  /**
   * 查詢座位功能
   **/
  const seatList = ref([])
  const searchSeats = catchError(async (searchForm) => {
    const { status, reservationDate, reservationTime } = searchForm
    const { data } = await searchReservation(
      status,
      reservationDate,
      reservationTime
    )
    if (data.tables.length === 0) {
      warningAlert('沒有符合的座位資料')
    }
    seatList.value = data.tables.sort(function (a, b) {
      return a.tableName - b.tableName
    })
  })

  /**
   * 新增訂位功能
  **/
  const postReservation = catchError(async (seatForm, searchForm) => {
    const { tableNo, reservationDate, reservationTime, name, phone } = seatForm
    const { message } = await addReservation({
      tableNo,
      reservationDate,
      reservationTime,
      name,
      phone
    })
    message === '成功' && successAlert('新增成功')
    searchSeats(searchForm)
  })

  /**
   * 修改訂位功能
   **/
  const patchReservation = catchError(async (seatForm, searchForm) => {
    const { status, reservationId, reservationDate, reservationTime, name, phone } = seatForm
    const { message } = await editReservation(reservationId, {
      status,
      reservationDate,
      reservationTime,
      name,
      phone
    })
    message === '成功' && successAlert('修改成功')
    searchSeats(searchForm)
  })

  /**
   * 取消訂位功能
   **/
  const delReservation = catchError(async (seatForm, searchForm) => {
    const { reservationId } = seatForm
    const { message } = await deleteReservation(reservationId)
    successAlert(message)
    searchSeats(searchForm)
  })

  return { seatList, haveASeat, searchSeats, postReservation, patchReservation, delReservation }
})
