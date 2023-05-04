import axios from '@/plugins/axios'

/**
 * P-1 登入
 * @param {object} payload 登入資料
 */
export const loginApi = (payload) => axios.post('/v1/users/login', payload)

/**
 * P-2 登出
 * @param {string} 使用者 ID
 */
export const logoutApi = (userId) => axios.post('/v1/logout', userId)

/**
 * S-4-2 查詢會員
 * @param {string} 會員電話
 * @param {number} 頁碼
 */
export const searchMember = (phone, page) => axios.get(`/v1/members?phone=${phone}&page=${page}`)

/**
 * S-4-1 新增會員
 * @param {object} payload 會員資料
 */
export const addMember = (payload) => axios.post('/v1/members', payload)

/**
 * S-4-4 修改會員
 * @param {number} 會員 ID
 * @param {object} payload 會員資料
 */
export const editMember = (memberUId, payload) => axios.patch(`/v1/members/${memberUId}`, payload)

/**
 * S-4-3 刪除會員
 * @param {string} 會員 ID
 */
export const deleteMember = (memberUId) => axios.delete(`/v1/members/${memberUId}`)

/**
 * O-1-1 取得使用者列表
 * @param {string} 頁數
 */
export const getAdminUser = (page) => axios.get(`/v1/users/admin?page=${page}`)

/**
 * O-1-2 新增使用者
 * @param {object} payload 使用者資料
 */
export const addAdminUser = (payload) => axios.post('/v1/users/admin', payload)

/**
 * O-1-3 修改使用者
 * @param {string} 使用者 ID
 * @param {object} payload 使用者資料
 */
export const editAdminUser = (userId, payload) => axios.post(`/v1/users/admin/${userId}`, payload)

/**
 * O-1-4 刪除使用者
 * @param {string} 使用者 ID
 * @param {number} 職位代碼
 */
export const deleteAdminUser = (userId, titleNo) => axios.post(`/v1/users/admin/${userId}/${titleNo}`)
