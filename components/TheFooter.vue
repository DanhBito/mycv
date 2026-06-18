<template>
  <footer class="text-center py-8 text-muted text-xs border-t border-border font-mono">
    <p v-html="data.text" />
  </footer>
</template>

<script setup lang="ts">
import type { Footer } from '~/types/cv'

defineProps<{ data: Footer }>()
</script>
