<script setup>
import SiderBar from '@/components/frontEnd/SideBar.vue'
import AccordionMenuItem from '@/components/frontEnd/AccordionMenuItem.vue'

/**
 * Accordion 開關
 */
// const AccordionImgChange = ref(false)
// const open = (index, id) => {
//   const accordion = new Accordion(accordionItems.value)

//   AccordionImgChange.value = !AccordionImgChange.value
//   nextTick(() => {
//     accordion.open(`accordion-example-heading-${id}`)
//   })
// }

// import { ref, onMounted } from 'vue'
// import { Accordion } from 'flowbite'

/**
 * Accordion 開關
 */
// let accordion
// const accordionCollapse = ref()
// const accordionCollapseHeading = ref()
// const accordionCollapseBody = ref()

// const options = {
//   alwaysOpen: true
// }

// const DropToggle = () => {
//   if (accordionCollapseBody.value) {
//     accordion.toggle()
//   }
// }

// onMounted(() => {
//   accordion = new Accordion(accordionCollapseBody.value, options)
// })
</script>
<template>
  <aside class="fixed top-0 left-0 z-40 w-[315px] h-screen">
    <SiderBar />
  </aside>
  <section class="ml-[315px] bg-white">
    <!-- title -->
    <nav class="border-b-2 border-textself p-6">
      <h1 class="flex items-center text-[36px] font-bold">訂單資訊</h1>
    </nav>
    <AccordionMenuItem />
  </section>
</template>
