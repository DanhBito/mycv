<template>
  <button
    class="px-5 py-2 rounded-md text-sm font-semibold bg-spring text-white hover:bg-spring/80 transition-all"
    @click="$emit('click')"
  >
    Save
  </button>
</template>

<script setup lang="ts">
defineEmits<{ click: [] }>()
</script>
