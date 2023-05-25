<script setup>
import SiderBar from '@/components/frontEnd/SideBar.vue'
import Modal from '@/components/TheModal.vue'
import { ref, nextTick, onMounted, watch, reactive } from 'vue'
import { useMemberStore } from '@/stores/frontEnd/memberView'
import { useForm } from 'vee-validate'
import { errorsFormSchema } from '@/utils/formValidate'

const memberStore = useMemberStore()

const searchForm = reactive({
  phone: '',
  page: 1
})

/**
 * 查詢會員功能
 **/

onMounted(() => {
  memberStore.getMembers(searchForm.phone, searchForm.page)
})

watch(
  [() => searchForm.phone, () => searchForm.page],
  () => {
    memberStore.getMembers(searchForm.phone, searchForm.page)
  },
  {
    immediate: true,
    deep: true
  }
)

/**
 * VeeValidate 套件
 */
const { errors, useFieldModel } = useForm({
  validationSchema: errorsFormSchema
})

const memberForm = reactive({
  _id: '',
  name: useFieldModel('name'),
  phone: useFieldModel('phone')
})

/**
 * 新增會員功能
 **/
const postMember = () => {
  memberStore.postMember(memberForm, searchForm)
  handleModalClose()
}

/**
 * 修改會員功能
 **/
const patchMember = () => {
  memberStore.patchMember(memberForm._id, memberForm, searchForm)
  handleModalClose()
}

/**
 * 刪除會員功能
 **/
const delMember = () => {
  memberStore.delMember(memberForm._id, searchForm)
  handleModalClose()
}

/**
 * modal
 **/
const isCreate = ref(false)
const childComponentRef = ref()

const handleModalOpen = (checkisCreate, item) => {
  isCreate.value = checkisCreate
  const childComponent = childComponentRef.value
  nextTick(() => {
    if (childComponent) {
      childComponent.openModal()
    }
    if (isCreate.value === 'update' || isCreate.value === 'delete') {
      const { _id, name, phone } = item
      memberForm._id = _id
      memberForm.name = name
      memberForm.phone = phone
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
      searchForm.phone = ''
      searchForm.page = 1
      memberForm.name = ''
      memberForm.phone = ''
    }
  })
}
</script>

<template>
  <aside class="fixed top-0 left-0 z-40 w-[315px] h-screen">
    <SiderBar />
  </aside>
  <section class="ml-[315px] bg-white">
    <!-- title -->
    <nav class="border-b-2 border-textself p-6">
      <h1 class="flex items-center text-[36px] font-bold">會員資訊</h1>
    </nav>
    <main class="min-h-screen p-6">
      <div class="flex justify-between items-end mb-6">
        <div class="flex flex-col">
          <label for="searchPhone" class="block mb-2 font-medium">電話</label>
          <input
            type="tel"
            id="searchPhone"
            class="block form-input p-3"
            placeholder="0912345678"
            v-model="searchForm.phone"
          />
        </div>
        <button @click="handleModalOpen('create')" class="btn btn-dark whitespace-nowrap">
          新增會員
        </button>
      </div>
      <!-- table -->
      <section class="overflow-auto bg-bgself-light rounded-xl p-5">
        <table class="w-full text-center">
          <thead class="text-xl font-medium text-secondary-light bg-textself">
            <tr class="border-b-2 border-black">
              <th class="py-3">姓名</th>
              <th class="py-3">電話</th>
              <th class="py-3">註冊日期</th>
              <th class="py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b-2 border-black"
              v-for="member in memberStore.memberList"
              :key="member.number"
            >
              <td class="py-3">{{ member.name }}</td>
              <td class="py-3">{{ member.phone }}</td>
              <td class="py-3">{{ member.createdAt }}</td>
              <th class="flex justify-end items-center">
                <button
                  @click="handleModalOpen('update', member)"
                  class="btn btn-outline-dark w-auto mx-1 my-2"
                >
                  修改
                </button>
                <button
                  @click="handleModalOpen('delete', member)"
                  class="btn btn-outline-dark w-auto mx-1 my-2"
                >
                  刪除
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </section>
  <Modal ref="childComponentRef">
    <section class="relative w-full h-full max-w-md md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white border-2 border-textself rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-center justify-end border-b-2 border-textself p-3 rounded-t">
          <p v-if="isCreate === 'create'" class="text-xl font-medium">新增會員資料</p>
          <p v-else-if="isCreate === 'update'" class="text-xl font-medium">修改會員資料</p>
          <p v-else-if="isCreate === 'delete'" class="text-xl font-medium">刪除會員資料</p>
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
          <form v-if="isCreate === 'create'" class="space-y-3 p-3">
            <div>
              <label for="name" class="block mb-2 text-xl font-medium text-gray-900">姓名</label>
              <input
                type="text"
                name="name"
                id="name"
                key="name"
                class="form-input"
                placeholder="name"
                v-model.trim="memberForm.name"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.name }}</p>
            </div>
            <div>
              <label for="phone" class="block mb-2 text-xl font-medium text-gray-900">電話</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                key="phone"
                class="form-input"
                placeholder="0912345678"
                v-model="memberForm.phone"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.phone }}</p>
            </div>
            <!-- send_btn -->
            <button type="submit" class="w-full btn btn-dark" @click.prevent="postMember">
              確認新增
            </button>
          </form>
          <form v-else-if="isCreate === 'update'" class="space-y-3 p-3">
            <div>
              <label for="name" class="block mb-2 text-xl font-medium text-gray-900">姓名</label>
              <input
                type="text"
                name="name"
                id="name"
                key="name"
                class="form-input"
                placeholder="name"
                v-model.trim="memberForm.name"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.name }}</p>
            </div>
            <div>
              <label for="phone" class="block mb-2 text-xl font-medium text-gray-900">電話</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                key="phone"
                class="form-input"
                placeholder="0912345678"
                v-model="memberForm.phone"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.phone }}</p>
            </div>
            <!-- send_btn -->
            <button type="submit" class="w-full btn btn-dark" @click.prevent="patchMember">
              確認修改
            </button>
          </form>
          <form v-else-if="isCreate === 'delete'" class="space-y-3 p-3">
            <div>
              <p class="block mb-2 text-xl font-medium text-gray-900">姓名</p>
              <p>{{ memberForm.name }}</p>
            </div>
            <div>
              <p class="block mb-2 text-xl font-medium text-gray-900">電話</p>
              <p>{{ memberForm.phone }}</p>
            </div>
            <p class="text-xl font-medium text-neutral-400">是否要刪除會員資料?</p>
            <!-- send_btn -->
            <button type="submit" class="w-full btn btn-dark" @click.prevent="delMember">
              確認刪除
            </button>
          </form>
        </div>
      </div>
    </section>
  </Modal>
</template>
