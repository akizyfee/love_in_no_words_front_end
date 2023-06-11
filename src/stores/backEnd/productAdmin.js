import { ref } from 'vue'
import { defineStore } from 'pinia'
import { catchError } from '@/utils/catchError'
import { successAlert } from '@/plugins/toast'
import {
  getAdminDessertType,
  addAdminDessertType,
  deleteAdminDessertType,
  searchAdminProduct,
  addAdminProduct,
  editAdminProduct,
  deleteAdminProduct,
  uploadAdminPhotos
} from '@/apis/product'
import { useLoadingStore } from '@/stores/TheLoading'

export const useProductAdminStore = defineStore('productAdminData', () => {
  const loding = useLoadingStore()

  /**
   * 取得產品分類列表
   */
  const dessertTypeList = ref([])
  const fetchGetDessertTypeList = catchError(async () => {
    loding.isLoading = true
    const { data } = await getAdminDessertType()
    dessertTypeList.value = data
    loding.isLoading = false
  })

  /**
   * 新增商品分類
   */
  const fetchAddDessertcodes = catchError(async (dessertType) => {
    const { message } = await addAdminDessertType(dessertType)
    successAlert(message)
    fetchGetDessertTypeList()
  })

  /**
   * 刪除商品分類
   */
  const fetchDeleteAdminDessertType = catchError(async (productsType) => {
    const { message } = await deleteAdminDessertType(productsType)
    successAlert(message)
    fetchGetDessertTypeList()
  })

  /**
   * 設置商品列表
   */
  const productList = ref([])
  const fetchAllProduct = catchError(async () => {
    loding.isLoading = true
    const { data } = await searchAdminProduct()
    productList.value = data
    loding.isLoading = false
  })

  /**
   * 搜尋商品
   */
  const fetchSearchProduct = catchError(async (searchFilterProduct) => {
    loding.isLoading = true
    const { productsType, priceLowerLimit, priceUpperLimit, amountStatus } = searchFilterProduct
    const { data } = await searchAdminProduct(
      productsType,
      priceLowerLimit,
      priceUpperLimit,
      amountStatus
    )
    productList.value = data
    loding.isLoading = false
  })

  /**
   * 新增商品
   */
  const fetchAddProduct = catchError(async (productCard) => {
    const { message } = await addAdminProduct(productCard)
    successAlert(message)
    fetchAllProduct()
  })

  /**
   * 修改商品
   */
  const fetchEditProduct = catchError(async (productCard) => {
    const { message } = await editAdminProduct(productCard.productNo, productCard)
    successAlert(message)
    fetchAllProduct()
  })

  /**
   * 刪除商品
   */
  const fetchDeleteProduct = catchError(async (productCard) => {
    const { message } = await deleteAdminProduct(productCard.productNo)
    successAlert(message)
    fetchAllProduct()
  })

  /**
   * 圖片上傳
   */
  const uploadFile = catchError(async (formData) => {
    loding.isLoading = true
    const { data } = await uploadAdminPhotos(formData)
    loding.isLoading = false
    return data
  })

  return { dessertTypeList, productList, fetchGetDessertTypeList, fetchAddDessertcodes, fetchDeleteAdminDessertType, fetchAllProduct, fetchSearchProduct, fetchAddProduct, fetchEditProduct, fetchDeleteProduct, uploadFile }
})
