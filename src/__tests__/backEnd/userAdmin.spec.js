import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, test } from 'vitest'
import { useUserAdminStore } from '@/stores/backEnd/userAdmin'

describe('userAdminStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('fetchUser', () => {
    const userAdminStore = useUserAdminStore()
    userAdminStore.fetchUser()
    expect(userAdminStore.userList).toBeDefined()
    console.log(userAdminStore.userList)
  })
})
