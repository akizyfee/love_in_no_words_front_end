import { ref } from 'vue'
import { defineStore } from 'pinia'
import { catchError } from '@/utils/catchError'
import { warningAlert, successAlert } from '@/plugins/toast'
import { getAdminCoupon, addAdminCoupon, editAdminCoupon, deleteAdminCoupon, getAdminFreebiePlus, addAdminFreebiePlus, deleteAdminFreebiePlus } from '@/apis/coupon'

export const useCouponAdminStore = defineStore('couponData', () => {
  /**
   * 優惠碼活動
   * 取得優惠碼活動
   **/
  const couponList = ref([])
  const getCoupon = catchError(async () => {
    const { data } = await getAdminCoupon('cuponCode')
    if (data.length === 0) {
      warningAlert('尚未建立優惠碼活動')
    }
    couponList.value = data
  })

  /**
   * 優惠碼活動
   * 新增優惠碼活動
   **/
  const postCoupon = catchError(async (couponForm) => {
    const { message } = await addAdminCoupon(couponForm)
    successAlert(message)
    getCoupon()
  })

  /**
   * 優惠碼活動
   * 修改優惠碼活動
   **/
  const patchCoupon = catchError(async (couponNoVal, couponForm) => {
    const { message } = await editAdminCoupon(couponNoVal, couponForm)
    successAlert(message)
    getCoupon()
  })

  /**
   * 優惠碼活動
   * 刪除優惠碼活動
   **/
  const delCoupon = catchError(async (couponNoVal) => {
    const { message } = await deleteAdminCoupon(couponNoVal)
    successAlert(message)
    getCoupon()
  })

  return { couponList, getCoupon, postCoupon, patchCoupon, delCoupon }
})

export const useFreebiePlusAdminStore = defineStore('freebiePlusData', () => {
  /**
   * A+B 活動
   * 取得 A+B 活動
   **/
  const freebiePlusList = ref([])
  const getFreebiePlus = catchError(async () => {
    const { data } = await getAdminFreebiePlus()
    if (data.list.length === 0) {
      warningAlert('尚未建立 A+B 活動')
    }
    freebiePlusList.value = data
  })

  /**
   * A+B 活動
   * 新增 A+B 活動
   **/
  const postFreebiePlus = catchError(async (freebiePlusForm) => {
    const { message } = await addAdminFreebiePlus(freebiePlusForm)
    successAlert(message)
    getFreebiePlus()
  })

  /**
   * A+B 活動
   * 刪除 A+B 活動
   **/
  const delFreebiePlus = catchError(async (freebiePlusCouponNoVal) => {
    const { message } = await deleteAdminFreebiePlus(freebiePlusCouponNoVal)
    successAlert(message)
    getFreebiePlus()
  })

  return { freebiePlusList, getFreebiePlus, postFreebiePlus, delFreebiePlus }
})
