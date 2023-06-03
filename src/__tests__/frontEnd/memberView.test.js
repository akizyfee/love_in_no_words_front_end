import { test, describe, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useMemberStore } from '@/stores/frontEnd/memberView'

import axios from 'axios'

vi.mock('axios', () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      put: vi.fn(),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(),
          eject: vi.fn()
        },
        response: {
          use: vi.fn(),
          eject: vi.fn()
        }
      }
    }
  }
})

describe('MemberView', () => {
  const getMemberList = axios.get.mockReturnValue({
    data: {
      membersList: [
        {
          _id: '646a2c1b1d0a520cb6dd37c1',
          name: '會員一百號',
          number: 'B000000100',
          phone: '0910100100',
          createdAt: '2023/01/01',
          isDisabled: false
        },
        {
          _id: '646a2c1b1d0a520cb6dd37c2',
          name: '會員兩百號',
          number: 'B000000200',
          phone: '0920200200',
          createdAt: '2023/02/02',
          isDisabled: true
        }
      ]
    }
  })

  beforeEach(() => {
    setActivePinia(createPinia())
  })
  test('取得會員列表', async () => {
    const memberViewStore = useMemberStore()
    await memberViewStore.getMembers()
    expect(memberViewStore.memberList).toBeDefined()
  })
  test('Get 方法有被呼叫 1 次', () => {
    expect(getMemberList).toHaveBeenCalledTimes(1)
  })
})
