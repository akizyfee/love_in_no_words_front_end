<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'flowbite'

const modalEl = ref(null)
let modal

function openModal() {
  modal.show()
}

function closeModal() {
  modal.hide()
}

// 监听组件挂载完成后，初始化 modal
onMounted(() => {
  modal = new Modal(modalEl.value)
})

defineExpose({
  openModal,
  closeModal,
  modalEl
})
</script>
<template>
  <!-- Main modal -->
  <div ref="modalEl" tabindex="-1" aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-5 overflow-x-hidden overflow-y-auto lg:inset-0 h-[calc(100%-1rem)] lg:h-full">
    <slot></slot>
  </div>
</template>
