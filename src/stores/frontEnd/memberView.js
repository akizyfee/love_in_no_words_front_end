import { ref } from 'vue'
import { defineStore } from 'pinia'
import { catchError } from '@/utils/catchError'
import { warningAlert, successAlert } from '@/plugins/toast'
import { searchMember, addMember, editMember, deleteMember } from '@/apis/user'
import { useLoadingStore } from '@/stores/TheLoading'

export const useMemberStore = defineStore('memberData', () => {
  const loding = useLoadingStore()

  /**
   * 載入新資料
   */
  const tempMemberList = ref([])
  const prePage = ref()

  const LoadNewFile = catchError(async (phone, currentPage) => {
    loding.isLoading = true
    const { data } = await searchMember(phone, currentPage)
    console.log(data)
    prePage.value = data.meta?.pagination.nextPage
    console.log(prePage.value)
    tempMemberList.value = data.membersList
    tempMemberList.value.forEach((item) => {
      memberList.value.push(item)
    })
    loding.isLoading = false
  })

  /**
   * 查詢會員功能
   **/
  const memberList = ref([])
  const getMembers = catchError(async (phone, page) => {
    loding.isLoading = true
    const { data } = await searchMember(phone, page)
    if (data.membersList.length === 0) {
      warningAlert('沒有符合的會員資料')
      loding.isLoading = false
    }
    memberList.value = data.membersList
    loding.isLoading = false
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

  return { memberList, getMembers, prePage, postMember, patchMember, delMember, LoadNewFile }
})
