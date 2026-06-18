<template>
  <section id="metrics" class="py-20 bg-bg-secondary">
    <div class="max-w-[1100px] mx-auto px-8">
      <div class="font-mono text-xs text-spring uppercase tracking-widest mb-2 reveal">Impact & Metrics</div>
      <h2 class="text-2xl md:text-3xl font-bold mb-2 reveal">Numbers that matter</h2>
      <div class="w-12 h-[3px] bg-gradient-to-r from-spring to-cyan rounded mb-10 reveal" />

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        <div
          v-for="metric in data"
          :key="metric.label"
          class="reveal bg-bg-tertiary border border-border rounded-xl py-8 px-5 text-center hover:border-cyan hover:-translate-y-1 transition-all duration-300"
        >
          <div class="text-3xl md:text-4xl font-bold gradient-text">{{ metric.value }}</div>
          <div class="text-xs text-muted mt-2">{{ metric.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Metric } from '~/types/cv'

defineProps<{ data: Metric[] }>()
</script>
