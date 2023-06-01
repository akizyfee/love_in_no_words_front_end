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

/**
 * O-6-1 店長取得 A+B 活動列表
 */
export const getAdminFreebiePlus = () => axios.get('/v1/abcoupons/admin')

/**
 * O-6-2 新增 A+B 活動
 * @param {object} payload A+B 活動資料
 */
export const addAdminFreebiePlus = (payload) => axios.post('/v1/abcoupons/admin', payload)

/**
 * O-6-3 刪除 A+B 活動
 * @param {string} 活動順序
 */
export const deleteAdminFreebiePlus = (couponNo) => axios.delete(`/v1/abcoupons/admin/${couponNo}`)

/**
 * O-7-1 店長取得 1+1 活動列表
 */
export const getAdminFreeOne = () => axios.get('/v1/oneplusones/admin')

/**
 * O-7-2 新增 1+1 活動
 * @param {object} payload 1+1 活動資料
 */
export const addAdminFreeOne = (payload) => axios.post('/v1/oneplusones/admin', payload)

/**
 * O-7-3 刪除 1+1 活動
 * @param {string} 活動順序
 */
export const deleteAdminFreeOne = (couponNo) => axios.delete(`/v1/oneplusones/admin/${couponNo}`)
