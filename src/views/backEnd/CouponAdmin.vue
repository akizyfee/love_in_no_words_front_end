<script>
import { defineComponent, ref } from 'vue'
import CuponCode from '@/components/backEnd/coupon/CouponCode.vue'
import FreeOne from '@/components/backEnd/coupon/FreeOne.vue'
import FreebiePlus from '@/components/backEnd/coupon/FreebiePlus.vue'
import SiderBar from '@/components/backEnd/SideBar.vue'

export default defineComponent({
  components: {
    CuponCode,
    FreeOne,
    SiderBar,
    FreebiePlus
  },
  setup() {
    const selectedComponent = ref('CuponCode')
    return { selectedComponent }
  }
})
</script>
<template>
  <aside class="fixed top-0 left-0 z-40 w-[315px] h-screen">
    <SiderBar />
  </aside>
  <div class="ml-[315px] bg-white">
    <nav class="border-b-2 border-textself p-6">
      <h1 class="flex items-center text-[36px] font-bold">活動管理</h1>
    </nav>
    <main class="min-h-screen p-6">
      <!-- select -->
      <label for="selectCoupon" class="block mb-2 font-medium whitespace-nowrap">活動分類</label>
      <select
        id="selectCoupon"
        value="cuponCode"
        v-model="selectedComponent"
        class="form-select max-w-[250px] py-3"
      >
        <option value="cuponCode">優惠碼</option>
        <option value="freeOne">買一送一</option>
        <option value="freebiePlus">A + B 優惠</option>
      </select>
      <!-- table -->
      <keep-alive>
        <component :is="selectedComponent" />
      </keep-alive>
    </main>
  </div>
</template>
