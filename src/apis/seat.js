import axios from '@/plugins/axios'

/**
 * S-1-1 現場帶位
 * @param {object} payload 桌位資料
 */
export const noReservation = (payload) => axios.post('/v1/seats/no-reservation', payload)

/**
 * S-1-2 查詢座位
 * @param {string} 已使用未使用狀態
 * @param {string} 訂位日期
 * @param {string} 訂位時段
 */
export const searchReservation = (status, reservationDate, reservationTime) => axios.get(`/v1/seats/reservation?status=${status}&reservationDate=${reservationDate}&reservationTime=${reservationTime}`)

/**
 * S-1-3 新增訂位
 * @param {object} payload 桌位資料
 */
export const addReservation = (payload) => axios.post('/v1/seats/reservation', payload)

/**
 * S-1-4 修改訂位
 * @param {string} 訂位 ID
 * @param {object} payload 桌位資料
 */
export const editReservation = (reservationId, payload) => axios.patch(`/v1/seats/reservation/${reservationId}`, payload)

/**
 * S-1-5 取消訂位
 * @param {string} 訂位 ID
 */
export const deleteReservation = (reservationId) => axios.delete(`/v1/seats/reservation/${reservationId}`)

/**
 * O-2-1 取得座位列表
 * @param {string} 頁數
 */
export const getAdminSeat = () => axios.get('/v1/seats/admin')

/**
 * O-2-4 新增座位/桌號
 * @param {object} payload 座位資訊
 */
export const addAdminSeat = (payload) => axios.post('/v1/seats/admin', payload)

/**
 * O-2-2 修改座位
 * @param {object} payload 座位資訊
 */
export const editAdminSeat = (tableNo, payload) => axios.patch(`/v1/seats/admin/${tableNo}`, payload)

/**
 * O-2-5 刪除座位/桌號
 * @param {Number} 桌號
 */
export const deleteAdminSeat = (tableNo, payload) => axios.delete(`/v1/seats/admin/${tableNo}`, payload)
