<script setup>
import sprite from '@/assets/icons/sprite.svg'

defineProps({
  icon: String
})
</script>
<template>
  <svg>
      <use :href="`${sprite}#icon-${icon}`"></use>
  </svg>
</template>
