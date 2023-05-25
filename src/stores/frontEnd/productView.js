import { ref } from 'vue'
import { defineStore } from 'pinia'
import { catchError } from '@/utils/catchError'
import { warningAlert, successAlert } from '@/plugins/toast'
import { getAdminDessertType, searchType } from '@/apis/product'
import { searchMember, addMember } from '@/apis/user'
import { getCoupon } from '@/apis/coupon'
import { calculateTotalPrice, addOrder } from '@/apis/order'

export const useProductStore = defineStore('productData', () => {
  /**
   * 取得商品種類代碼、查詢商品類別
   **/
  const typeList = ref([])
  const currentIndex = ref(0)
  const productList = ref([])

  const fetchAllDessertType = catchError(async () => {
    const { data } = await getAdminDessertType()
    typeList.value = data
    currentIndex.value = data[0].productsType
    fetchProduct(data[0].productsType)
  })

  const fetchProduct = catchError(async (dessertType) => {
    const { data } = await searchType(dessertType)
    if (data.length === 0) {
      warningAlert('沒有符合的商品資料')
    }
    productList.value = data
    currentIndex.value = dessertType
  })

  /**
   * 查詢會員
   **/
  const memberList = ref([])
  const getMembers = catchError(async (phone, page) => {
    const { data } = await searchMember(phone, page)
    memberList.value = data.membersList
  })

  /**
   * 新增會員
   **/
  const postMember = catchError(async (memberForm) => {
    const { message } = await addMember(memberForm)
    successAlert(message)
  })

  /**
   * 取得優惠碼活動
   **/
  const couponList = ref([])
  const getCouponCode = catchError(async () => {
    const { data } = await getCoupon('cuponCode')
    couponList.value = data.filter(function (item) {
      return !item.isDisabled
    })
  })

  /**
   * 金額試算
   **/
  const checkProductTotalPrice = ref({
    couponName: '',
    couponNo: '',
    discount: 0,
    orderList: [],
    tableName: 0,
    totalPrice: 0,
    totalTime: 0
  })

  const fetchCalculateTotalPrice = catchError(async (orderProductTotalPrice) => {
    const { data } = await calculateTotalPrice(orderProductTotalPrice)
    checkProductTotalPrice.value = data
    if (!Object.keys(data).includes('couponName')) {
      checkProductTotalPrice.value.couponName = ''
    }
    if (!Object.keys(data).includes('discount')) {
      checkProductTotalPrice.value.discount = 0
    }
  })

  /**
   * 新增訂單
   **/
  const fetchAddOreder = catchError(async (orderProductTotalPrice) => {
    const { message } = await addOrder(orderProductTotalPrice)
    successAlert(message)
  })

  return { typeList, currentIndex, productList, memberList, couponList, checkProductTotalPrice, fetchAllDessertType, fetchProduct, getMembers, postMember, getCouponCode, fetchCalculateTotalPrice, fetchAddOreder }
})
