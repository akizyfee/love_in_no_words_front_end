import { useCookies } from '@vueuse/integrations/useCookies'

const cookieToken = useCookies(['posSystemToken'])

/**
 * 清除使用者資訊
 */
export const clearUserInfo = () => {
  cookieToken.remove('posSystemToken')
}

/**
 * 取得 cookie 的 token
 * @returns {string}
 */
export const getCookieToken = () => {
  return cookieToken.get('posSystemToken')
}

/**
 * 設置 cookie 的 token
 * @param {string} token token
 */
export const setCookieToken = (token) => {
  cookieToken.set('posSystemToken', token)
}
