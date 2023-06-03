import { test, describe, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSeatAdminStore } from '@/stores/backEnd/seatAdmin'

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

describe('UserAdmin', () => {
  const getSeats = axios.get.mockReturnValue({
    data: {
      usersList: [
        {
          _id: '6460eb68d1c638b9b291ad28',
          number: 'A000000001',
          name: '我是店長',
          phone: '0912345678',
          email: 'akizyfee@gmail.com',
          titleNo: 1,
          title: '店長',
          createdAt: '2023/05/14',
          isDisabled: false
        }
      ]
    }
  })

  beforeEach(() => {
    setActivePinia(createPinia())
  })
  test('請求使用者列表有成功設置 List', async () => {
    const seatAdminStore = useSeatAdminStore()
    await seatAdminStore.getSeats()
    expect(seatAdminStore.seatList).toBeDefined()
  })
  test('Get 方法有被呼叫一次', () => {
    expect(getSeats).toHaveBeenCalledTimes(1)
  })
})
