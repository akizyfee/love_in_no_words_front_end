// import { setActivePinia, createPinia } from 'pinia'
// import { useLoadingStore } from '@/stores/TheLoading'
import { errorAlert } from '@/plugins/toast'

// const pinia = createPinia().use(useLoadingStore)
// setActivePinia(pinia)
// const loding = useLoadingStore()

export const catchError = (asFn) => {
  return (param, paramTwo = null, paramThree = null) => {
    return asFn(param, paramTwo, paramThree).catch((err) => {
      console.log(err)
      errorAlert(err.message)
      // loding.isLoading = false
    })
  }
}
