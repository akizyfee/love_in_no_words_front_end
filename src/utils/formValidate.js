export const errorsFormSchema = {
  name(value) {
    // 定義驗證後的回傳內容
    if (!value) {
      return '名稱必填'
    }
    return true
  },
  phone(value) {
    if (!value) {
      return '電話必填'
    }
    return true
  },
  email(value) {
    if (!value) {
      return '信箱必填'
    }
    return true
  },
  password(value) {
    if (!value) {
      return '密碼必填'
    }
    if (value.length <= 7) {
      return '密碼長度需大於 8 碼'
    }
    return true
  },
  tableName(value) {
    if (!value) {
      return '桌號必填'
    }
    return true
  },
  qty(value) {
    if (!value) {
      return '購買數量必填'
    }
    if (value <= 0) {
      return '購買數量需要大於 0，請重新填寫'
    }
    return true
  },
  payment(value) {
    if (!value) {
      return '付款方式必填'
    }
    return true
  }
}

export const errorProductSchema = {
  dessertCategory(value) {
    if (!value) {
      return '商品分類必填'
    }
    return true
  },
  productName(value) {
    // 定義驗證後的回傳內容
    if (!value) {
      return '商品名稱必填'
    }
    return true
  },
  photoUrl(value) {
    // 定義驗證後的回傳內容
    if (!value) {
      return '尚未上傳圖片'
    }
    return true
  },
  price(value) {
    // 定義驗證後的回傳內容
    if (!value) {
      return '價格必填'
    }
    return true
  },
  inStockAmount(value) {
    // 定義驗證後的回傳內容
    if (!value) {
      return '庫存數量必填'
    }
    return true
  },
  safeStockAmount(value) {
    // 定義驗證後的回傳內容
    if (!value) {
      return '安全庫存數量必填'
    }
    return true
  },
  productionTime(value) {
    // 定義驗證後的回傳內容
    if (!value) {
      return '製作時間必填'
    }
    return true
  }
}

export const errorsCouponSchema = {
  couponName(value) {
    // 定義驗證後的回傳內容
    if (!value) {
      return '優惠名稱必填'
    }
    return true
  },
  couponCode(value) {
    if (!value) {
      return '優惠代碼必填'
    }
    return true
  },
  discount(value) {
    if (!value) {
      return '折扣比例必填，範圍在 1 到 99'
    }
    if (value < 1) {
      return '折扣比例不得小於 1'
    }
    if (value > 100) {
      return '折扣比例不得大於 100'
    }
    return true
  }
}
