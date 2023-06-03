<script setup>
import { RouterView } from 'vue-router'
import { io } from 'socket.io-client'
import { warningAlert } from '@/plugins/toast'
import Loading from '@/components/TheLoading.vue'
import { useLoadingStore } from '@/stores/TheLoading'

const socket = io(import.meta.env.VITE_SOCKET_URL)

/**
 * 接收訊息
 */
socket.on('employee', (messages) => {
  warningAlert(messages.message)
})
</script>

<template class="relative">
  <Loading v-if="useLoadingStore().isLoading" />
  <RouterView></RouterView>
</template>
