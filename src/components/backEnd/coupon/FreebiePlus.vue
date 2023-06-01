<script setup>
import Modal from '@/components/TheModal.vue'
import { ref, nextTick, onMounted, computed } from 'vue'
import { getAdminFreebiePlus, addAdminFreebiePlus, deleteAdminFreebiePlus } from '@/apis/coupon'
import { warningAlert, successAlert } from '@/plugins/toast'
import { catchError } from '@/utils/catchError'
import { useForm } from 'vee-validate'
import { errorsCouponSchema } from '@/utils/formValidate'

/**
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

onMounted(() => {
  getFreebiePlus()
})

/**
 * VeeValidate 套件
 */
const { errors, useFieldModel } = useForm({
  validationSchema: errorsCouponSchema
})
const freebiePlusForm = ref({
  list: [],
  discount: useFieldModel('discount')
})
const freebiePlusCouponNoVal = ref('')

/**
 * 新增、刪除 A+B
 **/
const typeList = ref([])
const chooseList = ref([])
const unChooseList = computed(() => typeList.value.filter((type) => type.isChoose === false))
const addTypeList = catchError(async (type) => {
  // 新增
  if (chooseList.value.length >= 2) {
    warningAlert('無法加入所選擇的分類，原因是最多兩種不重複的分類')
    return
  } else {
    freebiePlusForm.value.list.push(type.productsType)
    chooseList.value.push(type)
  }
  typeList.value.forEach((item) => {
    if (type.productsType === item.productsType) {
      item.isChoose = true
    }
  })
})
const delTypeList = catchError(async (type) => {
  typeList.value.forEach((item) => {
    if (type.productsType === item.productsType) {
      item.isChoose = false
    }
  })
  const findFreebiePlusSame = freebiePlusForm.value.list.findIndex(
    (item) => type.productsType === item.productsType
  )
  const findChooseListSame = chooseList.value.findIndex(
    (item) => type.productsType === item.productsType
  )
  freebiePlusForm.value.list.splice(findFreebiePlusSame, 1)
  chooseList.value.splice(findChooseListSame, 1)
})

/**
 * 新增 A+B 活動
 **/
const postFreebiePlus = catchError(async () => {
  const { message } = await addAdminFreebiePlus(freebiePlusForm.value)
  handleModalClose()
  successAlert(message)
  getFreebiePlus()
})

/**
 * 刪除 A+B 活動
 **/
