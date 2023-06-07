import { test, describe, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useOrderStore } from '@/stores/frontEnd/orderView'

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

describe('OrderView', () => {
  const getOrders = axios.get.mockReturnValue({
    data: {
      ordersList:
      [
        {
          _id: '646349bd7b6adbb593b143ad',
          orderNo: '20230516171541',
          tableName: 1,
          createdAt: '2023-05-16T09:15:41.174Z',
          isDisabled: false
        },
        {
          _id: '64657f65f0712d2d46ff1cde',
          orderNo: '20230429012557',
          tableName: 3,
          createdAt: '2023-04-29T01:25:57.000Z',
          isDisabled: false
        }
      ]
    }
  })

  beforeEach(() => {
    setActivePinia(createPinia())
  })
  test('查詢訂單功能', async () => {
    const searchForm = {
      orderStatus: '',
      date: ''
    }
    const orderViewStore = useOrderStore()
    await orderViewStore.getOrders(searchForm, 1)
    expect(orderViewStore.orderList).toBeDefined()
  })
  test('Get 方法有被呼叫一次', () => {
    expect(getOrders).toHaveBeenCalledTimes(1)
  })
})
