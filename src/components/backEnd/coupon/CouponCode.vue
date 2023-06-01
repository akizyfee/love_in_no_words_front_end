<script setup>
import Modal from '@/components/TheModal.vue'
import { ref, nextTick, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { errorsCouponSchema } from '@/utils/formValidate'

import { useCouponAdminStore } from '@/stores/backEnd/couponAdmin'
const couponAdminStore = useCouponAdminStore()

/**
 * 取得優惠碼活動
 **/
onMounted(() => {
  couponAdminStore.getCoupon()
})

/**
 * VeeValidate 套件
 */
const { errors, useFieldModel } = useForm({
  validationSchema: errorsCouponSchema
})

const couponForm = ref({
  couponName: useFieldModel('couponName'),
  couponCode: useFieldModel('couponCode'),
  discount: useFieldModel('discount'),
  isDisabled: false
})

const couponNoVal = ref('')

/**
 * 新增優惠碼活動
 **/
const postCoupon = () => {
  couponAdminStore.postCoupon(couponForm.value)
  handleModalClose()
}

/**
 * 修改優惠碼活動
 **/
const patchCoupon = () => {
  couponAdminStore.patchCoupon(couponNoVal.value, couponForm.value)
  handleModalClose()
}

/**
 * 刪除優惠碼活動
 **/
const delCoupon = () => {
  couponAdminStore.delCoupon(couponNoVal.value)
  handleModalClose()
}

/*
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
    if (isCreate.value === 'update') {
      const { couponNo, couponName, couponCode, discount, isDisabled } = item
      couponForm.value.couponName = couponName
      couponForm.value.couponCode = couponCode
      couponForm.value.discount = discount
      couponForm.value.isDisabled = isDisabled
      couponNoVal.value = couponNo
    }
    if (isCreate.value === 'delete') {
      const { couponNo, couponName } = item
      couponForm.value.couponName = couponName
      couponNoVal.value = couponNo
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
      couponForm.value.couponName = ''
      couponForm.value.couponCode = ''
      couponForm.value.discount = 0
    }
  })
}
</script>
<template>
  <div class="flex justify-end my-6">
    <button @click="handleModalOpen('create')" class="btn btn-dark whitespace-nowrap">
      新增優惠碼活動
    </button>
  </div>
  <!-- table -->
  <section class="overflow-auto bg-bgself-light rounded-xl p-6">
    <table class="w-full text-center">
      <thead class="text-xl font-medium text-secondary-light bg-textself">
        <tr class="border-b-2 border-textself">
          <th class="py-3">優惠名稱</th>
          <th class="py-3">優惠代碼</th>
          <th class="py-3">折扣比例</th>
          <th class="py-3">停用狀態</th>
          <th class="py-3"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b-2 border-textself" v-for="coupon in couponAdminStore.couponList" :key="coupon._id">
          <td class="py-3">{{ coupon.couponName }}</td>
          <td class="py-3">{{ coupon.couponCode }}</td>
          <td class="py-3">{{ coupon.discount }}%</td>
          <td class="py-3">{{ coupon.isDisabled ? '已停用' : '已啟用' }}</td>
          <td class="flex justify-end">
            <button
              @click="handleModalOpen('update', coupon)"
              class="btn btn-outline-dark w-auto mx-1 my-2"
            >
              修改
            </button>
            <button
              @click="handleModalOpen('delete', coupon)"
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
    <section class="relative w-full h-full max-w-md md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white border-2 border-textself rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-center justify-end border-b-2 border-textself p-3 rounded-t">
          <h2 v-if="isCreate === 'create'" class="text-xl font-medium">新增優惠活動</h2>
          <h2 v-else-if="isCreate === 'update'" class="text-xl font-medium">修改優惠活動</h2>
          <h2 v-else-if="isCreate === 'delete'" class="text-xl font-medium">刪除優惠活動</h2>
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
            <!-- name -->
            <div>
              <label for="form_couponName" class="block mb-2 font-medium">優惠名稱</label>
              <input
                type="text"
                name="couponName"
                id="form_couponName"
                class="form-input"
                placeholder="請輸入優惠名稱"
                v-model.trim="couponForm.couponName"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.couponName }}</p>
            </div>
            <!-- couponCode -->
            <div>
              <label for="form_couponCode" class="block mb-2 font-medium">優惠代碼</label>
              <input
                type="text"
                name="couponCode"
                id="form_couponCode"
                class="form-input"
                placeholder="請輸入優惠代碼"
                v-model.trim="couponForm.couponCode"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.couponCode }}</p>
            </div>
            <!-- couponDiscount -->
            <div>
              <label for="form_couponDiscount " class="block mb-2 font-medium">折扣比例</label>
              <input
                type="number"
                name="discount"
                id="form_couponDiscount"
                class="form-input"
                placeholder="請輸入折扣比例"
                v-model.number="couponForm.discount"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.discount }}</p>
            </div>
            <!-- status -->
            <div>
              <label for="form_couponStatus" class="block mb-2 font-medium">狀態</label>
              <select id="form_couponStatus" class="form-select" v-model="couponForm.isDisabled">
                <option :value="true" selected>停用</option>
                <option :value="false">啟用</option>
              </select>
            </div>
            <!-- send_btn -->
            <button type="submit" class="w-full btn btn-dark" @click.prevent="postCoupon">
              確定新增
            </button>
          </form>
          <form v-else-if="isCreate === 'update'" class="space-y-3" action="#">
            <!-- name -->
            <div>
              <label for="form_couponName" class="block mb-2 font-medium">優惠名稱 </label>
              <input
                type="text"
                name="couponName"
                id="form_couponName"
                class="form-input"
                placeholder="請輸入優惠名稱"
                v-model.trim="couponForm.couponName"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.couponName }}</p>
            </div>
            <!-- couponCode -->
            <div>
              <label for="form_couponCode" class="block mb-2 font-medium">優惠代碼 </label>
              <input
                type="text"
                name="couponCode"
                id="form_couponCode"
                class="form-input"
                placeholder="請輸入優惠代碼"
                v-model.trim="couponForm.couponCode"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.couponCode }}</p>
            </div>
            <!-- couponDiscount -->
            <div>
              <label for="form_couponDiscount " class="block mb-2 font-medium">折扣比例 </label>
              <input
                type="number"
                name="discount"
                id="form_couponDiscount"
                class="form-input"
                placeholder="請輸入折扣比例"
                v-model.number="couponForm.discount"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.discount }}</p>
            </div>
            <!-- status -->
            <div>
              <label for="form_couponStatus" class="block mb-2 font-medium">狀態</label>
              <select id="form_couponStatus" class="form-select" v-model="couponForm.isDisabled">
                <option :value="true" selected>停用</option>
                <option :value="false">啟用</option>
              </select>
            </div>
            <!-- send_btn -->
            <button type="submit" class="w-full btn btn-dark" @click.prevent="patchCoupon">
              確定修改
            </button>
          </form>
          <form v-else-if="isCreate === 'delete'" class="space-y-3" action="#">
            <h3 class="text-xl font-medium text-neutral-400">
              請確認是否刪除
              <span class="text-primary-light">{{ couponForm.couponName }}</span> 優惠活動?
            </h3>
            <!-- send_btn -->
            <button type="submit" class="w-full btn btn-dark" @click.prevent="delCoupon">
              確認刪除
            </button>
          </form>
        </div>
      </div>
    </section>
  </Modal>
</template>
