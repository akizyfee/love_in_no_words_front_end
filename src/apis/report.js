import axios from '@/plugins/axios'

/**
 * O-5-1 取得營收資料
 * @param {number} 報表年份
 */
export const getAdminRevenue = (params) => axios.get(`/v1/send/email/admin/revenue/report/?${params}`)

/**
 * O-5-2 取得賣出數量資料
 * @param {number} 報表年份
 */
export const getAdminSellQty = (params) => axios.get(`/v1/send/email/admin/sell-quantity/report?${params}`)

/**
 * O-5-3 取得訂單數量資料
 */
export const getAdminOrdersQty = () => axios.get('/v1/send/email/admin/orders-quantity/report')

/**
 * O-5-4 寄送報表
 * @param {number} 報表種類 1營收 2賣出數量 3訂單數量
 */
export const sendAdminReport = (params) => axios.get(`/v1/send/email/admin/report/${params}`)

/**
 * O-5-5 查詢訂單資訊
 * @param {number} 月份
 * @param {number} 單頁筆數
 */
export const searchAllAdminOrders = () => axios.get('/v1/reports/admin/orders')
export const searchAdminOrders = (month, number) => axios.get(`/v1/reports/admin/orders?month=${month}&number=${number}`)
