<template>
  <h2 ref="heading1">
    <button type="button" @click="open(heading1, body1)"
      class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
      <span>標題1</span>
    </button>
  </h2>
  <div ref="body1" class="hidden">
    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        內容1
      </p>
    </div>
  </div>
  <h2 ref="heading2">
    <button type="button" @click="open(heading2, body2)"
      class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
      <span>標題2</span>
    </button>
  </h2>
  <div ref="body2" class="hidden">
    <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        內容2
      </p>
    </div>
  </div>
  <h2 ref="heading3">
    <button type="button" @click="open(heading3, body3)"
      class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
      <span>標題3</span>
    </button>
  </h2>
  <div ref="body3" class="hidden">
    <div class="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
      <p class="mb-2 text-gray-500 dark:text-gray-400">
        內容3
      </p>
    </div>
  </div>
</template>

<script setup>
import { Accordion } from 'flowbite'
import { ref, onMounted, nextTick } from 'vue'
const heading1 = ref(null)
const body1 = ref(null)
const heading2 = ref(null)
const body2 = ref(null)
const heading3 = ref(null)
const body3 = ref(null)

let accordion
onMounted(() => {
  const accordionItems = [
    {
      id: heading1.value,
      triggerEl: heading1.value,
      targetEl: body1.value,
      active: true
    },
    {
      id: heading2.value,
      triggerEl: heading2.value,
      targetEl: body2.value,
      active: false
    },
    {
      id: heading3.value,
      triggerEl: heading3.value,
      targetEl: body3.value,
      active: false
    }
  ]
  accordion = new Accordion(accordionItems)
})
const open = (heading, body) => {
  const childComponent = body.value

  nextTick(() => {
    if (childComponent) {
      accordion.open(heading)
    }
  })
}
</script>
