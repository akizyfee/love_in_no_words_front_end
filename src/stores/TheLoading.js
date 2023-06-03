import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('seatData', () => {
  const isLoading = ref(false)
  return {
    isLoading
  }
})
