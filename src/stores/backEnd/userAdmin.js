import { ref } from 'vue'
import { defineStore } from 'pinia'
import { catchError } from '@/utils/catchError'
import { successAlert } from '@/plugins/toast'
import { getAdminUser, addAdminUser, editAdminUser, deleteAdminUser } from '@/apis/user'
import { useLoadingStore } from '@/stores/TheLoading'

export const useUserAdminStore = defineStore('userAdminData', () => {
  const loding = useLoadingStore()

  /**
   * 載入新資料
   */
  const tempUserList = ref([])
  const prePage = ref()

  const LoadNewFile = catchError(async (currentPage) => {
    loding.isLoading = true
    const { data } = await getAdminUser(currentPage)
    prePage.value = data.meta?.pagination.nextPage
    tempUserList.value = data.usersList
    tempUserList.value.forEach((item) => {
      userList.value.push(item)
    })
    loding.isLoading = false
  })

  /**
 * 設置使用者列表
 */
  const userList = ref([])

  const fetchUser = catchError(async (currentPage) => {
    loding.isLoading = true
    const { data } = await getAdminUser(currentPage)
    prePage.value = data.meta?.pagination.nextPage
    userList.value = data.usersList
    loding.isLoading = false
  })

  /**
 * 新增使用者
 */
  const fetchAddUser = catchError(async (userProfile) => {
    const { message } = await addAdminUser(userProfile)
    successAlert(message)
    fetchUser(1)
  })

  /**
 * 修改使用者
 */
  const fetcheditUser = catchError(async (userProfile) => {
    const Id = userProfile._id
    const { message } = await editAdminUser(Id, userProfile)
    successAlert(message)
    fetchUser(1)
  })

  /**
 * 刪除使用者
 */
  const fetchDeleteUser = catchError(async (userProfile) => {
    const Id = userProfile._id
    const TitleNo = userProfile.titleNo
    const { message } = await deleteAdminUser(Id, TitleNo)
    successAlert(message)
    fetchUser(1)
  })

  return { userList, prePage, LoadNewFile, fetchUser, fetchAddUser, fetcheditUser, fetchDeleteUser }
})
