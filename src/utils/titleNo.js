import { useCookies } from '@vueuse/integrations/useCookies'

const titleNoToken = useCookies(['posSystemTitleNo'])

/**
 * 清除 cookie 的 titleNo
 */
export const clearCookieTitleNo = () => {
  titleNoToken.remove('posSystemTitleNo')
}

/**
 * 取得 cookie 的 titleNo
 * @returns {number}
 */
export const getCookieTitleNo = () => {
  return titleNoToken.get('posSystemTitleNo')
}

/**
 * 設置 cookie 的 titleNo
 * @param {number} titleNo titleNo
 */
export const setCookieTitleNo = (titleNo) => {
  titleNoToken.set('posSystemTitleNo', titleNo)
}
