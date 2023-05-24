<script setup>
import SiderBar from '@/components/backEnd/SideBar.vue'
import Modal from '@/components/TheModal.vue'
import { ref, nextTick, onMounted, reactive, watch } from 'vue'
import { catchError } from '@/utils/catchError'
import { successAlert } from '@/plugins/toast'
import { errorProductSchema } from '@/utils/formValidate'
import { useForm } from 'vee-validate'
import {
  uploadAdminPhotos,
  addAdminProduct,
  addAdminDessertType,
  getAdminDessertType,
  deleteAdminDessertType,
  editAdminProduct,
  deleteAdminProduct,
  searchAdminProduct
} from '@/apis/product'

/**
 * 載入驗證
 */
const { errors, useFieldModel } = useForm({
  validationSchema: errorProductSchema
})

/**
 * 新增商品分類
 */
const initDessertType = reactive({
  productsTypeName: ''
})
const dessertType = reactive({
  productsTypeName: useFieldModel('dessertCategory')
})

const fetchAddDessertcodes = catchError(async () => {
  const { message } = await addAdminDessertType(dessertType)
  successAlert(message)
  Object.assign(dessertType, initDessertType)
  fetchGetDessertTypeList()
})

/**
 * 取得產品分類列表
 */
const dessertTypeList = ref([])
const fetchGetDessertTypeList = catchError(async () => {
  const { data } = await getAdminDessertType()
  dessertTypeList.value = data
})

