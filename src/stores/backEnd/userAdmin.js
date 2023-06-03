import { ref } from 'vue'
import { defineStore } from 'pinia'
import { catchError } from '@/utils/catchError'
import { successAlert } from '@/plugins/toast'
import { getAdminUser, addAdminUser, editAdminUser, deleteAdminUser } from '@/apis/user'

export const useUserAdminStore = defineStore('userAdminData', () => {
  /**
 * 設置使用者列表
 */
  const userList = ref([])

  const fetchUser = catchError(async () => {
    const currentPage = 1
    const { data } = await getAdminUser(currentPage)
    userList.value = data.usersList
  })

  /**
 * 新增使用者
 */
  const fetchAddUser = catchError(async (userProfile) => {
    const { message } = await addAdminUser(userProfile)
    successAlert(message)
    fetchUser()
  })

  /**
 * 修改使用者
 */
  const fetcheditUser = catchError(async (userProfile) => {
    const Id = userProfile._id
    const { message } = await editAdminUser(Id, userProfile)
    successAlert(message)
    fetchUser()
  })

  /**
 * 刪除使用者
 */
  const fetchDeleteUser = catchError(async (userProfile) => {
    const Id = userProfile._id
    const TitleNo = userProfile.titleNo
    const { message } = await deleteAdminUser(Id, TitleNo)
    successAlert(message)
    fetchUser()
  })

  return { userList, fetchUser, fetchAddUser, fetcheditUser, fetchDeleteUser }
})
