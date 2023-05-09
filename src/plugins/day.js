import dayjs from 'dayjs'

/**
 * 格式化時間
 * @param {string} date 日期時間
 * @param {string} format 格式
 * @returns {string}
 */
export const dayFormat = (date, format = 'YYYY-MM-DD HH:mm') => dayjs(date).format(format)

/**
 * 格式化時間
 * @param {string} date 日期時間
 * @param {string} format 格式
 * @returns {array}
 */
export const dayWeek = (date, format = 'YYYY-MM-DD') => {
  const result = []
  for (let i = 0; i <= 2; i++) {
    date = dayjs().add(i, 'day').format(format)
    result.push(date)
  }
  return result
}
