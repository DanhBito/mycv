<template>
  <nav class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 bg-bg/85 backdrop-blur-xl border-b border-border transition-all duration-300">
    <div class="font-mono text-xl text-spring">
      <span class="text-cyan">&lt;</span>{{ data.brandName }}<span class="text-cyan">/&gt;</span>
    </div>

    <div class="flex items-center gap-2 md:hidden">
      <WeatherWidget />
      <button
        class="relative w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:border-cyan text-muted hover:text-cyan transition-all duration-300"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggle"
      >
        <svg
          v-if="isDark"
          class="w-[18px] h-[18px] animate-theme-icon"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
        <svg
          v-else
          class="w-[18px] h-[18px] animate-theme-icon"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>

      <button class="md:hidden text-muted" @click="mobileOpen = !mobileOpen">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <ul class="hidden md:flex items-center gap-8 list-none">
      <li v-for="link in data.links" :key="link.href">
        <a :href="link.href" class="text-muted text-sm hover:text-cyan transition-colors duration-200">{{ link.label }}</a>
      </li>
      <li>
        <WeatherWidget />
      </li>
      <li>
        <button
          class="relative w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:border-cyan text-muted hover:text-cyan transition-all duration-300"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggle"
        >
          <svg
            v-if="isDark"
            class="w-[18px] h-[18px] animate-theme-icon"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          <svg
            v-else
            class="w-[18px] h-[18px] animate-theme-icon"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </li>
    </ul>

    <ul v-if="mobileOpen" class="absolute top-full left-0 right-0 md:hidden flex flex-col gap-4 p-6 bg-bg-secondary border-b border-border list-none">
      <li v-for="link in data.links" :key="link.href">
        <a :href="link.href" class="text-muted text-sm hover:text-cyan transition-colors" @click="mobileOpen = false">{{ link.label }}</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { Nav } from '~/types/cv'

defineProps<{ data: Nav }>()
const mobileOpen = ref(false)
const { isDark, toggle } = useTheme()
</script>

<style scoped>
@keyframes themeIconIn {
  from {
    opacity: 0;
    transform: rotate(-90deg) scale(0.5);
  }
  to {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
}
.animate-theme-icon {
  animation: themeIconIn 0.35s ease-out;
}
</style>
