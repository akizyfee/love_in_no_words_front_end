import { test, describe, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSeatStore } from '@/stores/frontEnd/seatView'

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

describe('SeatView', () => {
  const getSeatList = axios.get.mockReturnValue({
    data: {
      tables:
      [
        {
          tableNo: 9,
          tableName: 1,
          seats: 2,
          isWindowSeat: true,
          status: '未使用'
        },
        {
          tableNo: 27,
          tableName: 3,
          seats: 7,
          isWindowSeat: false,
          status: '使用中'
        },
        {
          tableNo: 19,
          tableName: 4,
          seats: 1,
          isWindowSeat: false,
          status: '已預約'
        }
      ]
    }
  })

  beforeEach(() => {
    setActivePinia(createPinia())
  })
  test('查詢座位現況', async () => {
    const searchForm = {
      status: '',
      reservationDate: '',
      reservationTime: '',
      tableNo: 0
    }
    const seatViewStore = useSeatStore()
    await seatViewStore.searchSeats(searchForm)
    expect(seatViewStore.seatList).toBeDefined()
  })
  test('Get 方法有被呼叫一次', () => {
    expect(getSeatList).toHaveBeenCalledTimes(1)
  })
})
