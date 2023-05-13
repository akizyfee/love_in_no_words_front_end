import axios from '@/plugins/axios'

/**
 * S-2-1 查詢商品類別
 * @param {Number} 商品分類編號，沒有等於查詢全部商品
 */
export const searchTypeAll = () => axios.get('/v1/products')
export const searchType = (productsType) => axios.get(`/v1/products?productsType=${productsType}`)

/**
 * O-3-1 查詢商品
 * @param {Number} 商品分類編號
 * @param {Number} 價格區間下限
 * @param {Number} 價格區間上限
 * @param {String} 安全危險無庫存狀態
 */
export const searchAdminProductAll = () => axios.get('/v1/products/admin')
export const searchAdminProduct = (productsType, priceLowerLimit, priceUpperLimit, amountStatus) => axios.get(`/v1/products/admin?productsType=${productsType}&priceLowerLimit=${priceLowerLimit}&priceUpperLimit=${priceUpperLimit}&amountStatus=${amountStatus}`)
/**
 * O-3-2 上傳商品圖片
 */
export const uploadAdminPhotos = (formData) => axios.post('/v1/products/admin/uploadPhotos', formData)

/**
 * O-3-3 新增商品
 * @param {object} payload 商品資料
 */
export const addAdminProduct = (payload) => axios.post('/v1/products/admin', payload)

/**
 * O-3-4 修改商品
 * @param {Number} 商品 ID
 * @param {object} payload 商品資料
 */
export const editAdminProduct = (productNo, payload) => axios.patch(`/v1/products/admin/${productNo}`, payload)

/**
 * O-3-5 刪除商品
 * @param {Number} 商品 ID
 */
export const deleteAdminProduct = (productNo) => axios.delete(`/v1/products/admin/${productNo}`)

/**
 * O-3-6 取得商品種類代碼
 * @param {string} 頁數
 */
export const getAdminDessertType = () => axios.get('/v1/products/dessertcodes')

/**
 * O-3-7 新增分類
 * @param {object} payload 商品分類資料
 */
export const addAdminDessertType = (payload) => axios.post('/v1/products/admin/dessertcodes', payload)

/**
 * O-3-8 刪除分類
 * @param {Number} 商品分類編號
 */
export const deleteAdminDessertType = (productsType) => axios.delete(`/v1/products/admin/dessertcodes/${productsType}`)
