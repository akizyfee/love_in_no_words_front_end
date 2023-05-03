import axios from '@/plugins/axios'

/**
 * 座位狀態顯示
 */
export const getSeatStatus = () => axios.get('/v1/seats/')

/**
 * 修改座位
 * @param {object} payload 座位資訊
 */
export const editSeatStatus = (tableNo, payload) => axios.patch(`/v1/seats/${tableNo}`, payload)

/**
 * 座位人數代碼取得
 */
export const getSeatContent = () => axios.get('/v1/seats/tables-code')

/**
 * 新增桌號
 * @param {object} payload 桌號名稱資訊
 */
export const addSeatNum = (payload) => axios.post('/v1/seats', payload)

/**
 * 刪除桌號
 * @param {object} payload 桌號名稱資訊
 */
export const deleteSeatNum = (tableNo, payload) => axios.delete(`/v1/seat/${tableNo}`, payload)

/**
 * 新增桌號人數上限
 * @param {object} payload 桌號人數資訊
 */
export const addSeatLimit = (payload) => axios.post('/v1/seats/tables-code', payload)

/**
 * 刪除桌號人數上限
 * @param {object} payload 桌號人數資訊
 */
export const deleteSeatLimit = (eatsType) => axios.post(`/v1/seats/tables-code/${eatsType}`)
