import dayjs from 'dayjs'

/**
 * 格式化時間
 * @param {string} date 日期時間
 * @param {string} format 格式
 * @returns {string}
 */
export const dayFormat = (date, format = 'YYYY/MM/DD HH:mm') => dayjs(date).format(format)
