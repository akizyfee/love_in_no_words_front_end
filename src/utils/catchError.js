import { errorAlert } from '@/plugins/toast'

export const catchError = (asFn) => {
  return (param, paramTwo = null, paramThree = null) => {
    return asFn(param, paramTwo, paramThree).catch((err) => {
      console.log(err)
      errorAlert(err.message)
    })
  }
}
