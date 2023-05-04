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
 * @param {string} 活動種類
 * @param {object} payload 優惠活動資料
 */
export const addAdminCoupon = (activity, payload) => axios.post(`/v1/coupons/admin?activity=${activity}`, payload)

/**
 * O-4-4 修改優惠活動
 * @param {string} 優惠碼順序
 * @param {object} payload 優惠活動資料
 */
export const editAdminCoupon = (couponNo, payload) => axios.patch(`/v1/coupons/admin/${couponNo}`, payload)

/**
 * O-4-5 刪除優惠活動
 * @param {string} 活動種類
 * @param {string} 優惠碼編號 (優惠碼活動)
 * @param {number} 商品編號 (買一送一活動)
 * @param {number} 優惠碼順序 (A加B活動)
 */
export const deleteAdminCoupon = (activity, couponId, productNo, couponNo) => axios.delete(`/v1/coupons/admin?activity=${activity}&couponId=${couponId}&productNo=${productNo}&couponNo=${couponNo}`)
