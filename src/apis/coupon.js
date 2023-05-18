import axios from '@/plugins/axios'

/**
 * O-4-1 店員取得優惠活動列表
 * @param {string} 活動種類
 */
export const getCoupon = (activity) => axios.get(`/v1/coupons?activity=${activity}`)

/**
 * O-4-2 店長取得優惠活動列表
 * @param {string} 活動種類
 */
export const getAdminCoupon = (activity) => axios.get(`/v1/coupons/admin?activity=${activity}`)

/**
 * O-4-3 新增優惠活動
 * @param {object} payload 優惠活動資料
 */
export const addAdminCoupon = (payload) => axios.post('/v1/coupons/admin', payload)

/**
 * O-4-4 修改優惠活動
 * @param {string} 優惠碼順序
 * @param {object} payload 優惠活動資料
 */
export const editAdminCoupon = (couponNo, payload) => axios.patch(`/v1/coupons/admin/${couponNo}`, payload)

/**
 * O-4-5 刪除優惠活動
 * @param {string} 優惠碼順序
 */
export const deleteAdminCoupon = (couponNo) => axios.delete(`/v1/coupons/admin/${couponNo}`)
