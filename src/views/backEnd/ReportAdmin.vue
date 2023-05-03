<script setup>
import SiderBar from '@/components/backEnd/SideBar.vue'
</script>
<template>
  <aside class="fixed top-0 left-0 z-40 w-[315px] h-screen">
    <SiderBar />
  </aside>
  <div class="ml-[315px]">
    <nav class="bg-white border-b-2 border-textself p-6">
      <h1 class="flex items-center text-[36px] font-bold">報表查詢</h1>
    </nav>
    <main class="bg-secondary-light min-h-screen p-6">
      <!-- imgReport -->
      <ul class="grid grid-cols-12">
        <li
          class="col-span-4 max-w-sm p-6 bg-white border border-black rounded-lg shadow flex flex-col justify-between mx-3"
        >
          <p class="mb-3 font-medium text-2xl">報表</p>
          <button href="#" class="btn btn-dark py-2">寄信</button>
        </li>
        <li
          class="col-span-4 max-w-sm p-6 bg-white border border-black rounded-lg shadow flex flex-col justify-between mx-3"
        >
          <p class="mb-3 font-medium text-2xl">報表</p>
          <button href="#" class="btn btn-dark py-2">寄信</button>
        </li>
        <li
          class="col-span-4 max-w-sm p-6 bg-white border border-black rounded-lg shadow flex flex-col justify-between mx-3"
        >
          <p class="mb-3 font-medium text-2xl">報表</p>
          <button href="#" class="btn btn-dark py-2">寄信</button>
        </li>
      </ul>
      <!-- select -->
      <ul class="grid grid-cols-12 gap-4 items-center my-6">
        <li class="col-span-2">
          <label for="form_limit" class="block mb-2 font-medium">筆數</label>
          <select id="form_limit" class="form-select py-3">
            <option value="50" selected>50</option>
            <option value="100">100</option>
            <option value="150">150</option>
          </select>
        </li>
        <li class="col-span-2">
          <label for="countries_disabled" class="block mb-2 font-medium">月份</label>
          <select id="countries_disabled" class="form-select py-3">
            <option value="1月" selected>1月</option>
            <option value="2月">2月</option>
            <option value="3月">3月</option>
          </select>
        </li>
      </ul>
      <!-- table -->
      <section class="relative overflow-x-auto bg-bgself-light rounded-xl p-6 mb-6">
        <table class="w-full text-center">
          <thead class="text-xl font-medium text-secondary-light bg-textself">
            <tr class="border-b-2 border-black">
              <th class="py-3">訂單編號</th>
              <th class="py-3">金額</th>
              <th class="py-3">成立時間</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b-2 border-black">
              <td class="py-3">1122334455</td>
              <td class="py-3">667700</td>
              <td class="py-3">2023/05/01</td>
            </tr>
            <tr class="border-b-2 border-black">
              <td class="py-3">淨利</td>
              <td></td>
              <td class="py-3">66666</td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>
<style scoped></style>
