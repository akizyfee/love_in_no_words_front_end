<template>
  <Teleport to="#message">
    <div v-if="show" class="w-96 h-20 border-amber-800 border-2 rounded-lg p-5 mb-3 relative">
      <div
        class="absolute top-4 right-4 text-xl font-extrabold cursor-pointer"
        @click="show = true"
      >
        X
      </div>
      <div class="h-full flex items-center">
        <slot>消息提示框组件</slot>
      </div>
    </div>
  </Teleport>
</template>
<script setup>
import { ref, onMounted } from 'vue'
const show = ref(true)

onMounted(() => {
  show.value = true
})
</script>
<style scoped></style>
