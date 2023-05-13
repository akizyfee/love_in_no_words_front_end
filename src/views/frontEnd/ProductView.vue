<script setup>
import SiderBar from '@/components/frontEnd/SideBar.vue'
import Modal from '@/components/TheModal.vue'
import { ref, reactive, nextTick, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { catchError } from '@/utils/catchError'
import { searchTypeAll, getAdminDessertType, searchType } from '@/apis/product'
import { calculateTotalPrice, addOrder } from '@/apis/order'
import { successAlert } from '@/plugins/toast'

const route = useRoute()
const getTable = ref(`${route.query.table}`)

/**
 * 設置商品列表
 */
const typeList = ref([])
const fetchAllDessertType = catchError(async () => {
  const { data } = await getAdminDessertType()
  typeList.value = data
})

const productList = ref([])
const fetchAllProduct = catchError(async () => {
  const { data } = await searchTypeAll()
  productList.value = data
})

onMounted(() => {
  fetchAllDessertType()
  fetchAllProduct()
})

/**
 * 搜尋分類商品
 */
const fetchProduct = catchError(async (dessertType) => {
  const { data } = await searchType(dessertType)
  productList.value = data
})

/**
 * 購物車
 */
const tempProductCardQty = ref(0)
const plusProductCount = () => {
  tempProductCardQty.value++
}
const minusProductCount = () => {
  tempProductCardQty.value--
}

const productCard = reactive({
  _id: '',
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

const tempProduct = ref([])
const tempProductLength = ref(tempProduct.value.length)
const addToTempProduct = (item) => {
  const productCardQty = tempProductCardQty.value
  const temp = {
    ...item,
    qty: productCardQty
  }
  const findSame = tempProduct.value.find((item) => item._id === temp._id)
  if (findSame) {
    findSame.qty = temp.qty
  } else {
    tempProduct.value.push(temp)
  }
  tempProductCardQty.value = 0
  tempProductLength.value = tempProduct.value.length
  handleModalClose()
}
const removeTempProduct = (item) => {
  const temp = {
    ...item
  }
  const findSame = tempProduct.value.filter((item) => item._id !== temp._id)
  tempProduct.value = findSame
  tempProductLength.value = tempProduct.value.length
}

/**
 * 金額試算
 */
const orderProductTotalPrice = ref({
  tableName: getTable,
  products: tempProduct,
  couponNo: ''
})

const checkProductTotalPrice = ref({
  orderList: [],
  tableName: 0,
  totalPrice: 0,
  totalTime: ''
})

const fetchCalculateTotalPrice = catchError(async () => {
  const { data } = await calculateTotalPrice(orderProductTotalPrice.value)
  checkProductTotalPrice.value = data
  tempProduct.value = []
})

/**
 * 新增訂單
 * */
const fetchAddOreder = catchError(async () => {
  const { message } = await addOrder(orderProductTotalPrice.value)
  successAlert(message)
})

/**
 * modal
 * */
const isCreate = ref(false)
const childComponentRef = ref()

const handleModalOpen = (checkIsCreate, item) => {
  isCreate.value = checkIsCreate
  const childComponent = childComponentRef.value
  nextTick(() => {
    if (childComponent) {
      childComponent.openModal()
    }
    if (isCreate.value === 'create' || isCreate.value === 'update' || isCreate.value === 'delete') {
      const {
        _id,
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
      productCard._id = _id
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
    }
  })
}
</script>
<template>
  <section>
    <aside class="fixed top-0 left-0 z-40 w-[315px] h-screen">
      <SiderBar />
    </aside>
    <main class="mx-[315px] bg-secondary-light p-6 min-h-screen">
      <!-- menu -->
      <ul class="flex text-xl font-medium text-center break-keep overflow-x-auto mb-6">
        <li v-for="types in typeList" :key="types._id" class="mr-2">
          <a
            @click.prevent="fetchProduct(types.productsType)"
            href="#"
            class="block px-6 py-3 rounded-lg hover:text-primary-light hover:bg-white tabbar-active"
            >{{ types.productsTypeName }}
          </a>
        </li>
      </ul>
      <!-- product -->
      <ul class="grid grid-cols-12 gap-4">
        <li
          @click.prevent="handleModalOpen('create', itemProductList)"
          v-for="itemProductList in productList"
          :key="itemProductList.productNo"
          class="col-span-12 xl:col-span-4 bg-white border-2 border-textself rounded-lg shadow relative"
        >
          <img
            class="rounded-t-lg object-cover w-full h-[184px]"
            :src="itemProductList.photoUrl"
            :alt="itemProductList.productName"
          />
          <p class="bg-secondary-light px-2 py-1 text-sm font-normal absolute top-36 left-5">
            {{ itemProductList.productsType.productsTypeName }}
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
            v-if="itemProductList.isDisabled === true || itemProductList.inStockAmount === 0"
            class="absolute top-0 bottom-0 left-0 right-0"
            style="background: rgba(8, 8, 8, 0.5)"
          >
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <p class="text-2xl text-white font-medium py-6 px-9 whitespace-nowrap bg-textself">
                {{ itemProductList.isDisabled === true ? '已停用' : '已售完' }}
              </p>
            </div>
          </section>
        </li>
      </ul>
      <!-- <div v-if="productList.value.length === 0">
        <img
          src="@/assets/img/ImgFeature02.svg"
          class="object-cover block mx-auto"
          alt="Feature_Card_Img2"
        />
        <p class="font-medium text-4xl text-center">目前的分類還沒有餐點哦！</p>
      </div> -->
    </main>
    <aside class="fixed top-0 right-0 z-40 w-[315px] h-screen">
      <div class="w-full h-full border-l-2 border-textself">
        <div class="h-full bg-white flex flex-col justify-between">
          <div class="flex justify-between px-3 py-4 border-b-2 border-black">
            <h1 class="text-xl font-medium">確認訂單</h1>
            <p class="text-xl font-medium">
              桌號
              <span class="text-white bg-primary-light rounded py-1 px-2">{{ getTable }}</span>
            </p>
          </div>
          <!-- cartList：圖片 -->
          <div v-if="tempProductLength === 0" class="text-center">
            <img src="@/assets/img/ImgFeature02.svg" class="object-cover" alt="Feature_Card_Img2" />
            <p class="font-medium">還沒有點選餐點喔！</p>
          </div>
          <!-- cartList -->
          <ul class="flex flex-col p-3 overflow-scroll">
            <li
              v-for="tempProducts in tempProduct"
              :key="tempProducts._id"
              class="flex justify-between items-center border-b border-textself pb-4"
            >
              <div>
                <h2 class="font-medium text-xl">
                  <span>{{ tempProducts.productName }}</span>
                  <span>&emsp;x{{ tempProducts.qty }}</span>
                </h2>
                <p class="font-medium text-xl text-primary-light my-2">${{ tempProducts.price }}</p>
                <p
                  class="inline text-sm font-medium text-white bg-secondary-light rounded-lg py-1 px-2"
                >
                  已符合 A + B
                </p>
              </div>
              <div class="flex flex-col">
                <button
                  @click="handleModalOpen('update', tempProducts)"
                  class="btn btn-outline-dark py-2 px-3 mb-2"
                >
                  修改
                </button>
                <button
                  @click="handleModalOpen('delete', tempProducts)"
                  class="btn btn-outline-dark py-2 px-3"
                >
                  刪除
                </button>
              </div>
            </li>
          </ul>
          <!-- cartBtn -->
          <ul class="grid grid-cols-2 gap-3 border-y-2 p-3 border-textself">
            <li class="col-span-2 lg:col-span-1">
              <button
                @click.prevent="handleModalOpen('readMember')"
                class="w-full btn btn-outline-dark flex items-center justify-center"
              >
                <span>查詢會員</span>
                <img class="ms-2" src="@/assets/img/IconMemberSearch.png" alt="IconMemberSearch" />
              </button>
            </li>
            <li class="col-span-2 lg:col-span-1">
              <button
                @click.prevent="handleModalOpen('createMember')"
                class="w-full btn btn-outline-dark flex items-center justify-center"
              >
                <span>加入會員</span>
                <img class="ms-2" src="@/assets/img/IconMemberPlus.png" alt="IconMemberSearch" />
              </button>
            </li>
            <li class="col-span-2 lg:col-span-1">
              <button
                @click.prevent="handleModalOpen('createActivity')"
                class="w-full btn btn-outline-dark flex items-center justify-center"
              >
                <span>選擇活動</span>
                <img
                  class="ms-2"
                  src="@/assets/img/IconSelectaActivity.png"
                  alt="IconMemberSearch"
                />
              </button>
            </li>
            <li class="col-span-2 lg:col-span-1">
              <button
                @click.prevent="fetchCalculateTotalPrice"
                class="w-full btn btn-outline-dark flex items-center justify-center"
              >
                <span>金額試算</span>
                <img class="ms-2" src="@/assets/img/IconCashCalculate.png" alt="IconMemberSearch" />
              </button>
            </li>
          </ul>
          <div class="flex flex-col px-3 py-4">
            <p class="flex justify-between items-center font-medium">
              <span>製作時間</span>
              <span>{{ checkProductTotalPrice.totalTime }} 分</span>
            </p>
            <p class="flex justify-between items-center font-medium">
              <span>&emsp;&emsp;餐點</span>
              <span>0 份</span>
            </p>
            <p class="flex justify-between items-center font-medium mt-4">
              <span>折扣金額</span>
              <span class="text-primary">0</span>
            </p>
            <p class="flex justify-between items-center font-medium mb-7">
              <span class="text-xl ps-1">&emsp;合計</span>
              <span class="text-xl text-primary">NT$ {{ checkProductTotalPrice.totalPrice }}</span>
            </p>
            <button @click="fetchAddOreder()" class="btn btn-dark py-2 w-full">送出訂單</button>
          </div>
        </div>
      </div>
    </aside>
  </section>
  <Modal ref="childComponentRef">
    <section class="relative w-full h-full max-w-md md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white border-2 border-textself rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-center justify-end border-b-2 border-textself p-3 rounded-t">
          <h2 v-if="isCreate === 'create'" class="text-xl font-medium">新增餐點</h2>
          <h2 v-else-if="isCreate === 'update'" class="text-xl font-medium">修改餐點</h2>
          <h2 v-else-if="isCreate === 'delete'" class="text-xl font-medium">刪除餐點</h2>
          <h2 v-else-if="isCreate === 'readMember'" class="text-xl font-medium">查詢會員</h2>
          <h2 v-else-if="isCreate === 'createMember'" class="text-xl font-medium">加入會員</h2>
          <h2 v-else-if="isCreate === 'createActivity'" class="text-xl font-medium">
            選擇活動 (活動擇一)
          </h2>
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
        <div class="w-full rounded-lg">
          <form v-if="isCreate === 'create'" class="space-y-6" action="#">
            <div class="relative">
              <img
                class="object-cover w-full h-[184px] border-b-2 border-textself"
                :src="productCard.photoUrl"
                alt="ImgProduct"
              />
              <p class="bg-secondary-light px-2 py-1 text-sm font-normal absolute top-36 left-5">
                {{ productCard.productsType.productsTypeName }}
              </p>
              <div class="transition-all duration-500 p-3">
                <h2 class="text-2xl font-medium mb-3">{{ productCard.productName }}</h2>
                <div class="flex justify-between items-center">
                  <p class="text-primary-light text-[32px] font-bold">${{ productCard.price }}</p>
                  <div class="flex flex-col items-end">
                    <p class="font-normal">
                      <span class="text-neutralself-200">剩餘</span>
                      &emsp;{{ productCard.inStockAmount }}份
                    </p>
                    <p class="font-normal">
                      <span class="text-neutralself-200">製作時間</span>
                      &emsp;{{ productCard.productionTime }}分
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-3">
              <div class="flex">
                <button
                  @click.prevent="minusProductCount"
                  type="button"
                  class="form-qty border-r-0 rounded-l-lg"
                >
                  －
                </button>
                <input
                  type="text"
                  id="form_qty"
                  class="form-input flex-1 rounded-none rounded-x-lg"
                  placeholder="1"
                  required
                  min="0"
                  v-model="tempProductCardQty"
                />
                <button
                  @click.prevent="plusProductCount"
                  type="button"
                  class="form-qty border-l-0 rounded-r-lg"
                >
                  ＋
                </button>
              </div>
            </div>
            <div class="px-3">
              <textarea
                id="form_textarea"
                rows="4"
                class="form-input"
                placeholder="請輸入客製化內容，例如：飲料去冰、加料"
                v-model="productCard.description"
              ></textarea>
            </div>
            <!-- send_btn -->
            <div class="flex p-3">
              <button
                @click.prevent="addToTempProduct(productCard)"
                type="submit"
                class="w-full btn btn-dark"
              >
                確認新增
              </button>
            </div>
          </form>
          <form v-else-if="isCreate === 'update'" class="space-y-6" action="#">
            <div class="relative">
              <img
                class="object-cover w-full h-[184px] border-b-2 border-textself"
                :src="productCard.photoUrl"
                alt="ImgProduct"
              />
              <p class="bg-secondary-light px-2 py-1 text-sm font-normal absolute top-36 left-5">
                {{ productCard.productsType.productsTypeName }}
              </p>
              <div class="transition-all duration-500 p-3">
                <h2 class="text-2xl font-medium mb-3">{{ productCard.productName }}</h2>
                <div class="flex justify-between items-center">
                  <p class="text-primary-light text-[32px] font-bold">${{ productCard.price }}</p>
                  <div class="flex flex-col items-end">
                    <p class="font-normal">
                      <span class="text-neutralself-200">剩餘</span>
                      &emsp;{{ productCard.inStockAmount }}份
                    </p>
                    <p class="font-normal">
                      <span class="text-neutralself-200">製作時間</span>
                      &emsp;{{ productCard.productionTime }}分
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-3">
              <div class="flex">
                <button
                  @click.prevent="minusProductCount"
                  type="button"
                  class="form-qty border-r-0 rounded-l-lg"
                >
                  －
                </button>
                <input
                  type="text"
                  id="form_qty"
                  class="form-input flex-1 rounded-none rounded-x-lg"
                  placeholder="1"
                  required
                  min="0"
                  v-model="tempProductCardQty"
                />
                <button
                  @click.prevent="plusProductCount"
                  type="button"
                  class="form-qty border-l-0 rounded-r-lg"
                >
                  ＋
                </button>
              </div>
            </div>
            <div class="px-3">
              <textarea
                id="form_textarea"
                rows="4"
                class="form-input"
                placeholder="請輸入客製化內容，例如：飲料去冰、加料"
                v-model="productCard.description"
              ></textarea>
            </div>
            <!-- send_btn -->
            <div class="flex p-3">
              <button
                @click.prevent="addToTempProduct(productCard)"
                type="submit"
                class="w-full btn btn-dark"
              >
                確認修改
              </button>
            </div>
          </form>
          <form v-else-if="isCreate === 'delete'" class="space-y-6" action="#">
            <div class="flex flex-col">
              <h3 class="text-xl text-center font-medium p-3 pb-0">
                請確認是否刪除
                <span class="text-primary-light">{{ productCard.productName }}</span> ?
              </h3>
              <!-- send_btn -->
              <div class="flex m-3">
                <button
                  @click.prevent="removeTempProduct(productCard)"
                  type="submit"
                  class="w-full ml-1 btn btn-dark"
                >
                  確認刪除
                </button>
              </div>
            </div>
          </form>
          <form v-else-if="isCreate === 'readMember'" class="space-y-6 p-3" action="#">
            <div>
              <label for="form_tel" class="block mb-2 font-medium">手機號碼</label>
              <input
                type="tel"
                id="form_tel"
                class="form-input"
                placeholder="0912345678"
                required
              />
              <p class="text-sm text-primary-light mt-2">Twitter username is required</p>
            </div>
            <div class="bg-bgself-light p-4">
              <h3 class="mb-2 font-medium">查詢結果</h3>
              <div class="flex items-center">
                <input
                  checked
                  id="form_readmember_radio"
                  type="radio"
                  value=""
                  name="form-radio"
                  class="form-radio"
                />
                <label for="form_readmember_radio" class="ml-2 text-xl font-medium">王小美</label>
              </div>
            </div>
            <!-- send_btn -->
            <div class="flex">
              <button type="submit" class="w-full mr-1 btn btn-outline-dark">重新查詢</button>
              <button type="button" class="w-full ml-1 btn btn-dark">確認</button>
            </div>
          </form>
          <form v-else-if="isCreate === 'createMember'" class="space-y-6 p-3" action="#">
            <div>
              <label for="form_name" class="block mb-2 font-medium">姓名</label>
              <input type="text" id="form_name" class="form-input" placeholder="王小美" required />
              <p class="text-sm text-primary-light mt-2">Twitter username is required</p>
            </div>
            <div>
              <label for="form_tel" class="block mb-2 font-medium">手機號碼</label>
              <input
                type="tel"
                id="form_tel"
                class="form-input"
                placeholder="0912345678"
                required
              />
              <p class="text-sm text-primary-light mt-2">Twitter username is required</p>
            </div>
            <!-- send_btn -->
            <div class="flex">
              <button type="submit" class="w-full ml-1 btn btn-dark">確認加入</button>
            </div>
          </form>
          <form v-else-if="isCreate === 'createActivity'" class="space-y-4 p-3" action="#">
            <ul class="flex flex-col">
              <li class="mb-3">
                <div class="flex items-center mb-3">
                  <input
                    checked
                    id="form_checkIn_radio"
                    type="radio"
                    value=""
                    name="form-radio"
                    class="form-radio"
                  />
                  <label for="form_checkIn_radio" class="ml-2 text-xl font-medium">打卡優惠</label>
                </div>
                <div class="bg-bgself-light p-4">
                  <select id="checkIn_status" class="form-select mb-3">
                    <option value="85%" selected>85 折</option>
                    <option value="88%">88 折</option>
                    <option value="90%">90 折</option>
                  </select>
                  <input
                    type="text"
                    id="form_checkIn"
                    class="form-input"
                    placeholder="優惠代碼"
                    required
                  />
                  <p class="text-sm text-primary-light mt-2">Twitter username is required</p>
                </div>
              </li>
              <li class="mb-3">
                <div class="flex items-center mb-3">
                  <input
                    disabled
                    id="form_newMember_radio"
                    type="radio"
                    value=""
                    name="form-radio"
                    class="form-radio"
                  />
                  <label
                    for="form_newMember_radio"
                    class="ml-2 text-xl font-medium text-neutralself-100"
                    >新會員優惠</label
                  >
                </div>
                <div class="bg-bgself-light p-4 hidden">
                  <select id="newMember_status" class="form-select mb-3">
                    <option value="85%" selected>85 折</option>
                    <option value="88%">88 折</option>
                    <option value="90%">90 折</option>
                  </select>
                  <input
                    type="text"
                    id="form_newMember"
                    class="form-input"
                    placeholder="優惠代碼"
                    required
                  />
                  <p class="text-sm text-primary-light mt-2">Twitter username is required</p>
                </div>
              </li>
              <li class="mb-3">
                <div class="flex items-center mb-3">
                  <input
                    disabled
                    id="form_member_radio"
                    type="radio"
                    value=""
                    name="form-radio"
                    class="form-radio"
                  />
                  <label
                    for="form_member_radio"
                    class="ml-2 text-xl font-medium text-neutralself-100"
                    >熟客優惠</label
                  >
                </div>
                <div class="bg-bgself-light p-4 hidden">
                  <select id="member_status" class="form-select mb-3">
                    <option value="85%" selected>85 折</option>
                    <option value="88%">88 折</option>
                    <option value="90%">90 折</option>
                  </select>
                  <input
                    type="text"
                    id="form_member"
                    class="form-input"
                    placeholder="優惠代碼"
                    required
                  />
                  <p class="text-sm text-primary-light mt-2">Twitter username is required</p>
                </div>
              </li>
              <li class="mb-3">
                <div class="flex items-center mb-3">
                  <input
                    disabled
                    id="form_birth_radio"
                    type="radio"
                    value=""
                    name="form-radio"
                    class="form-radio"
                  />
                  <label
                    for="form_birth_radio"
                    class="ml-2 text-xl font-medium text-neutralself-100"
                    >生日優惠</label
                  >
                </div>
                <div class="bg-bgself-light p-4 hidden">
                  <select id="birth_status" class="form-select mb-3">
                    <option value="85%" selected>85 折</option>
                    <option value="88%">88 折</option>
                    <option value="90%">90 折</option>
                  </select>
                  <input
                    type="text"
                    id="form_birth"
                    class="form-input"
                    placeholder="優惠代碼"
                    required
                  />
                  <p class="text-sm text-primary-light mt-2">Twitter username is required</p>
                </div>
              </li>
            </ul>
            <!-- send_btn -->
            <div class="flex">
              <button type="submit" class="w-full ml-1 btn btn-dark">確認</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </Modal>
</template>
<style scoped>
.tabbar-active {
  @apply text-primary-light bg-white;
}
</style>
