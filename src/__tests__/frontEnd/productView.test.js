import { test, describe, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useProductStore } from '@/stores/frontEnd/productView'

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

describe('ProductView', () => {
  const getProductTypeList = axios.get.mockReturnValue({
    data:
      [
        {
          _id: '6460f530d4b0dedd1aac045c',
          productsType: 13,
          productsTypeName: '蛋糕',
          createdAt: '2023-05-14T14:50:24.755Z'
        },
        {
          _id: '64770bedf90d43076469e647',
          productsType: 22,
          productsTypeName: '飲料',
          createdAt: '2023-05-31T08:57:17.984Z'
        },
        {
          _id: '64773f402d176560823e1a6f',
          productsType: 24,
          productsTypeName: '鬆餅',
          createdAt: '2023-05-31T12:36:16.436Z'
        },
        {
          _id: '6477f205506c4f3dc0105d83',
          productsType: 25,
          productsTypeName: '馬卡龍',
          createdAt: '2023-06-01T01:19:01.773Z'
        }
      ]
  })

  beforeEach(() => {
    setActivePinia(createPinia())
  })
  test('取得商品種類列表', async () => {
    const productViewStore = useProductStore()
    await productViewStore.fetchAllDessertType()
    expect(productViewStore.typeList).toBeDefined()
  })
  test('Get 方法有被呼叫 2 次', () => {
    expect(getProductTypeList).toHaveBeenCalledTimes(2)
  })
})
