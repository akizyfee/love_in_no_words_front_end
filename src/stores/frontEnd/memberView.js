import { ref } from 'vue'
import { defineStore } from 'pinia'
import { catchError } from '@/utils/catchError'
import { warningAlert, successAlert } from '@/plugins/toast'
import { searchMember, addMember, editMember, deleteMember } from '@/apis/user'

export const useMemberStore = defineStore('memberData', () => {
  /**
   * 查詢會員功能
   **/
  const memberList = ref([])
  const getMembers = catchError(async (phone, page) => {
    const { data } = await searchMember(phone, page)
    if (data.membersList.length === 0) {
      warningAlert('沒有符合的會員資料')
    }
    memberList.value = data.membersList
  })

  /**
   * 新增會員功能
   **/
  const postMember = catchError(async (memberForm, searchForm) => {
    const { phone, page } = searchForm
    const { message } = await addMember(memberForm)
    successAlert(message)
    getMembers(phone, page)
  })

  /**
   * 修改會員功能
   **/
  const patchMember = catchError(async (id, memberForm, searchForm) => {
    const { phone, page } = searchForm
    const { message } = await editMember(id, memberForm)
    successAlert(message)
    getMembers(phone, page)
  })

  /**
   * 刪除會員功能
   **/
  const delMember = catchError(async (id, searchForm) => {
    const { phone, page } = searchForm
    const { message } = await deleteMember(id)
    successAlert(message)
    getMembers(phone, page)
  })

  return { memberList, getMembers, postMember, patchMember, delMember }
})
