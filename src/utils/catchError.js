import { errorAlert } from '@/plugins/toast'

export const catchError = (asFn) => {
  return (param) => {
    return asFn(param).catch((err) => {
      // console.log(err)
      errorAlert(err.message)
    })
  }
}

// const getProduct = catchError(async()=>{
//   這裡開始寫功能
// })
