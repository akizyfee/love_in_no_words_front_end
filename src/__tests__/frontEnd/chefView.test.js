import { test, describe, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useChefStore } from '@/stores/frontEnd/chefView'

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

describe('ChefView', () => {
  const getDessertList = axios.get.mockReturnValue({
    data: [
      {
        orderNo: 20230608162427,
        status: '已出餐',
        orderList: [
          {
            productNo: 9,
            productName: '草莓蛋糕',
            qty: 4,
            productionTime: 15,
            productsType: {
              _id: '6460f530d4b0dedd1aac045c',
              productsType: 13,
              productsTypeName: '蛋糕'
            },
            description: '以鬆軟的杏仁海綿蛋糕為基底，配上鮮奶油、鮮甜多汁的當季草莓，酸甜爽口，令人回味無窮',
            couponNo: 'B000000008',
            couponName: 'A+B'
          }
        ],
        totalTime: 60,
        couponNo: 'A000000005',
        couponName: '打卡優惠',
        discount: 80,
        totalPrice: 720
      }
    ]
  })

  beforeEach(() => {
    setActivePinia(createPinia())
  })
  test('取得會員列表', async () => {
    const chefViewStore = useChefStore()
    await chefViewStore.fetchSearchPickUp()
    expect(chefViewStore.pickUpList).toBeDefined()
  })
  test('Get 方法有被呼叫 1 次', () => {
    expect(getDessertList).toHaveBeenCalledTimes(1)
  })
})
