import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loadingData', () => {
  const isLoading = ref(false)
  return {
    isLoading
  }
})
