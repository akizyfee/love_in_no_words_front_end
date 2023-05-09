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
