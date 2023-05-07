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
    return true
  }
}