onMounted(() => {
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
 * 圖片上傳
 */
const imgFile = ref()
const uploadFile = catchError(async () => {
  const file = imgFile.value.files[0]
  const formData = new FormData()
  formData.append('file-to-upload', file)
  const { data } = await uploadAdminPhotos(formData)
  productCard.photoUrl = data.photoUrl
})

/**
 * 商品表單
 */
const initProductCard = reactive({
  productNo: 0,
  productName: '',
  photoUrl: '',
  price: 0,
  inStockAmount: 0,
  safeStockAmount: 0,
  amountStatus: 'safe',
  productsType: 0,
  productionTime: 0,
  isDisabled: false,
  description: ''
})

const productCard = reactive({
  productNo: 0,
  productName: useFieldModel('productName'),
  photoUrl: useFieldModel('photoUrl'),
  price: useFieldModel('price'),
  inStockAmount: useFieldModel('inStockAmount'),
  safeStockAmount: useFieldModel('safeStockAmount'),
  amountStatus: 'safe',
  productsType: 0,
  productionTime: useFieldModel('productionTime'),
  isDisabled: false,
  description: ''
})

/**
 * 設置商品列表
 */
const productList = ref([])
const fetchAllProduct = catchError(async () => {
  const { data } = await searchAdminProduct()
  productList.value = data
})

onMounted(() => {
  fetchAllProduct()
})

/**
 * 搜尋商品
 */
const searchFilterProduct = reactive({
  productsType: '',
  priceLowerLimit: '',
  priceUpperLimit: '',
  amountStatus: ''
})
const fetchSearchProduct = catchError(async () => {
  const { data } = await searchAdminProduct(
    searchFilterProduct.productsType,
    searchFilterProduct.priceLowerLimit,
    searchFilterProduct.priceUpperLimit,
    searchFilterProduct.amountStatus
  )
  productList.value = data
})

watch(
  [() => searchFilterProduct.productsType, () => searchFilterProduct.amountStatus],
  () => {
    fetchSearchProduct()
  },
  {
    immediate: true,
    deep: true
  }
)

/**
 * 新增商品
 */
const fetchAddProduct = catchError(async () => {
  const { message } = await addAdminProduct(productCard)
  successAlert(message)
  handleModalClose()
  fetchAllProduct()
})

/**
 * 修改商品
 */
const fetchEditProduct = catchError(async () => {
  const { message } = await editAdminProduct(productCard.productNo, productCard)
  successAlert(message)
  handleModalClose()
  fetchAllProduct()
})

/**
 * 刪除商品
 */
const fetchDeleteProduct = catchError(async () => {
  const { message } = await deleteAdminProduct(productCard.productNo)
  successAlert(message)
  handleModalClose()
  fetchAllProduct()
})

/**
 * modal
 * */
const isCreate = ref(false)
const childComponentRef = ref()

const handleModalOpen = (checkIsNew, item) => {
  isCreate.value = checkIsNew
  const childComponent = childComponentRef.value
  nextTick(() => {
    if (childComponent) {
      childComponent.openModal()
    }
    if (isCreate.value === 'updateProduct') {
      const {
        productNo,
        productName,
        photoUrl,
        price,
        inStockAmount,
        safeStockAmount,
        amountStatus,
        isDisabled,
        productionTime,
        productsType,
        description
      } = item
      productCard.productNo = productNo
      productCard.productName = productName
      productCard.photoUrl = photoUrl
      productCard.price = price
      productCard.inStockAmount = inStockAmount
      productCard.safeStockAmount = safeStockAmount
      productCard.amountStatus = amountStatus
      productCard.isDisabled = isDisabled
      productCard.productionTime = productionTime
      productCard.productsType = productsType
      productCard.description = description
    }
  })
}
const handleModalClose = () => {
  const childComponent = childComponentRef.value

  nextTick(() => {
    if (childComponent) {
      childComponent.closeModal()
      Object.assign(dessertType, initDessertType)
      Object.assign(productCard, initProductCard)
    }
  })
}
</script>
<template>
  <aside class="fixed top-0 left-0 z-40 w-[315px] h-screen">
    <SiderBar />
  </aside>
  <div class="ml-[315px] bg-white">
    <nav class="border-b-2 border-textself p-6">
      <h1 class="flex items-center text-[36px] font-bold">商品管理</h1>
    </nav>
    <main class="min-h-screen p-6">
      <!-- select -->
      <div class="flex-col xl:flex xl:flex-row items-end justify-between mb-3">
        <div class="flex items-end gap-4 mb-3">
          <!-- category -->
          <section class="flex-col items-center">
            <label for="filterCategory" class="block mb-1 mr-3 font-medium whitespace-nowrap"
              >商品分類</label
            >
            <select
              id="filterCategory"
              class="form-select py-3"
              v-model="searchFilterProduct.productsType"
            >
              <template v-for="dessertList in dessertTypeList" :key="dessertList.productsType">
                <option :value="dessertList.productsType">
                  {{ dessertList.productsTypeName }}
                </option>
              </template>
            </select>
          </section>
          <!-- status -->
          <section class="flex-col items-center">
            <label for="filterStatus" class="block mb-1 mr-3 font-medium whitespace-nowrap"
              >狀態</label
            >
            <select
              id="filterStatus"
              class="form-select py-3"
              v-model="searchFilterProduct.amountStatus"
            >
              <option value="safe" selected>安全</option>
              <option value="danger">危險</option>
              <option value="zero">無庫存</option>
            </select>
          </section>
          <!-- price -->
          <section class="flex flex-col">
            <label for="filterPrice" class="block mb-1 font-medium whitespace-nowrap"
              >價格區間</label
            >
            <div class="flex items-center mr-3">
              <input
                type="text"
                id="filterPrice"
                class="form-select py-3 max-w-[120px] xl:max-w-[200px]"
                required
                v-model="searchFilterProduct.priceLowerLimit"
              />
              <div class="text-2xl align-middle mx-3">~</div>
              <input
                type="text"
                id="filterPriceTwo"
                class="form-select py-3 max-w-[120px] xl:max-w-[200px]"
                required
                v-model="searchFilterProduct.priceUpperLimit"
              />
              <button
                @click.prevent="fetchSearchProduct"
                type="button"
                class="btn btn-outline-dark whitespace-nowrap mx-3"
              >
                搜尋
              </button>
            </div>
          </section>
        </div>
        <!-- btn -->
        <section class="flex items-center mb-3">
          <button @click="handleModalOpen('create')" class="btn btn-dark w-auto me-3">
            新增商品
          </button>
          <button @click="handleModalOpen('updateCategory')" class="btn btn-outline-dark w-auto">
            編輯分類
          </button>
        </section>
      </div>
      <!-- product -->
      <ul class="grid grid-cols-12 gap-4">
        <li
          @click="handleModalOpen('updateProduct', itemProductList)"
          v-for="itemProductList in productList"
          :key="itemProductList.productNo"
          class="col-span-12 xl:col-span-4 bg-white border-2 border-textself rounded-lg shadow relative"
        >
          <img
            class="rounded-t-lg object-cover w-full h-[184px]"
            :src="itemProductList.photoUrl"
            :alt="itemProductList.productName"
          />
          <p
            class="bg-neutralself-400 text-white rounded px-2 py-1 text-sm font-normal absolute top-36 left-5"
          >
            {{ itemProductList.productsTypeName }}
          </p>
          <div
            :class="[
              'transition-all duration-500 p-6 rounded-bl-lg rounded-br-lg',
              itemProductList.amountStatus === 'safe' && 'bg-white',
              itemProductList.amountStatus === 'danger' && 'bg-[#F31F1F1A]'
            ]"
          >
            <h2 class="text-2xl font-medium mb-3">{{ itemProductList.productName }}</h2>
            <div class="flex justify-between items-center">
              <p class="text-primary-light text-[32px] font-bold">${{ itemProductList.price }}</p>
              <div class="flex flex-col items-end">
                <p v-if="itemProductList.amountStatus === 'safe'" class="font-normal">
                  <span class="text-neutralself-200">剩餘</span>
                  &emsp;{{ itemProductList.inStockAmount }}份
                </p>
                <p
                  v-else-if="itemProductList.amountStatus === 'danger'"
                  class="flex items-center text-primary-light font-normal"
                >
                  <img src="@/assets/img/IconDanger.png" class="me-3" alt="Img_IconDanger" />
                  <span class="text-neutralself-200">剩餘</span>
                  &emsp;{{ itemProductList.inStockAmount }}份
                </p>
                <p v-else-if="itemProductList.amountStatus === 'zero'" class="font-normal">
                  <span class="text-neutralself-200">剩餘</span>
                  &emsp;{{ itemProductList.inStockAmount }}份
                </p>
                <p class="font-normal">
                  <span class="text-neutralself-200">製作時間</span>
                  &emsp;{{ itemProductList.productionTime }}分
                </p>
              </div>
            </div>
          </div>
          <section
            v-if="itemProductList.isDisabled === true || itemProductList.inStockAmount === 0"
            class="absolute top-0 bottom-0 left-0 right-0"
            style="background: rgba(8, 8, 8, 0.5)"
          >
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <p
                class="text-2xl text-white font-medium py-6 px-9 whitespace-nowrap bg-textself rounded-lg"
              >
                {{ itemProductList.isDisabled === true ? '已停用' : '已售完' }}
              </p>
            </div>
          </section>
        </li>
      </ul>
      <!-- productList img -->
      <div v-if="productList.length === 0" class="text-center">
        <img
          src="@/assets/img/ImgFeature02.svg"
          class="object-cover block mx-auto"
          alt="Feature_Card_Img2"
        />
        <p class="font-medium">沒有相關條件的餐點喔！</p>
      </div>
    </main>
  </div>
  <Modal ref="childComponentRef">
    <section
      class="relative w-full h-full max-w-md md:h-auto"
      :class="isCreate !== 'updateCategory' && 'max-w-xl'"
    >
      <!-- Modal content -->
      <div class="relative bg-white border-2 border-textself rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-center justify-end border-b-2 border-textself p-3 rounded-t">
          <h2 v-if="isCreate === 'create'" class="text-xl font-medium">新增商品</h2>
          <h2 v-else-if="isCreate === 'updateProduct'" class="text-xl font-medium">修改商品</h2>
          <h2 v-else-if="isCreate === 'updateCategory'" class="text-xl font-medium">編輯分類</h2>
          <button
            @click="handleModalClose()"
            type="button"
            class="text-gray-400 bg-black hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only text-black">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="w-full rounded-lg p-3">
          <form v-if="isCreate === 'create'">
            <section class="grid grid-cols-2 gap-4">
              <section class="col-span-1">
                <!-- name -->
                <div class="mb-2">
                  <label for="form_productName" class="block font-medium">商品名稱</label>
                  <input
                    type="text"
                    id="form_productName"
                    class="form-input my-2"
                    v-model.trim="productCard.productName"
                  />
                  <p class="text-sm text-primary-light">{{ errors.productName }}</p>
                </div>
                <!-- price -->
                <div class="mb-2">
                  <label for="form_productPrice" class="block font-medium">商品訂價</label>
                  <input
                    type="number"
                    id="form_productPrice"
                    class="form-input my-2"
                    v-model.number="productCard.price"
                  />
                  <p class="text-sm text-primary-light">{{ errors.price }}</p>
                </div>
                <!-- img -->
                <div class="mb-2">
                  <label for="form_productImg" class="block font-medium">商品圖片</label>
                  <div class="flex flex-col">
                    <input
                      id="form_productImg"
                      ref="imgFile"
                      type="file"
                      class="form-input my-2"
                      @change="uploadFile"
                    />
                    <p class="text-sm text-primary-light mb-2">{{ errors.photoUrl }}</p>
                    <img
                      :src="productCard.photoUrl ? productCard.photoUrl : 'https://fakeimg.pl/300/'"
                      :alt="productCard.productName"
                      class="rounded-lg object-cover w-full h-[184px]"
                    />
                  </div>
                </div>
              </section>
              <section class="col-span-1">
                <!-- stock -->
                <div class="mb-2">
                  <label for="form_Stock" class="block font-medium">商品庫存數量</label>
                  <input
                    type="number"
                    id="form_Stock"
                    class="form-input my-2"
                    v-model.number="productCard.inStockAmount"
                  />
                  <p class="text-sm text-primary-light">{{ errors.inStockAmount }}</p>
                </div>
                <!-- safe_stock -->
                <div class="mb-2">
                  <label for="form_SafeStock" class="block font-medium">安全庫存量</label>
                  <input
                    type="number"
                    id="form_SafeStock"
                    class="form-input my-2"
                    v-model.number="productCard.safeStockAmount"
                  />
                  <p class="text-sm text-primary-light">{{ errors.safeStockAmount }}</p>
                </div>
                <!-- time -->
                <div class="mb-2">
                  <label for="form_time" class="block font-medium">製作時間</label>
                  <div class="flex items-center my-2">
                    <input
                      type="text"
                      id="form_time"
                      class="form-input mr-2"
                      v-model="productCard.productionTime"
                    />
                    <span class="whitespace-nowrap">分鐘</span>
                  </div>
                  <p class="text-sm text-primary-light">{{ errors.productionTime }}</p>
                </div>
                <!-- category -->
                <div class="mb-2">
                  <label for="selectStatus" class="block font-medium whitespace-nowrap"
                    >商品分類</label
                  >
                  <select id="filterCategory" class="form-select my-2">
                    <template
                      v-for="dessertList in dessertTypeList"
                      :key="dessertList.productsType"
                    >
                      <option :value="dessertList.productsType">
                        {{ dessertList.productsTypeName }}
                      </option>
                    </template>
                  </select>
                </div>
                <!-- status -->
                <div class="mb-2">
                  <label for="form_memberStatus" class="block font-medium">狀態</label>
                  <select
                    id="form_memberStatus"
                    class="form-select my-2"
                    v-model="productCard.isDisabled"
                  >
                    <option :value="true" selected>停用</option>
                    <option :value="false">啟用</option>
                  </select>
                </div>
                <!-- content -->
                <div class="mb-2">
                  <label for="form_content" class="block font-medium">商品描述</label>
                  <textarea
                    id="form_content"
                    rows="5"
                    class="form-input my-2"
                    v-model.trim="productCard.description"
                  ></textarea>
                </div>
              </section>
            </section>
            <!-- send_btn -->
            <div class="flex">
              <button
                @click.prevent="fetchAddProduct"
                type="submit"
                class="w-full mr-1 btn btn-dark"
              >
                確定新增
              </button>
            </div>
          </form>
          <form v-if="isCreate === 'updateProduct'">
            <section class="grid grid-cols-2 gap-4">
              <section class="col-span-1">
                <!-- name -->
                <div class="mb-2">
                  <label for="form_productName" class="block font-medium">商品名稱</label>
                  <input
                    type="text"
                    id="form_productName"
                    class="form-input my-2"
                    v-model.trim="productCard.productName"
                  />
                  <p class="text-sm text-primary-light">{{ errors.productName }}</p>
                </div>
                <!-- price -->
                <div class="mb-2">
                  <label for="form_productPrice" class="block font-medium">商品訂價</label>
                  <input
                    type="number"
                    id="form_productPrice"
                    class="form-input my-2"
                    v-model.number="productCard.price"
                  />
                  <p class="text-sm text-primary-light">{{ errors.price }}</p>
                </div>
                <!-- img -->
                <div class="mb-2">
                  <label for="form_productImg" class="block font-medium">商品圖片</label>
                  <div class="flex flex-col">
                    <input
                      id="form_productImg"
                      ref="imgFile"
                      type="file"
                      class="form-input my-2"
                      @change="uploadFile"
                    />
                    <p class="text-sm text-primary-light mb-2">{{ errors.photoUrl }}</p>
                    <img
                      :src="productCard.photoUrl"
                      :alt="productCard.productName"
                      class="rounded-lg object-cover w-full h-[184px]"
                    />
                  </div>
                </div>
              </section>
              <section class="col-span-1">
                <!-- stock -->
                <div class="mb-2">
                  <label for="form_Stock" class="block font-medium">商品庫存數量</label>
                  <input
                    type="number"
                    id="form_Stock"
                    class="form-input my-2"
                    v-model.number="productCard.inStockAmount"
                  />
                  <p class="text-sm text-primary-light">{{ errors.inStockAmount }}</p>
                </div>
                <!-- safe_stock -->
                <div class="mb-2">
                  <label for="form_SafeStock" class="block font-medium">安全庫存量</label>
                  <input
                    type="number"
                    id="form_SafeStock"
                    class="form-input my-2"
                    v-model.number="productCard.safeStockAmount"
                  />
                  <p class="text-sm text-primary-light">{{ errors.safeStockAmount }}</p>
                </div>
                <!-- time -->
                <div class="mb-2">
                  <label for="form_time" class="block font-medium">製作時間</label>
                  <div class="flex items-center my-2">
                    <input
                      type="text"
                      id="form_time"
                      class="form-input mr-2"
                      v-model="productCard.productionTime"
                    />
                    <span class="whitespace-nowrap">分鐘</span>
                  </div>
                  <p class="text-sm text-primary-light">{{ errors.productionTime }}</p>
                </div>
                <!-- category -->
                <div class="mb-2">
                  <label for="selectStatus" class="block font-medium whitespace-nowrap"
                    >商品分類</label
                  >
                  <select id="filterCategory" class="form-select my-2">
                    <template
                      v-for="dessertList in dessertTypeList"
                      :key="dessertList.productsType"
                    >
                      <option :value="dessertList.productsType">
                        {{ dessertList.productsTypeName }}
                      </option>
                    </template>
                  </select>
                </div>
                <!-- status -->
                <div class="mb-2">
                  <label for="form_memberStatus" class="block font-medium">狀態</label>
                  <select
                    id="form_memberStatus"
                    class="form-select my-2"
                    v-model="productCard.isDisabled"
                  >
                    <option :value="true" selected>停用</option>
                    <option :value="false">啟用</option>
                  </select>
                </div>
                <!-- content -->
                <div>
                  <label for="form_content" class="block font-medium">商品描述</label>
                  <textarea
                    id="form_content"
                    rows="5"
                    class="form-input my-2"
                    v-model.trim="productCard.description"
                  ></textarea>
                </div>
              </section>
            </section>
            <!-- send_btn -->
            <div class="flex">
              <button
                @click="fetchDeleteProduct"
                type="button"
                class="w-full mr-3 btn btn-outline-dark"
              >
                刪除
              </button>
              <button @click.prevent="fetchEditProduct" type="submit" class="w-full btn btn-dark">
                確定修改
              </button>
            </div>
          </form>
          <form v-else-if="isCreate === 'updateCategory'">
            <div>
              <label for="form_selectStatus" class="block mb-2 font-medium"
                >商品分類 (點擊黃色按鈕，即刻刪除該分類)
              </label>
              <input
                type="text"
                id="form_selectStatus"
                class="form-input"
                v-model.trim="dessertType.productsTypeName"
                placeholder="請輸入分類"
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.dessertCategory }}</p>
              <div class="flex flex-wrap mt-3">
                <button
                  @click.prevent="fetchDeleteAdminDessertType(dessertList.productsType)"
                  class="btn btn-secondary font-medium my-2 mr-2 px-3 py-1 rounded"
                  v-for="dessertList in dessertTypeList"
                  :key="dessertList.productsType"
                >
                  {{ dessertList.productsTypeName }}
                </button>
              </div>
            </div>
            <!-- send_btn -->
            <button
              @click.prevent="fetchAddDessertcodes"
              type="submit"
              class="w-full btn btn-dark mt-3"
            >
              確定新增
            </button>
          </form>
        </div>
      </div>
    </section>
  </Modal>
</template>
