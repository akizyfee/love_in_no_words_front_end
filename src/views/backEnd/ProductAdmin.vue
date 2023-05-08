<script setup>
import SiderBar from '@/components/backEnd/SideBar.vue'
import Modal from '@/components/TheModal.vue'
import { ref, nextTick, onMounted } from 'vue'
import { catchError } from '@/utils/catchError'
import { successAlert } from '@/plugins/toast'
import { errorsFormSchema } from '@/utils/formValidate'
import { useForm } from 'vee-validate'
import {
  uploadAdminPhotos,
  addAdminProduct,
  searchAdminProductAll,
  addAdminDessertType,
  getAdminDessertType,
  deleteAdminDessertType
} from '@/apis/product'

/**
 * 載入驗證
 */
const { errors, useFieldModel } = useForm({
  validationSchema: errorsFormSchema
})

/**
 * 新增商品分類
 */
const dessertType = ref({
  productsTypeName: useFieldModel('dessertCategory')
})

const fetchAddDessertcodes = catchError(async () => {
  const { message } = await addAdminDessertType(dessertType)
  successAlert(message)
  fetchGetDessertTypeList()
})

/**
 * 取得產品分類列表
 */
const dessertTypeList = ref([])
const dessertTypeNumber = ref(0)
const fetchGetDessertTypeList = catchError(async () => {
  const { data } = await getAdminDessertType()
  dessertTypeList.value = data
  dessertTypeNumber.value = dessertTypeList.value[0].productsType
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
 * 設置商品列表
 */
const productList = ref([])
const searchFilterProduct = ref({
  productsType: dessertTypeNumber,
  priceLowerLimit: 0,
  priceUpperLimit: 2000,
  amountStatus: 'safe'
})
const fetchProduct = catchError(async () => {
  const { data } = await searchAdminProductAll()
  // searchFilterProduct.value.productsType,
  // searchFilterProduct.value.priceLowerLimit,
  // searchFilterProduct.value.priceUpperLimit,
  // searchFilterProduct.value.amountStatus
  productList.value = data
})

onMounted(() => {
  fetchProduct()
})

/**
 * 圖片上傳
 */
const imgFile = ref()
const imgUrl = ref('')
const uploadFile = catchError(async () => {
  const file = imgFile.value.files[0]
  const formData = new FormData()
  formData.append('file-to-upload', file)
  const { data } = await uploadAdminPhotos(formData)
  imgUrl.value = data.photoUrl
})

/**
 * 商品表單
 */
const productCard = ref({
  productName: '檸檬千層蛋糕',
  photoUrl: imgUrl,
  price: 300,
  inStockAmount: 0,
  safeStockAmount: 50,
  productsType: 7,
  productionTime: 15,
  isDisabled: false,
  description: '祥做的好吃蛋糕'
})

/**
 * 新增商品
 */
const fetchAddProduct = catchError(async () => {
  const { message } = await addAdminProduct(productCard.value)
  successAlert(message)
  handleModalClose()
  productCard.value = {}
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
    // if (isCreate.value === 'updateProduct' || isCreate.value === 'updateCategory') {
    //   const { _id, name, phone, password, titleNo, isDisabled } = item
    //   userProfile.value._id = _id
    //   userProfile.value.name = name
    //   userProfile.value.phone = phone
    //   userProfile.value.titleNo = titleNo
    //   userProfile.value.isDisabled = isDisabled
    //   userProfile.value.password = password
    // }
  })
}
const handleModalClose = () => {
  const childComponent = childComponentRef.value

  nextTick(() => {
    if (childComponent) {
      childComponent.closeModal()
    }
  })
}
</script>
<template>
  <aside class="fixed top-0 left-0 z-40 w-[315px] h-screen">
    <SiderBar />
  </aside>
  <div class="ml-[315px]">
    <nav class="bg-white border-b-2 border-textself p-6">
      <h1 class="flex items-center text-[36px] font-bold">商品管理</h1>
    </nav>
    <main class="bg-secondary-light min-h-screen p-6">
      <div class="flex-col xl:flex xl:flex-row items-end justify-between mb-3">
        <!-- select -->
        <div class="flex items-end gap-4 mb-3">
          <!-- category -->
          <section class="flex-col items-center">
            <label for="filterCategory" class="block mb-1 mr-3 font-medium whitespace-nowrap"
              >商品分類</label
            >
            <select id="filterCategory" class="form-select py-3">
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
          <section class="flex">
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
                id="filterPrice"
                class="form-select py-3 max-w-[120px] xl:max-w-[200px]"
                required
                v-model="searchFilterProduct.priceUpperLimit"
              />
            </div>
            <button type="button" class="btn btn-outline-dark whitespace-nowrap">搜尋</button>
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
          v-for="itemProductList in productList"
          :key="itemProductList.productNo"
          class="col-span-12 xl:col-span-4 bg-white border-2 border-textself rounded-lg shadow relative"
        >
          <a href="#" @click="handleModalOpen('updateProduct', products)">
            <img
              class="rounded-t-lg object-cover w-full h-[184px]"
              :src="itemProductList.photoUrl"
              :alt="itemProductList.productName"
            />
            <p class="bg-secondary-light px-2 py-1 text-sm font-normal absolute top-36 left-5">
              {{ itemProductList.productsTypeName }}
            </p>
          </a>
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
                <p v-if="itemProductList.amountStatus === 'zero'" class="font-normal">
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
            v-if="itemProductList.isDisabled === true"
            class="absolute top-0 bottom-0 left-0 right-0"
            style="background: rgba(8, 8, 8, 0.5)"
          >
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <p class="text-2xl text-white font-medium py-6 px-9 whitespace-nowrap bg-textself">
                已售完
              </p>
            </div>
          </section>
          <section
            v-else-if="itemProductList.amountStatus === 'zero'"
            class="absolute top-0 bottom-0 left-0 right-0"
            style="background: rgba(8, 8, 8, 0.5)"
          >
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <p class="text-2xl text-white font-medium py-6 px-9 whitespace-nowrap bg-textself">
                已停用
              </p>
            </div>
          </section>
        </li>
      </ul>
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
                <div>
                  <label for="form_productName" class="block mb-2 font-medium">商品名稱</label>
                  <input
                    type="text"
                    id="form_productName"
                    class="form-input mr-2"
                    v-model="productCard.productName"
                  />
                </div>
                <!-- price -->
                <div>
                  <label for="form_productPrice" class="block mb-2 font-medium">商品訂價</label>
                  <input
                    type="text"
                    id="form_productPrice"
                    class="form-input mr-2"
                    v-model="productCard.price"
                  />
                </div>
                <!-- category -->
                <div>
                  <label for="selectStatus" class="block mb-2 mr-3 font-medium whitespace-nowrap"
                    >菜單分類</label
                  >
                  <select id="filterCategory" class="form-select py-3">
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
                <!-- img -->
                <div>
                  <label for="form_productImg" class="block mb-2 font-medium">商品圖片</label>
                  <div class="flex flex-col">
                    <input
                      id="form_productImg"
                      ref="imgFile"
                      type="file"
                      class="form-input mr-2"
                      @change="uploadFile"
                    />
                    <div class="my-5">
                      <img
                        src="https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzc2VydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                        alt="user"
                        class="rounded-lg object-cover w-full h-[184px]"
                      />
                    </div>
                  </div>
                </div>
              </section>
              <section class="col-span-1">
                <!-- stock -->
                <div>
                  <label for="form_Stock" class="block mb-2 font-medium">商品庫存數量</label>
                  <input
                    type="text"
                    id="form_Stock"
                    class="form-input mr-2"
                    v-model="productCard.inStockAmount"
                  />
                </div>
                <!-- safe_stock -->
                <div>
                  <label for="form_SafeStock" class="block mb-2 font-medium">安全庫存量</label>
                  <input
                    type="text"
                    id="form_SafeStock"
                    class="form-input mr-2"
                    v-model="productCard.safeStockAmount"
                  />
                </div>
                <!-- time -->
                <div>
                  <label for="form_time" class="block mb-2 font-medium">製作時間</label>
                  <div class="flex items-center">
                    <input
                      type="text"
                      id="form_time"
                      class="form-input mr-2"
                      v-model="productCard.productionTime"
                    />
                    <p class="whitespace-nowrap">分鐘</p>
                  </div>
                </div>
                <!-- status -->
                <div>
                  <label for="form_memberStatus" class="block mb-2 font-medium">狀態</label>
                  <select
                    id="form_memberStatus"
                    class="form-select"
                    v-model="productCard.isDisabled"
                  >
                    <option :value="false" selected>停用</option>
                    <option :value="true">啟用</option>
                  </select>
                </div>
                <!-- content -->
                <div>
                  <label for="form_content" class="block mb-2 font-medium">商品描述</label>
                  <textarea
                    id="form_content"
                    rows="5"
                    class="form-input"
                    v-model="productCard.description"
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
          <form v-if="isCreate === 'updateProduct'" class="space-y-6">
            <section class="grid grid-cols-2 gap-4">
              <section class="col-span-1">
                <!-- name -->
                <div>
                  <label for="form_productName" class="block mb-2 font-medium">商品名稱</label>
                  <input type="text" id="form_productName" class="form-input mr-2" />
                </div>
                <!-- img -->
                <div>
                  <label for="form_productImg" class="block mb-2 font-medium">商品圖片</label>
                  <div class="flex">
                    <input type="text" id="form_productImg" class="form-input mr-2" />
                    <button type="button" class="btn btn-dark whitespace-nowrap py-2 px-3">
                      上傳圖片
                    </button>
                  </div>
                </div>
                <!-- price -->
                <div>
                  <label for="form_productPrice" class="block mb-2 font-medium">商品訂價</label>
                  <input type="text" id="form_productPrice" class="form-input mr-2" />
                </div>
                <!-- stock -->
                <div>
                  <label for="form_Stock" class="block mb-2 font-medium">商品庫存數量</label>
                  <input type="text" id="form_Stock" class="form-input mr-2" />
                </div>
                <!-- safe_stock -->
                <div>
                  <label for="form_SafeStock" class="block mb-2 font-medium">安全庫存量</label>
                  <input type="text" id="form_SafeStock" class="form-input mr-2" />
                </div>
              </section>
              <section class="col-span-1">
                <!-- category -->
                <div>
                  <label for="selectStatus" class="block mb-2 mr-3 font-medium whitespace-nowrap"
                    >菜單分類</label
                  >
                  <select id="selectStatus" class="form-select">
                    <option value="蛋糕" selected>蛋糕</option>
                    <option value="汽水">汽水</option>
                    <option value="馬卡龍">馬卡龍</option>
                  </select>
                </div>
                <!-- time -->
                <div>
                  <label for="form_Stock" class="block mb-2 font-medium">製作時間</label>
                  <div class="flex items-center">
                    <input type="text" id="form_Stock" class="form-input mr-2" />
                    <p class="whitespace-nowrap">分鐘</p>
                  </div>
                </div>
                <!-- status -->
                <div>
                  <label for="selectStatus" class="block mb-2 mr-3 font-medium whitespace-nowrap"
                    >狀態</label
                  >
                  <select id="selectStatus" class="form-select">
                    <option value="安全" selected>安全</option>
                    <option value="危險">危險</option>
                    <option value="無庫存">無庫存</option>
                  </select>
                </div>
                <!-- content -->
                <div>
                  <label for="form_content" class="block mb-2 font-medium">商品描述</label>
                  <textarea id="form_content" rows="5" class="form-input"></textarea>
                </div>
              </section>
            </section>
            <!-- send_btn -->
            <div class="flex">
              <button
                @click="handleModalClose()"
                type="button"
                class="w-full mr-3 btn btn-outline-dark"
              >
                刪除
              </button>
              <button @click="handleModalClose()" type="submit" class="w-full btn btn-dark">
                確定修改
              </button>
            </div>
          </form>
          <form v-else-if="isCreate === 'updateCategory'" class="space-y-6">
            <div>
              <label for="form_selectStatus" class="block mb-2 font-medium"
                >菜單分類 (點擊紅色按鈕，即刻刪除該分類)
              </label>
              <input
                type="text"
                id="form_selectStatus"
                class="form-input mr-2"
                v-model="dessertType.productsTypeName"
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.dessertCategory }}</p>
              <div class="mt-3">
                <template v-for="dessertList in dessertTypeList" :key="dessertList.productsType">
                  <button
                    @click.prevent="fetchDeleteAdminDessertType(dessertList.productsType)"
                    class="bg-primary-light text-white font-medium mr-2 px-3 py-1 rounded"
                  >
                    {{ dessertList.productsTypeName }}
                  </button>
                </template>
              </div>
            </div>
            <!-- send_btn -->
            <button @click.prevent="fetchAddDessertcodes" type="submit" class="w-full btn btn-dark">
              確定新增
            </button>
          </form>
        </div>
      </div>
    </section>
  </Modal>
</template>
<style scoped></style>
