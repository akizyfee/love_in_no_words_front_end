<script setup>
import SiderBar from '@/components/backEnd/SideBar.vue'
import Modal from '@/components/TheModal.vue'
import { ref, nextTick, onMounted, reactive } from 'vue'
import { useForm } from 'vee-validate'
import { errorsFormSchema } from '@/utils/formValidate'

import { useUserAdminStore } from '@/stores/backEnd/userAdmin'
const userAdminStore = useUserAdminStore()

/**
 * 分頁
 */
const lastPageIndex = ref(1)

const fetchLoadNewFile = () => {
  lastPageIndex.value++
  userAdminStore.LoadNewFile(lastPageIndex.value)
}

/**
 * 設置使用者列表
 */
onMounted(() => {
  userAdminStore.fetchUser(lastPageIndex.value)
})

/**
 * 表單和 validate
 */
const { errors, useFieldModel } = useForm({
  validationSchema: errorsFormSchema
})

const initUserProfile = reactive({
  name: '',
  phone: '',
  password: '',
  email: ''
})

const userProfile = reactive({
  _id: '',
  name: useFieldModel('name'),
  phone: useFieldModel('phone'),
  titleNo: '1',
  isDisabled: false,
  password: useFieldModel('password'),
  email: useFieldModel('email')
})

/**
 * 新增使用者
 */

const fetchAddUser = () => {
  userAdminStore.fetchAddUser(userProfile)
  handleModalClose()
}

/**
 * 修改使用者
 */
const fetcheditUser = () => {
  userAdminStore.fetcheditUser(userProfile)
  handleModalClose()
}

/**
 * 刪除使用者
 */
const fetchDeleteUser = () => {
  userAdminStore.fetchDeleteUser(userProfile)
  handleModalClose()
}

