import axios from '@/plugins/axios'

/**
 * S-2-2 金額試算
 * @param {object} payload 購物車資料
 */
export const calculateTotalPrice = (payload) => axios.post('/v1/orders/calculate/total-price', payload)

/**
 * S-2-3 新增訂單
 * @param {object} payload 購物車資料
 */
export const addOrder = (payload) => axios.post('/v1/orders', payload)

/**
 * S-3-1 查詢訂單
 * @param {string} 已結帳未結帳狀態
 * @param {date}   訂單日期
 */
export const searchOrder = (orderStatus, date, page) => axios.get(`/v1/orders?orderStatus=${orderStatus}&date=${date}&page=${page}`)

/**
 * S-3-2 查詢訂單詳細內容
 * @param {string} 訂單 ID
 */
export const searchOrderDetail = (orderId) => axios.get(`/v1/orders/detail/${orderId}`)

/**
 * S-3-3 滿意度及建議回饋
 * @param {string} 訂單 ID
 * @param {object} payload 訂單資料
 */
export const addOrderRating = (orderId, payload) => axios.post(`/v1/orders/rating/${orderId}`, payload)

/**
 * C-1-1 查詢出餐訂單內容
 * @param {string} 已出餐未出餐狀態
 */
export const searchPickUp = (status) => axios.get(`/v1/orders/pick-up?status=${status}`)

/**
 * C-1-2 修改出餐訂單
 * @param {string} 訂單 ID
 */
export const editPickUp = (orderId) => axios.patch(`/v1/orders/pick-up/${orderId}`)
