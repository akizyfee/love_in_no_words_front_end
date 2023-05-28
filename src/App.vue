<script setup>
import { RouterView } from 'vue-router'
import { io } from 'socket.io-client'
import { warningAlert } from '@/plugins/toast'

const socket = io(import.meta.env.VITE_SOCKET_URL)

/**
 * 接收訊息
 */
socket.on('employee', (messages) => {
  warningAlert(messages.message)
})
</script>

<template>
  <RouterView></RouterView>
</template>
