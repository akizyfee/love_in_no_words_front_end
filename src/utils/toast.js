import { useToast } from 'vue-toast-notification'
const instance = useToast()

export const errorAlert = (message) => {
  instance.open({
    message,
    type: 'error'
  })
}

export const successAlert = (message) => {
  instance.open({
    message,
    type: 'success'
  })
}

export const warningAlert = (message) => {
  instance.open({
    message,
    type: 'warning'
  })
}
