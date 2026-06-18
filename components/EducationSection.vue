<template>
  <section id="education" class="py-20">
    <div class="max-w-[1100px] mx-auto px-8">
      <div class="font-mono text-xs text-spring uppercase tracking-widest mb-2 reveal">Education</div>
      <h2 class="text-2xl md:text-3xl font-bold mb-2 reveal">Academic background</h2>
      <div class="w-12 h-[3px] bg-gradient-to-r from-spring to-cyan rounded mb-10 reveal" />

      <div class="relative pl-8">
        <div class="absolute left-0 top-2 bottom-0 w-0.5 bg-gradient-to-b from-cyan to-transparent" />
        <div class="timeline-item relative">
          <div class="absolute -left-[2.15rem] top-1.5 w-3 h-3 rounded-full bg-bg border-2 border-cyan" />
          <div class="text-lg font-bold text-cyan">{{ data.school }}</div>
          <div class="text-sm text-text-primary mt-0.5">{{ data.degree }}</div>
          <div class="text-xs text-muted font-mono mt-1">{{ data.period }}</div>
        </div>
      </div>

      <div class="mt-8 max-w-md">
        <div class="reveal bg-bg-tertiary border border-border rounded-xl p-5">
          <div class="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Languages</div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="lang in data.languages"
              :key="lang.name"
              :class="['tag', `tag-${lang.color}`]"
            >
              {{ lang.name }} — {{ lang.level }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Education } from '~/types/cv'

defineProps<{ data: Education }>()
</script>
