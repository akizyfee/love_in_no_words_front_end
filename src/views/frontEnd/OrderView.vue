<script setup>
import SiderBar from '@/components/frontEnd/SideBar.vue'
import AccordionMenuItem from '@/components/frontEnd/AccordionMenuItem.vue'
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
