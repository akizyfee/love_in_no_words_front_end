import { errorAlert } from '@/utils/toast'

export const catchError = (asFn) => {
  return (param) => {
    return asFn(param).catch((err) => {
      errorAlert(err.message)
    })
  }
}

// const getProduct = catchError(async()=>{
//   這裡開始寫功能
// })
