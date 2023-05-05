import { useToast } from 'vue-toast-notification'
const instance = useToast()

/**
 * 錯誤訊息 alert
 * @param {string} message 錯誤訊息
 */
export const errorAlert = (message) => {
  instance.open({
    message,
    type: 'error'
  })
}

/**
 * 成功訊息 alert
 * @param {string} message 成功訊息
 */
export const successAlert = (message) => {
  instance.open({
    message,
    type: 'success'
  })
}

/**
 * 警告訊息 alert
 * @param {string} message 警告訊息
 */
export const warningAlert = (message) => {
  instance.open({
    message,
    type: 'warning'
  })
}
