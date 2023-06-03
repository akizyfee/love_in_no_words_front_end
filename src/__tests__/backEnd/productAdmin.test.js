import { test, describe, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProductAdminStore } from '@/stores/backEnd/productAdmin'

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
  const getProducts = axios.get.mockReturnValue({
    data:
    [
      {
        _id: '6460f530d4b0dedd1aac045c',
        productsType: 13,
        productsTypeName: '蛋糕',
        createdAt: '2023-05-14T14:50:24.755Z'
      }
    ]
  })

  beforeEach(() => {
    setActivePinia(createPinia())
  })
  test('取得產品分類列表', async () => {
    const productAdminStore = useProductAdminStore()
    await productAdminStore.fetchGetDessertTypeList()
    expect(productAdminStore.dessertTypeList).toBeDefined()
  })
  test('Get 方法有被呼叫一次', () => {
    expect(getProducts).toHaveBeenCalledTimes(1)
  })
})
