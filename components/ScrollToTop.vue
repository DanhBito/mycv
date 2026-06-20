<template>
  <Transition name="scroll-top">
    <button
      v-show="visible"
      class="fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-bg-secondary border border-border text-muted hover:text-cyan hover:border-cyan shadow-lg transition-all duration-300 cursor-pointer"
      aria-label="Scroll to top"
      @click="scrollToTop"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
const visible = ref(false)

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onScroll() {
  visible.value = window.scrollY > 400
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.scroll-top-enter-active,
.scroll-top-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.scroll-top-enter-from,
.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>
