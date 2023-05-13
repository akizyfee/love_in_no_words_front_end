import axios from '@/plugins/axios'

/**
 * O-5-1 取得營收資料
 * @param {number} 報表年份
 */
export const getAdminRevenue = (params) => axios.get(`/v1/send/email/admin/revenue/report/?${params}`)

/**
 * O-5-2 取得賣出數量資料
 */
export const getAdminSellQty = () => axios.get('/v1/send/email/admin/sell-quantity/report')

/**
 * O-5-3 取得訂單數量資料
 */
export const getAdminOrdersQty = () => axios.get('/v1/send/email/admin/orders-quantity/report')

/**
 * O-5-4 寄送報表
 * @param {number} 報表種類
 */
export const sendAdminReport = (reportType, payload) => axios.post(`/v1/send/email/admin/report/${reportType}`, payload)

/**
 * O-5-5 查詢訂單資訊
 * @param {number} 月份
 * @param {number} 單頁筆數
 */
export const searchAdminOrders = (month, number) => axios.get(`/v1/reports/admin/orders?month=${month}&number=${number}`)

/**
 * O-5-5 下載訂單：Excel
 * @param {number} 訂單資料
 */
export const downloadAdminOrders = (payload) => axios.post('/v1/reports/admin/orders/download', payload)
