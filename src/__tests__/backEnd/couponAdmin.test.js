import { test, describe, expect, vi, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCouponAdminStore } from '@/stores/backEnd/couponAdmin'

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
  const getCouponLists = axios.get.mockReturnValue({
    data:
    [
      {
        _id: '6465d53dce9cafd7afc975d3',
        couponNo: 'A000000005',
        couponName: '打卡優惠',
        couponCode: 'card',
        discount: 90,
        stoppedAt: null,
        isDisabled: false,
        createdAt: '2023-05-18T07:35:25.389Z'
      }
    ]
  })

  beforeEach(() => {
    setActivePinia(createPinia())
  })
  test('取得優惠碼活動列表', async () => {
    const couponAdminStore = useCouponAdminStore()
    await couponAdminStore.getCoupon()
    expect(couponAdminStore.couponList).toBeDefined()
  })
  test('Get 方法有被呼叫一次', () => {
    expect(getCouponLists).toHaveBeenCalledTimes(1)
  })
})
