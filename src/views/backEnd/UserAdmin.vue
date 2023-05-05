<script setup>
import SiderBar from '@/components/backEnd/SideBar.vue'
import Modal from '@/components/TheModal.vue'
import { ref, reactive, nextTick, onMounted } from 'vue'
import { getAdminUser } from '@/apis/user'
import { catchError } from '@/utils/catchError'

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

/**
 * 取得使用者列表
 */
const userList = reactive([])

const fetchUser = catchError(async () => {
  const currentPage = 1
  const { data } = await getAdminUser(currentPage)
  userList.push(...data.usersList)
  console.log(data.usersList)
})

onMounted(() => {
  fetchUser()
})

/**
 * 新增使用者
 */
// const userProfile = reactive({
//   name: '',
//   phone: '',
//   tilteNo: '',
//   isdisabled: false,
//   password: ''
// })

// const fetchAddUser = catchError(async () => {
//   const aa = await addAdminUser(userProfile)
//   console.log('取得資料', aa)
// })

/**
 * 修改使用者
 */
// const editUserProfile = reactive({
//   name: '',
//   phone: '',
//   tilteNo: '',
//   isdisabled: false,
//   password: ''
// })

// const fetcheditUser = catchError(async (uerId) => {
//   const { data } = await editAdminUser(uerId, editUserProfile)
//   console.log('編輯資料', data)
// })

/**
 * 刪除使用者
 */
// const fetchDeleteUser = catchError(async () => {
//   const { data } = await deleteAdminUser()
//   console.log(data)
// })
</script>

<template>
  <aside class="fixed top-0 left-0 z-40 w-[315px] h-screen">
    <SiderBar />
  </aside>
  <div class="ml-[315px]">
    <nav class="bg-white border-b-2 border-textself p-6">
      <h1 class="flex items-center text-[36px] font-bold">使用者管理</h1>
    </nav>
    <main class="bg-secondary-light min-h-screen p-6">
      <div class="flex justify-end mb-6">
        <button @click="handleModalOpen('create')" class="btn btn-dark whitespace-nowrap">新增使用者</button>
      </div>
      <!-- table -->
      <section class="relative overflow-x-auto bg-bgself-light rounded-xl p-6">
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
            <tr class="border-b-2 border-black" v-for="users in userList" :key="users._id">
              <td class="py-3">{{ users.name }}</td>
              <td class="py-3">{{ users.phone }}</td>
              <td class="py-3">店員</td>
              <th class="py-3">停用</th>
              <th class="flex justify-end items-center">
                <button
                  @click="handleModalOpen('update')"
                  class="btn btn-outline-dark w-auto mx-1 my-2"
                >
                  修改
                </button>
                <button
                  @click="handleModalOpen('delete')"
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
  </div>
  <Modal ref="childComponentRef">
    <section class="relative w-full h-full max-w-md md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white border-2 border-textself rounded-lg shadow">
        <!-- Modal header -->
        <div class="flex items-center justify-end border-b-2 border-textself p-3 rounded-t">
          <p v-if="isCreate === 'create'" class="text-xl font-medium">新增使用者資料</p>
          <p v-else-if="isCreate === 'update'" class="text-xl font-medium">修改使用者資料</p>
          <p v-else-if="isCreate === 'delete'" class="text-xl font-medium">刪除使用者資料</p>
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
          <form v-if="isCreate === 'create'" class="space-y-6 p-3">
            <div>
              <label for="name" class="block mb-2 text-xl font-medium text-gray-900">姓名</label>
              <input
                type="text"
                name="name"
                id="name"
                class="form-input"
                placeholder="name"
                v-model="userProfile.name"
                required
              />
            </div>
            <div>
              <label for="phone" class="block mb-2 text-xl font-medium text-gray-900">電話</label>
              <input
                type="text"
                name="phone"
                id="phone"
                class="form-input"
                placeholder="0900456123"
                v-model="userProfile.phone"
                required
              />
            </div>
            <div>
              <label for="job" class="block mb-2 text-xl font-medium text-gray-900">職位</label>
              <input
                type="text"
                name="job"
                id="job"
                class="form-input"
                placeholder="job"
                v-model="userProfile.tilteNo"
                required
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-xl font-medium text-gray-900">密碼</label>
              <input
                type="text"
                name="password"
                id="password"
                class="form-input"
                placeholder="password"
                v-model="userProfile.password"
                required
              />
            </div>
            <!-- send_btn -->
            <section class="flex">
              <button
                @click="handleModalClose()"
                type="button"
                class="w-full mr-3 btn btn-outline-dark"
              >
                取消
              </button>
              <button
                @click="fetchAddUser"
                type="submit"
                class="w-full btn btn-dark"
                >
                確認新增
              </button>
            </section>
          </form>
          <form v-else-if="isCreate === 'update'" class="space-y-6 p-3" action="#">
            <div>
              <label for="name" class="block mb-2 text-xl font-medium text-gray-900">姓名</label>
              <input
                type="text"
                name="name"
                id="name"
                class="form-input"
                placeholder="name"
                v-model="editUserProfile.name"
                required
              />
            </div>
            <div>
              <label for="phone" class="block mb-2 text-xl font-medium text-gray-900">電話</label>
              <input
                type="text"
                name="phone"
                id="phone"
                class="form-input"
                placeholder="0900456123"
                v-model="editUserProfile.phone"
                required
              />
            </div>
            <div>
              <label for="job" class="block mb-2 text-xl font-medium text-gray-900">職位</label>
              <input
                type="text"
                name="job"
                id="job"
                class="form-input"
                placeholder="job"
                v-model="editUserProfile.tilteNo"
                required
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-xl font-medium text-gray-900"
                >密碼</label
              >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="form-input"
                v-model="editUserProfile.password"
                required
              />
            </div>
            <!-- status -->
            <div>
              <label for="form_memberStatus" class="block mb-2 font-medium">狀態</label>
              <select id="form_memberStatus" class="form-select">
                <option value="停用" selected>停用</option>
                <option value="啟用">啟用</option>
              </select>
            </div>
            <!-- time -->
            <!-- <p class="text-xl font-semibold text-gray-900">註冊日期 : 2023/03/10</p> -->
            <!-- send_btn -->
            <section class="flex">
              <button
                @click="handleModalClose()"
                type="button"
                class="w-full mr-3 btn btn-outline-dark"
              >
                取消
              </button>
              <button
                @click="fetcheditUser('644e8d87b5fd478b1335aee0')"
                type="submit"
                class="w-full btn btn-dark"
              >
                確認修改
              </button>
            </section>
          </form>
          <form v-else-if="isCreate === 'delete'" class="space-y-6 p-3">
            <p class="text-xl font-semibold text-gray-900">是否要刪除使用者資料?</p>
            <!-- send_btn -->
            <section class="flex mt-12">
              <button
                @click="handleModalClose()"
                type="button"
                class="w-full mr-3 btn btn-outline-dark"
              >
                取消
              </button>
              <button
                @click="fetchDeleteUser"
                type="submit"
                class="w-full btn btn-dark"
              >
                確認刪除
              </button>
            </section>
          </form>
        </div>
      </div>
    </section>
  </Modal>
</template>
<style scoped></style>
