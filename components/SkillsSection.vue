<template>
  <section id="skills" class="py-20 bg-bg-secondary">
    <div class="max-w-[1100px] mx-auto px-8">
      <div class="font-mono text-xs text-spring uppercase tracking-widest mb-2 reveal">Core Technical Skills</div>
      <h2 class="text-2xl md:text-3xl font-bold mb-2 reveal">What I work with</h2>
      <div class="w-12 h-[3px] bg-gradient-to-r from-spring to-cyan rounded mb-10 reveal" />
      <p class="text-muted max-w-xl mb-10 text-sm reveal">
        {{ data.description }}
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div
          v-for="group in data.groups"
          :key="group.title"
          class="reveal bg-bg-tertiary border border-border rounded-xl p-5 hover:border-cyan hover:-translate-y-1 transition-all duration-300 cursor-default"
        >
          <div class="text-2xl mb-3">{{ group.icon }}</div>
          <div class="text-xs font-semibold text-muted uppercase tracking-wider mb-3">{{ group.title }}</div>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in group.skills" :key="skill.name" :class="['tag', `tag-${skill.color}`]">
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Skills } from '~/types/cv'

defineProps<{ data: Skills }>()
</script>
