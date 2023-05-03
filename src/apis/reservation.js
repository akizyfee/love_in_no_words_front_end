import axios from '@/plugins/axios'

/**
 * 現場帶位
 * @param {object} payload 桌位資料
 */
export const noReservation = (payload) => axios.post('/v1/seat/no-reservation', payload)

/**
 * 查詢座位
 * @param {string} 已使用未使用狀態
 * @param {string} 訂位日期
 * @param {string} 訂位時段
 */
export const searchReservation = (status, reservationDate, reservationTime) => axios.get(`/v1/seat/reservation?status=${status}&reservationDate=${reservationDate}&reservationTime=${reservationTime}`)

/**
 * 新增訂位
 * @param {object} payload 桌位資料
 */
export const addReservation = (payload) => axios.post('/v1/seat/reservation', payload)

/**
 * 修改訂位
 * @param {string} 訂位ID
 * @param {object} payload 桌位資料
 */
export const editReservation = (reservationId, payload) => axios.patch(`/v1/seat/reservation/${reservationId}`, payload)

/**
 * 取消訂位
 * @param {string} 訂位ID
 */
export const deleteReservation = (reservationId) => axios.delete(`/v1/seat/reservation/${reservationId}`)
