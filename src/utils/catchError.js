export const catchError = (asFn) => {
  return (param) => {
    return asFn(param).catch((err) => {
      console.log('catch', err)
    })
  }
}

// const getProduct = catchError(async()=>{
//   這裡開始寫功能
// })
