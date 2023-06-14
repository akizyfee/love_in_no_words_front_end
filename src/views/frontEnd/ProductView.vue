<script setup>
import SiderBar from '@/components/frontEnd/SideBar.vue'
import Modal from '@/components/TheModal.vue'
import { ref, reactive, nextTick, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/frontEnd/productView'
import { successAlert, errorAlert } from '@/plugins/toast'
import { useForm } from 'vee-validate'
import { errorsFormSchema } from '@/utils/formValidate'
import { useLoadingStore } from '@/stores/TheLoading'

const route = useRoute()
const getTable = ref(`${route.query.table}`)
const router = useRouter()

const productStore = useProductStore()
const loding = useLoadingStore()

/**
 * 取得商品種類代碼、查詢商品類別
 * 取得優惠碼活動
 **/
onMounted(() => {
  productStore.fetchAllDessertType()
  productStore.getCouponCode()
})

/**
 * 查詢會員
 **/
const searchForm = reactive({
  phone: '0912000000',
  page: 1
})

const getMembers = () => {
  productStore.getMembers(searchForm.phone, searchForm.page)
}

/**
 * VeeValidate 套件
 */
const { errors, useFieldModel } = useForm({
  validationSchema: errorsFormSchema
})

const memberForm = reactive({
  name: useFieldModel('name'),
  phone: useFieldModel('phone')
})

/**
 * 新增會員
 **/
const postMember = () => {
  productStore.postMember(memberForm)
  handleModalClose()
}

/**
 * 購物車
 */
const productCard = reactive({
  _id: '',
  productNo: 0,
  productName: '',
  photoUrl: '',
  price: 0,
  inStockAmount: 0,
  amountStatus: 'safe',
  productsType: 0,
  productionTime: 0,
  qty: useFieldModel('qty'),
  description: '',
  note: ''
})

const tempProductCardQty = ref(1)
const tempProduct = ref([])

const plusProductCount = () => {
  tempProductCardQty.value += 1
  productCard.qty = tempProductCardQty.value
}
const minusProductCount = () => {
  tempProductCardQty.value -= 1
  productCard.qty = tempProductCardQty.value
}

const addToTempProduct = (item) => {
  const findSame = tempProduct.value.find((product) => product._id === item._id)
  const temp = {
    ...item
  }
  if (!temp.qty) {
    errorAlert('購買數量必填')
    return
  } else if (temp.qty <= 0) {
    errorAlert('購買數量需要大於 0，請重新填寫')
    return
  } else if (temp.qty > productCard.inStockAmount) {
    errorAlert('購買數量超過庫存，請重新填寫')
    return
  }
  if (findSame) {
    findSame.qty = temp.qty
    findSame.note = temp.note
  } else {
    tempProduct.value.push(temp)
  }
  successAlert('編輯成功')
  handleModalClose()
}

const removeTempProduct = (item) => {
  const temp = {
    ...item
  }
  const findSame = tempProduct.value.findIndex((item) => item._id === temp._id)
  tempProduct.value.splice(findSame, 1)
  successAlert('刪除成功')
  handleModalClose()
}

/**
 * 金額試算
 */
const orderProductTotalPrice = ref({
  tableName: getTable.value,
  products: [],
  couponNo: ''
})

const fetchCalculateTotalPrice = () => {
  orderProductTotalPrice.value.products = tempProduct.value
  productStore.fetchCalculateTotalPrice(orderProductTotalPrice.value).then((data) => {
    tempProduct.value = data
  })
}

/**
 * 新增訂單
 * */
const fetchAddOreder = () => {
  orderProductTotalPrice.value.products = tempProduct.value
  productStore.fetchAddOreder(orderProductTotalPrice.value).then((status) => {
    if (status === 'OK') {
      tempProduct.value = []
      router.push('/order')
    } else {
      loding.isLoading = false
    }
  })
}

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
        amountStatus,
        isDisabled,
        productionTime,
        productsType,
        description,
        qty,
        note
      } = item
      productCard._id = _id
      productCard.productNo = productNo
      productCard.productName = productName
      productCard.photoUrl = photoUrl
      productCard.price = price
      productCard.inStockAmount = inStockAmount
      productCard.amountStatus = amountStatus
      productCard.isDisabled = isDisabled
      productCard.productionTime = productionTime
      productCard.productsType = productsType
      productCard.description = description
      productCard.qty = qty
      productCard.note = note

      if (!Object.keys(item).includes('originalPrice')) {
        productCard.originalPrice = item.price
      } else {
        productCard.originalPrice = item.originalPrice
      }
    }
  })
}