const productsTypeAName = ref('')
const productsTypeBName = ref('')
const delFreebiePlus = catchError(async () => {
  const { message } = await deleteAdminFreebiePlus(freebiePlusCouponNoVal.value)
  handleModalClose()
  successAlert(message)
  getFreebiePlus()
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
    if (isCreate.value === 'create') {
      const { list, availableList } = item
      if (list.length !== 0) {
        if (
          Object.keys(list[0]).includes('productsTypeA') &&
          Object.keys(list[0]).includes('productsTypeB')
        ) {
          list.forEach((item) => {
            typeList.value.push(
              {
                productsType: item.productsTypeA.productsType,
                productsTypeName: item.productsTypeA.productsTypeName,
                isChoose: true
              },
              {
                productsType: item.productsTypeB.productsType,
                productsTypeName: item.productsTypeB.productsTypeName,
                isChoose: true
              }
            )
          })
        }
      }
      if (availableList.length !== 0) {
        availableList.forEach((item) => {
          typeList.value.push({
            productsType: item.productsType,
            productsTypeName: item.productsTypeName,
            isChoose: false
          })
        })
      }
    }
    if (isCreate.value === 'delete') {
      const { couponNo, productsTypeA, productsTypeB } = item
      productsTypeAName.value = productsTypeA.productsTypeName
      productsTypeBName.value = productsTypeB.productsTypeName
      freebiePlusCouponNoVal.value = couponNo
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
      typeList.value.length = 0
      freebiePlusForm.value.list.length = 0
      freebiePlusForm.value.discount = 0
    }
  })
}
</script>
<template>
  <div class="flex justify-end my-6">
    <button
      @click="handleModalOpen('create', freebiePlusList)"
      class="btn btn-dark whitespace-nowrap"
    >
      新增 A + B 優惠活動
    </button>
  </div>
  <!-- table -->
  <section class="overflow-auto bg-bgself-light rounded-xl p-6">
    <table class="w-full text-center">
      <thead class="text-xl font-medium text-secondary-light bg-textself">
        <tr class="border-b-2 border-black">
          <th class="py-3">分類名稱</th>
          <th class="py-3">優惠代碼</th>
          <th class="py-3">折扣比例</th>
          <th class="py-3"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b-2 border-black" v-for="item in freebiePlusList.list" :key="item._id">
          <td class="py-3 text-center">
            {{ item.productsTypeA.productsTypeName }} + {{ item.productsTypeB.productsTypeName }}
          </td>
          <td class="py-3 text-center">{{ item.couponNo }}</td>
          <td class="py-3 text-center">{{ item.discount }}%</td>
          <td class="flex justify-end">
            <button
              @click="handleModalOpen('delete', item)"
              class="btn btn-outline-dark w-auto mx-1 my-2"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  <Modal ref="childComponentRef">
    <section class="relative w-full h-full max-w-2xl md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white border-2 border-textself rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-center justify-end border-b-2 border-textself p-3 rounded-t">
          <h2 v-if="isCreate === 'create'" class="text-xl font-medium">新增 A + B 優惠活動</h2>
          <h2 v-else-if="isCreate === 'delete'" class="text-xl font-medium">刪除 A + B 優惠活動</h2>
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
          <form v-if="isCreate === 'create'" class="space-y-3" action="#">
            <div>
              <label for="form_discount" class="block mb-2 font-medium">折扣比例 </label>
              <input
                type="number"
                name="discount"
                id="form_discount"
                class="form-input"
                placeholder="請輸入折扣比例"
                v-model.number="freebiePlusForm.discount"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.discount }}</p>
            </div>
            <!-- tag -->
            <section>
              <p class="font-medium mb-2">可選擇的分類</p>
              <div class="flex flex-wrap">
                <button
                  type="submit"
                  class="btn btn-primary font-medium my-2 mr-2 px-3 py-1 rounded"
                  v-for="type in unChooseList"
                  :key="type.productsType"
                  @click.prevent="addTypeList(type)"
                >
                  {{ type.productsTypeName }}
                </button>
              </div>
            </section>
            <!-- tag checked -->
            <section>
              <p class="font-medium mb-2">
                目前選擇的分類 (必須兩種不重複的分類、點擊黃色按鈕，即刻刪除該分類)
              </p>
              <div class="flex flex-wrap">
                <button
                  type="submit"
                  class="btn btn-secondary font-medium my-2 mr-2 px-3 py-1 rounded"
                  v-for="type in chooseList"
                  :key="type.productsType"
                  @click.prevent="delTypeList(type)"
                >
                  {{ type.productsTypeName }}
                </button>
              </div>
            </section>
            <!-- send_btn -->
            <button type="submit" class="w-full btn btn-dark" @click.prevent="postFreebiePlus">
              確定新增
            </button>
          </form>
          <form v-else-if="isCreate === 'delete'" class="space-y-3" action="#">
            <h3 class="text-xl font-medium text-neutral-400">
              請確認是否刪除
                <span class="text-primary-light">
                  {{ productsTypeAName }} +
                  {{ productsTypeBName }}</span>
                優惠活動?
            </h3>
            <!-- send_btn -->
            <button type="submit" class="w-full btn btn-dark" @click.prevent="delFreebiePlus">
              確認刪除
            </button>
          </form>
        </div>
      </div>
    </section>
  </Modal>
</template>
<style scoped>
.tabbar-active {
  @apply text-primary-light;
}
</style>
