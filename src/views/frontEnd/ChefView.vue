<script setup>
import SiderBar from '@/components/frontEnd/SideBar.vue'
import { io } from 'socket.io-client'
import { successAlert, warningAlert } from '@/plugins/toast'

const socket = io(import.meta.env.VITE_SOCKET_URL)

/**
 * 發送出餐訊息
 * employee 為店員
 * chef 為廚師
 * @param {object} msg 訊息
 */
const submitEmployee = () => {
  const sendMessage = {
    message: '訂單XXX已製作完成，請出餐'
  }
  socket.emit('employee', sendMessage)
}

/**
 * 接收訊息
 */
socket.on('employee', (messages) => {
  warningAlert(messages.message)
})
socket.on('chef', (messages) => {
  // 這邊等 API 串接收到消息可以改成刷新訂單，就不用通知了
  if (messages) {
    successAlert('收到訂單')
  }
})
</script>
<template>
  <aside class="fixed top-0 left-0 z-40 w-[315px] h-screen">
    <SiderBar />
  </aside>
  <section class="ml-[315px] bg-white">
    <!-- title -->
    <nav class="border-b-2 border-textself p-6">
      <h1 class="flex items-center text-[36px] font-bold">廚房訂單資訊</h1>
    </nav>
    <main class="min-h-screen p-6">
      <!-- menu -->
      <ul class="flex text-xl font-medium text-center break-keep overflow-x-auto mb-6">
        <li class="mr-2">
          <a
            href="#"
            class="block px-6 py-3 rounded-lg hover:text-primary-light hover:bg-white tabbar-active"
            >未出餐</a
          >
        </li>
        <li class="mr-2">
          <a href="#" class="block px-6 py-3 rounded-lg hover:text-primary-light hover:bg-white"
            >已出餐</a
          >
        </li>
      </ul>
      <!-- table -->
      <ul class="grid grid-cols-12 gap-4">
        <li
          class="col-span-12 lg:col-span-6 xl:col-span-4 bg-white border-2 border-textself rounded-lg shadow"
        >
          <div class="flex justify-between px-2 pt-4 rounded-lg bg-bgself-light">
            <p class="text-lg font-medium text-white bg-secondary-light rounded-lg py-1 px-2">
              訂單編號 : 123456789
            </p>
          </div>
          <div class="flex justify-between p-4 bg-bgself-light">
            <p class="font-medium text-xl text-primary-light">預計出餐時間</p>
            <p class="font-medium text-xl text-primary-light">12:30</p>
          </div>
          <!-- cartList -->
          <ul class="flex flex-col">
            <li class="flex justify-between items-center border-t border-textself p-4">
              <div>
                <h2 class="font-medium text-xl">
                  <span>香草鮮奶酪</span>
                  <span>&emsp;x1</span>
                </h2>
                <p class="font-medium text-xl text-primary-light my-2">備註訊息：無</p>
              </div>
            </li>
            <li class="flex justify-between items-center border-t border-textself p-4">
              <div>
                <h2 class="font-medium text-xl">
                  <span>巧克力糖霜甜甜圈</span>
                  <span>&emsp;x2</span>
                </h2>
                <p class="font-medium text-xl text-primary-light my-2">備註訊息：無</p>
              </div>
            </li>
            <li class="flex justify-between items-center border-t border-textself p-4">
              <div>
                <h2 class="font-medium text-xl">
                  <span>香草鮮奶酪</span>
                  <span>&emsp;x1</span>
                </h2>
                <p class="font-medium text-xl text-primary-light my-2">備註訊息：無</p>
              </div>
            </li>
            <li class="flex justify-between items-center border-t border-textself p-4">
              <div>
                <h2 class="font-medium text-xl">
                  <span>巧克力糖霜甜甜圈</span>
                  <span>&emsp;x2</span>
                </h2>
                <p class="font-medium text-xl text-primary-light my-2">備註訊息：無</p>
              </div>
            </li>
          </ul>
          <!-- send_btn -->
          <div
            class="rounded-br-lg rounded-bl-lg bg-bgself-light hover:bg-primary-light hover:text-white text-center"
          >
            <button
              @click.prevent="submitEmployee"
              type="button"
              class="font-medium text-xl w-full p-4"
            >
              出餐
            </button>
          </div>
        </li>
      </ul>
    </main>
  </section>
</template>
<style scoped>
.tabbar-active {
  @apply bg-bgself-light;
}
</style>