const handleModalClose = () => {
  const childComponent = childComponentRef.value

  nextTick(() => {
    if (childComponent) {
      childComponent.closeModal()
      /**
       * 清空欄位功能
       **/
      searchForm.phone = '0912000000'
      searchForm.page = 1
      productStore.memberList = []
      memberForm.name = ''
      memberForm.phone = ''
      productCard.qty = 1
      productCard.note = ''
    }
  })
}
</script>
<template>
  <section>
    <aside class="fixed top-0 left-0 z-40 w-[315px] h-screen">
      <SiderBar />
    </aside>
    <main class="mx-[315px] bg-white p-6 min-h-screen">
      <!-- menu -->
      <ul class="flex text-xl font-medium text-center break-keep overflow-x-auto mb-6">
        <li class="mr-2" v-for="types in productStore.typeList" :key="types._id">
          <a
            @click.prevent="productStore.fetchProduct(types.productsType)"
            href="#"
            class="block px-6 py-3 rounded-lg hover:text-primary-light hover:bg-white"
            :class="{ 'tabbar-active': productStore.currentIndex === types.productsType }"
            >{{ types.productsTypeName }}
          </a>
        </li>
      </ul>
      <!-- product -->
      <ul class="grid grid-cols-12 gap-4">
        <li
          @click.prevent="handleModalOpen('create', itemProductList)"
          v-for="itemProductList in productStore.productList"
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
              <p class="text-[32px] font-bold">${{ itemProductList.price }}</p>
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
    </main>
    <aside class="fixed top-0 right-0 z-40 w-[315px] h-screen">
      <div class="w-full h-full border-l-2 border-textself">
        <div class="h-full bg-white flex flex-col justify-between overflow-scroll no-scrollbar">
          <div class="flex justify-between px-3 py-4 border-b-2 border-black">
            <h1 class="text-xl font-medium">確認訂單</h1>
            <p class="text-xl font-medium">
              桌號
              <span class="text-white bg-primary-light rounded py-1 px-2">{{ getTable }}</span>
            </p>
          </div>
          <!-- cartList：圖片 -->
          <div v-if="tempProduct.length === 0" class="text-center">
            <img src="@/assets/img/ImgFeature02.svg" class="object-cover" alt="Feature_Card_Img2" />
            <p class="font-medium">還沒有點選餐點喔！</p>
          </div>
          <!-- cartList -->
          <ul class="flex flex-col p-3 overflow-scroll no-scrollbar">
            <li
              v-for="tempProducts in tempProduct"
              :key="tempProducts._id"
              class="flex justify-between items-center border-b border-textself py-4"
            >
              <div>
                <h2 class="font-medium text-xl">
                  <span>{{ tempProducts.productName }}</span>
                  <span>&emsp;{{ tempProducts.qty }}份</span>
                </h2>
                <p class="font-medium text-xl my-2">${{ tempProducts.originalPrice }}</p>
                <p
                  class="inline text-sm font-medium text-white bg-secondary-light rounded-lg py-1 px-2"
                  v-show="tempProducts.couponName"
                >
                  可參與 {{ tempProducts?.couponName }} 活動
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
            <p class="flex justify-between items-center font-medium mb-4">
              <span>套用優惠 </span>
              <span class="text-secondary-dark">{{
                productStore.checkProductTotalPrice.couponName === ''
                  ? '尚未選擇'
                  : productStore.checkProductTotalPrice.couponName
              }}</span>
            </p>
            <p class="flex justify-between items-center font-medium">
              <span>製作時間</span>
              <span>{{ productStore.checkProductTotalPrice.totalTime }} 分</span>
            </p>
            <p class="flex justify-between items-center font-medium mb-4">
              <span>&emsp;&emsp;餐點</span>
              <span>{{ tempProduct.length }} 份</span>
            </p>
            <p class="flex justify-between items-center font-medium">
              <span>折扣金額</span>
              <span class="text-primary"
                >{{ productStore.checkProductTotalPrice.discount }} 元</span
              >
            </p>
            <p class="flex justify-between items-center font-medium mb-7">
              <span class="text-xl ps-1">&emsp;合計</span>
              <span class="text-xl text-primary"
                >NT$ {{ productStore.checkProductTotalPrice.totalPrice }}</span
              >
            </p>
            <button @click="fetchAddOreder" class="btn btn-dark py-2 w-full">送出訂單</button>
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
          <form v-if="isCreate === 'create'" class="space-y-3" action="#">
            <div class="relative">
              <img
                class="object-cover w-full h-[184px] border-b-2 border-textself"
                :src="productCard.photoUrl"
                :alt="productCard.productName"
              />
              <p
                class="bg-neutralself-400 text-white rounded px-2 py-1 text-sm font-normal absolute top-36 left-5"
              >
                {{ productCard.productsType.productsTypeName }}
              </p>
              <div class="transition-all duration-500 bg-white p-6">
                <h2 class="text-2xl font-medium mb-1">{{ productCard.productName }}</h2>
                <h3 class="text-neutralself-100 text-sm font-light mb-3">
                  {{ productCard.description }}
                </h3>
                <div class="flex justify-between items-center">
                  <p class="text-[32px] font-bold">${{ productCard.originalPrice }}</p>
                  <div class="flex flex-col items-end">
                    <p v-if="productCard.amountStatus === 'safe'" class="font-normal">
                      <span class="text-neutralself-200">剩餘</span>
                      {{ `&emsp;${productCard.inStockAmount}份` }}
                    </p>
                    <p
                      v-else-if="productCard.amountStatus === 'danger'"
                      class="flex items-center text-primary-light font-normal"
                    >
                      <img src="@/assets/img/IconDanger.png" class="me-3" alt="Img_IconDanger" />
                      <span>剩餘</span>
                      {{ `&emsp;${productCard.inStockAmount}份` }}
                    </p>
                    <p v-else-if="productCard.amountStatus === 'zero'" class="font-normal">
                      <span class="text-neutralself-200">剩餘</span>
                      {{ `&emsp;${productCard.inStockAmount}份` }}
                    </p>
                    <p class="font-normal">
                      <span class="text-neutralself-200">製作時間</span>
                      {{ `&emsp;${productCard.productionTime}分` }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-3">
              <div class="flex">
                <button
                  @click="minusProductCount"
                  :disabled="productCard.qty <= 1"
                  type="button"
                  class="form-qty border-r-0 rounded-l-lg"
                >
                  －
                </button>
                <input
                  type="number"
                  id="form_qty"
                  class="form-input flex-1 rounded-none rounded-x-lg"
                  placeholder="1"
                  required
                  min="1"
                  :max="productCard.inStockAmount"
                  v-model.number="productCard.qty"
                />
                <button
                  @click="plusProductCount"
                  :disabled="productCard.qty >= productCard.inStockAmount"
                  type="button"
                  class="form-qty border-l-0 rounded-r-lg"
                >
                  +
                </button>
              </div>
              <p class="text-sm text-primary-light mt-2">{{ errors.qty }}</p>
            </div>
            <div class="px-3">
              <textarea
                id="form_textarea"
                rows="4"
                class="form-input"
                placeholder="請輸入客製化內容，例如：飲料去冰、加料"
                v-model.trim="productCard.note"
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
          <form v-else-if="isCreate === 'update'" class="space-y-3" action="#">
            <div class="relative">
              <img
                class="object-cover w-full h-[184px] border-b-2 border-textself"
                :src="productCard.photoUrl"
                alt="ImgProduct"
              />
              <p
                class="bg-neutralself-400 text-white rounded px-2 py-1 text-sm font-normal absolute top-36 left-5"
              >
                {{ productCard.productsType.productsTypeName }}
              </p>
              <div class="transition-all duration-500 bg-white p-6">
                <h2 class="text-2xl font-medium mb-1">{{ productCard.productName }}</h2>
                <h3 class="text-neutralself-100 text-sm font-light mb-3">
                  {{ productCard.description }}
                </h3>
                <div class="flex justify-between items-center">
                  <p class="text-[32px] font-bold">${{ productCard.originalPrice }}</p>
                  <div class="flex flex-col items-end">
                    <p v-if="productCard.amountStatus === 'safe'" class="font-normal">
                      <span class="text-neutralself-200">剩餘</span>
                      {{ `&emsp;${productCard.inStockAmount}份` }}
                    </p>
                    <p
                      v-else-if="productCard.amountStatus === 'danger'"
                      class="flex items-center text-primary-light font-normal"
                    >
                      <img src="@/assets/img/IconDanger.png" class="me-3" alt="Img_IconDanger" />
                      <span>剩餘</span>
                      {{ `&emsp;${productCard.inStockAmount}份` }}
                    </p>
                    <p v-else-if="productCard.amountStatus === 'zero'" class="font-normal">
                      <span class="text-neutralself-200">剩餘</span>
                      {{ `&emsp;${productCard.inStockAmount}份` }}
                    </p>
                    <p class="font-normal">
                      <span class="text-neutralself-200">製作時間</span>
                      {{ `&emsp;${productCard.productionTime}分` }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-3">
              <div class="flex">
                <button
                  @click.prevent="minusProductCount"
                  :disabled="productCard.qty <= 1"
                  type="button"
                  class="form-qty border-r-0 rounded-l-lg"
                >
                  －
                </button>
                <input
                  type="number"
                  id="form_qty"
                  class="form-input flex-1 rounded-none rounded-x-lg"
                  placeholder="1"
                  required
                  min="0"
                  :max="productCard.inStockAmount"
                  v-model.number="productCard.qty"
                />
                <button
                  @click.prevent="plusProductCount"
                  type="button"
                  class="form-qty border-l-0 rounded-r-lg"
                  :disabled="productCard.qty >= productCard.inStockAmount"
                >
                  ＋
                </button>
              </div>
              <p class="text-sm text-primary-light mt-2">{{ errors.qty }}</p>
            </div>
            <div class="px-3">
              <textarea
                id="form_textarea"
                rows="4"
                class="form-input"
                placeholder="請輸入客製化內容，例如：飲料去冰、加料"
                v-model.trim="productCard.note"
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
          <form v-else-if="isCreate === 'delete'" class="space-y-3 p-3" action="#">
            <h3 class="text-xl font-medium text-neutral-400">
              請確認是否刪除
              <span class="text-primary-light">{{ productCard.productName }}</span> ?
            </h3>
            <!-- send_btn -->
            <button
              @click.prevent="removeTempProduct(productCard)"
              type="submit"
              class="w-full btn btn-dark"
            >
              確認刪除
            </button>
          </form>
          <form v-else-if="isCreate === 'readMember'" class="space-y-3 p-3" action="#">
            <div>
              <label for="form_tel" class="block mb-2 font-medium">電話</label>
              <input
                type="tel"
                id="form_tel"
                class="block form-input p-3"
                placeholder="0912000000"
                v-model="searchForm.phone"
              />
            </div>
            <div class="bg-bgself-light rounded-xl p-4">
              <h3 class="mb-2 font-medium">查詢結果</h3>
              <p v-if="productStore.memberList.length === 0" class="text-primary-light">
                沒有符合的會員資料
              </p>
              <div
                v-else
                class="flex items-center"
                v-for="member in productStore.memberList"
                :key="member.number"
              >
                <input
                  checked
                  id="form_readmember_radio"
                  type="radio"
                  name="form-radio"
                  class="form-radio"
                />
                <label for="form_readmember_radio" class="ml-2 text-xl font-medium">{{
                  member.name
                }}</label>
              </div>
            </div>
            <!-- send_btn -->
            <div class="flex">
              <button type="submit" class="w-full btn btn-dark" @click.prevent="getMembers">
                查詢
              </button>
            </div>
          </form>
          <form v-else-if="isCreate === 'createMember'" class="space-y-3 p-3" action="#">
            <div>
              <label for="form_name" class="block mb-2 font-medium">姓名</label>
              <input
                type="text"
                name="name"
                id="form_name"
                class="form-input"
                placeholder="name"
                v-model.trim="memberForm.name"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.name }}</p>
            </div>
            <div>
              <label for="form_tel" class="block mb-2 font-medium">電話</label>
              <input
                type="tel"
                name="phone"
                id="form_tel"
                class="form-input"
                placeholder="0912345678"
                v-model="memberForm.phone"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.phone }}</p>
            </div>
            <!-- send_btn -->
            <div class="flex">
              <button type="submit" class="w-full ml-1 btn btn-dark" @click.prevent="postMember">
                確認新增
              </button>
            </div>
          </form>
          <form
            v-else-if="isCreate === 'createActivity'"
            class="overflow-y-auto h-96 space-y-3 p-3"
            action="#"
          >
            <ul class="flex flex-col">
              <li class="mb-3" v-for="coupon in productStore.couponList" :key="coupon._id">
                <div class="flex items-center mb-3">
                  <input
                    :id="coupon._id"
                    type="radio"
                    :value="coupon.couponNo"
                    v-model="orderProductTotalPrice.couponNo"
                    name="form-radio"
                    class="form-radio"
                  />
                  <label :for="coupon._id" class="ml-2 text-xl font-medium">{{
                    coupon.couponName
                  }}</label>
                </div>
                <div class="bg-bgself-light rounded-xl p-4">
                  <h3 class="mb-2 font-medium">優惠內容</h3>
                  <p class="text-sm mt-2">
                    優惠代碼：<span class="text-secondary-dark">{{ coupon.couponCode }}</span>
                  </p>
                  <p class="text-sm mt-2">
                    折扣比例：<span class="text-primary-dark">{{ coupon.discount }}%</span>
                  </p>
                </div>
              </li>
            </ul>
            <!-- btn -->
            <div class="flex p-3">
              <button
                @click="orderProductTotalPrice.couponNo = ''"
                type="button"
                class="w-full btn btn-dark"
              >
                取消優惠
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </Modal>
</template>
<style scoped>
.tabbar-active {
  @apply bg-bgself-light;
}
</style>
