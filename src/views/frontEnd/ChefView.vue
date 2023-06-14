<script setup>
import SiderBar from '@/components/frontEnd/SideBar.vue'
import { io } from 'socket.io-client'
import { warningAlert } from '@/plugins/toast'
import { onMounted, watch } from 'vue'
import { catchError } from '@/utils/catchError'

import { useChefStore } from '@/stores/frontEnd/chefView'

const socket = io(import.meta.env.VITE_SOCKET_URL)
const chefStore = useChefStore()
/**
 * 接收訊息
 */
socket.on('chef', (messages) => {
  // 這邊等 API 串接收到消息可以改成刷新訂單，就不用通知了
  if (messages) {
    warningAlert('收到前台點餐訂單')
    chefStore.fetchSearchPickUp()
  }
})

/**
 * 查詢訂單
 */
onMounted(() => {
  chefStore.fetchSearchPickUp()
})

watch(
  [() => chefStore.currentStatus],
  () => {
    chefStore.fetchSearchPickUp()
  },
  {
    immediate: true,
    deep: true
  }
)

/**
 * 出餐
 */
const fetchSendPickUp = catchError(async (oderId) => {
  chefStore.fetchSendPickUp(oderId)
  const sendMessage = {
    message: `'訂單 ${oderId} 已製作完成，請出餐'`
  }
  socket.emit('employee', sendMessage)
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
        <li v-for="(select, key) in chefStore.selectStatus" :key="key" class="mr-2">
          <a
            @click.prevent="chefStore.currentStatus = select"
            class="block px-6 py-3 rounded-lg hover:text-primary-light hover:bg-white"
            :class="{ 'tabbar-active': chefStore.currentStatus === select }"
            >{{ select }}</a
          >
        </li>
      </ul>
      <!-- table -->
      <ul class="overflow-x-auto flex space-x-2">
        <li
          v-for="item in chefStore.pickUpList"
          :key="item.orderNo"
          class="min-w-[300px] h-[600px] bg-white flex flex-col justify-between border-2 border-textself rounded-lg shadow"
        >
          <div>
            <div class="flex justify-between px-2 pt-4 rounded-lg bg-bgself-light">
              <p class="text-lg font-medium text-white bg-secondary-light rounded-lg py-1 px-2">
                訂單編號 : {{ item.orderNo }}
              </p>
            </div>
            <div class="flex justify-between p-4 bg-bgself-light">
              <p class="font-medium text-xl text-primary-light">預計製作時間</p>
              <p class="font-medium text-xl text-primary-light">{{ item.totalTime }} 分鐘</p>
            </div>
            <!-- cartList -->
            <ul class="flex flex-col overflow-y-auto max-h-[400px]">
              <li
                v-for="(dessert, index) in item.orderList"
                :key="`${index}${dessert.productName}`"
                class="flex justify-between items-center border-t border-textself p-4"
              >
                <div>
                  <h2 class="font-medium text-xl">
                    <span>{{ dessert.productName }}</span>
                    <span>&emsp;x{{ dessert.qty }}</span>
                  </h2>
                  <p class="font-medium text-xl text-primary-light my-2">備註：{{ item.note }}</p>
                </div>
              </li>
            </ul>
          </div>
          <!-- send_btn -->
          <div
            class="rounded-br-lg rounded-bl-lg bg-bgself-light hover:bg-primary-light hover:text-white text-center"
          >
            <button
              v-if="item.status === '未出餐'"
              @click.prevent="fetchSendPickUp(item.orderNo)"
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
