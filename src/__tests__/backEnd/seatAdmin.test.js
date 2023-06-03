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

describe('SeatAdmin', () => {
  const getSeats = axios.get.mockReturnValue({
    data:
      [
        {
          _id: '6458ff1fdbc8a20949305e8e',
          tableNo: 9,
          tableName: 1,
          seats: 2,
          isWindowSeat: true,
          isDisabled: false,
          createdAt: '2023-05-08T13:54:39.297Z'
        }
      ]
  })

  beforeEach(() => {
    setActivePinia(createPinia())
  })
  test('取得座位列表', async () => {
    const seatAdminStore = useSeatAdminStore()
    await seatAdminStore.getSeats()
    expect(seatAdminStore.seatList).toBeDefined()
  })
  test('Get 方法有被呼叫一次', () => {
    expect(getSeats).toHaveBeenCalledTimes(1)
  })
})
