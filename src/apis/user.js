import axios from '@/plugins/axios'

/**
 * 會員登入
 * @param {object} payload 登入資料
 */
export const signInApi = (payload) => axios.post('/sign_in', payload)

/**
 *獲取使用者列表
 * @param {string} 頁碼
 */
export const getUserProfile = (currentPage) => axios.get(`/v1/users?page=${currentPage}`)

/**
 * 新增使用者
 * @param {object} payload 使用者資料
 */
export const addUser = (payload) => axios.post('/v1/users', payload)

/**
 * 修改使用者
 * @param {string} 使用者 ID
 * @param {object} payload 使用者資料
 */
export const editUser = (userId, payload) => axios.post(`/v1/users/${userId}`, payload)

/**
 * 刪除使用者
 * @param {string} 使用者 ID
 * @param {number} 職位代碼
 */
export const deleteUser = (userId, titleNo) => axios.post(`/v1/users/${userId}/${titleNo}`)

/**
 * 加入會員
 * @param {object} payload 會員資料
 */
export const addMember = (payload) => axios.post('/v1/member', payload)

/**
 * 查詢會員
 * @param {string} 會員電話
 * @param {number} 頁碼
 */
export const searchMember = (phone, page) => axios.get(`/v1/member?phone=${phone}&page=${page}`)

/**
 * 修改會員
 * @param {number} 會員 ID
 * @param {object} payload 會員資料
 */
export const editMember = (memberUId, payload) => axios.patch(`/v1/member/${memberUId}`, payload)

/**
 * 刪除會員
 * @param {string} 會員 ID
 */
export const deleteMember = (memberUId) => axios.delete(`/v1/member/${memberUId}`)