/**
 * modal
 * */
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
      const { _id, name, phone, password, titleNo, isDisabled } = item
      userProfile._id = _id
      userProfile.name = name
      userProfile.phone = phone
      userProfile.titleNo = titleNo
      userProfile.isDisabled = isDisabled
      userProfile.password = password
    }
  })
}
const handleModalClose = () => {
  const childComponent = childComponentRef.value

  nextTick(() => {
    if (childComponent) {
      childComponent.closeModal()
      Object.assign(userProfile, initUserProfile)
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
      <h1 class="flex items-center text-[36px] font-bold">使用者管理</h1>
    </nav>
    <main class="min-h-screen p-6">
      <div class="flex justify-end mb-6">
        <button @click.prevent="handleModalOpen('create')" class="btn btn-dark whitespace-nowrap">
          新增使用者
        </button>
      </div>
      <!-- table -->
      <section class="overflow-auto bg-bgself-light rounded-xl p-6">
        <table class="w-full text-center">
          <thead class="text-xl font-medium text-secondary-light bg-textself">
            <tr class="border-b-2 border-black">
              <th class="py-3">姓名</th>
              <th class="py-3">電話</th>
              <th class="py-3">職位</th>
              <th class="py-3">停用</th>
              <th class="py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="border-b-2 border-black"
              v-for="users in userAdminStore.userList"
              :key="users._id"
            >
              <td class="py-3">{{ users.name }}</td>
              <td class="py-3">{{ users.phone }}</td>
              <td class="py-3">{{ users.title }}</td>
              <th class="py-3">{{ users.isDisabled ? '停用' : '啟用' }}</th>
              <th class="flex justify-end items-center">
                <button
                  @click.prevent="handleModalOpen('update', users)"
                  class="btn btn-outline-dark w-auto mx-1 my-2"
                >
                  修改
                </button>
                <button
                  @click.prevent="handleModalOpen('delete', users)"
                  class="btn btn-outline-dark w-auto mx-1 my-2"
                >
                  刪除
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </section>
      <!-- 載入分頁內容 -->
      <button
        type="button"
        class="w-full btn btn-secondary my-6"
        v-if="userAdminStore.prePage !== null"
        @click="fetchLoadNewFile"
      >
        <span class="text-xl lg:text-[28px] font-medium">點選以載入新資料</span>
      </button>
    </main>
  </div>
  <Modal ref="childComponentRef">
    <section class="relative w-full h-full max-w-md md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white border-2 border-textself rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-center justify-end border-b-2 border-textself p-3 rounded-t">
          <h2 v-if="isCreate === 'create'" class="text-xl font-medium">新增使用者資料</h2>
          <h2 v-else-if="isCreate === 'update'" class="text-xl font-medium">修改使用者資料</h2>
          <h2 v-else-if="isCreate === 'delete'" class="text-xl font-medium">刪除使用者資料</h2>
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
              <label for="name" class="block mb-2 font-medium">姓名</label>
              <input
                type="text"
                name="name"
                id="name"
                class="form-input"
                v-model.trim="userProfile.name"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.name }}</p>
            </div>
            <div>
              <label for="phone" class="block mb-2 font-medium">電話</label>
              <input
                type="text"
                name="phone"
                id="phone"
                class="form-input"
                v-model="userProfile.phone"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.phone }}</p>
            </div>
            <div>
              <label for="job" class="block mb-2 font-medium">職位</label>
              <select id="job" class="form-select" v-model="userProfile.titleNo">
                <option :value="1" selected>店長</option>
                <option :value="2">店員</option>
                <option :value="3">廚師</option>
                <option :value="4">會員</option>
              </select>
            </div>
            <div v-if="userProfile.titleNo === 1">
              <label for="email" class="block mb-2 font-medium">信箱</label>
              <input
                type="email"
                name="email"
                id="email"
                class="form-input"
                v-model="userProfile.email"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.email }}</p>
            </div>
            <div v-if="userProfile.titleNo !== 4">
              <label for="password" class="block mb-2 font-medium">密碼</label>
              <input
                type="password"
                name="password"
                id="password"
                class="form-input"
                v-model="userProfile.password"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.password }}</p>
            </div>
            <!-- status -->
            <div>
              <label for="form_memberStatus" class="block mb-2 font-medium">狀態</label>
              <select id="form_memberStatus" class="form-select" v-model="userProfile.isDisabled">
                <option :value="true" selected>停用</option>
                <option :value="false">啟用</option>
              </select>
            </div>
            <!-- send_btn -->
            <button @click.prevent="fetchAddUser" type="submit" class="w-full btn btn-dark">
              確認新增
            </button>
          </form>
          <form v-else-if="isCreate === 'update'" class="space-y-3 p-3" action="#">
            <div>
              <label for="name" class="block mb-2 font-medium">姓名</label>
              <input
                type="text"
                name="name"
                id="name"
                class="form-input"
                v-model.trim="userProfile.name"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.name }}</p>
            </div>
            <div>
              <label for="phone" class="block mb-2 font-medium">電話</label>
              <input
                type="text"
                name="phone"
                id="phone"
                class="form-input"
                v-model="userProfile.phone"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.phone }}</p>
            </div>
            <div>
              <label for="job" class="block mb-2 font-medium">職位</label>
              <select id="job" class="form-select" v-model="userProfile.titleNo">
                <option :value="1">店長</option>
                <option :value="2">店員</option>
                <option :value="3">廚師</option>
                <option :value="4">會員</option>
              </select>
            </div>
            <div v-if="userProfile.titleNo === 1">
              <label for="email" class="block mb-2 font-medium">信箱</label>
              <input
                type="email"
                name="email"
                id="email"
                class="form-input"
                v-model="userProfile.email"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.email }}</p>
            </div>
            <div v-if="userProfile.titleNo !== 4">
              <label for="password" class="block mb-2 font-medium">密碼</label>
              <input
                type="password"
                name="password"
                id="password"
                class="form-input"
                v-model="userProfile.password"
                required
              />
              <p class="text-sm text-primary-light mt-2">{{ errors.password }}</p>
            </div>
            <!-- status -->
            <div>
              <label for="form_memberStatus" class="block mb-2 font-medium">狀態</label>
              <select id="form_memberStatus" class="form-select" v-model="userProfile.isDisabled">
                <option :value="true" selected>停用</option>
                <option :value="false">啟用</option>
              </select>
            </div>
            <!-- send_btn -->
            <button @click.prevent="fetcheditUser" type="submit" class="w-full btn btn-dark">
              確認修改
            </button>
          </form>
          <form v-else-if="isCreate === 'delete'" class="space-y-3 p-3">
            <p class="text-xl font-medium text-neutral-400">
              是否要刪除
              <span class="text-primary-light">{{ userProfile.name }}</span>
              資料?
            </p>
            <!-- send_btn -->
            <button @click.prevent="fetchDeleteUser" type="submit" class="w-full btn btn-dark">
              確認刪除
            </button>
          </form>
        </div>
      </div>
    </section>
  </Modal>
</template>
