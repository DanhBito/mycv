<template>
  <section id="experience" class="py-20">
    <div class="max-w-[1100px] mx-auto px-8">
      <div class="font-mono text-xs text-spring uppercase tracking-widest mb-2 reveal">Professional Experience</div>
      <h2 class="text-2xl md:text-3xl font-bold mb-2 reveal">Where I've worked</h2>
      <div class="w-12 h-[3px] bg-gradient-to-r from-spring to-cyan rounded mb-10 reveal" />

      <div class="relative pl-8">
        <div class="absolute left-0 top-2 bottom-0 w-0.5 bg-gradient-to-b from-spring via-cyan to-transparent" />

        <div v-for="(job, i) in data" :key="i" class="timeline-item relative mb-10">
          <div
            class="absolute -left-[2.15rem] top-1.5 w-3 h-3 rounded-full bg-bg border-2 transition-colors duration-300"
            :class="job.dotColor === 'cyan' ? 'border-cyan group-hover:bg-cyan' : 'border-spring group-hover:bg-spring'"
          />

          <div class="mb-3">
            <div class="text-lg font-bold" :class="job.companyColor === 'green' ? 'text-spring' : 'text-cyan'">
              {{ job.company }}
            </div>
            <div class="text-sm text-text-primary mt-0.5">{{ job.role }}</div>
            <div class="text-xs text-muted font-mono mt-1">{{ job.period }}</div>
          </div>

          <div v-for="(project, j) in job.projects" :key="j" class="mt-3">
            <div
              class="bg-bg-secondary border border-border rounded-r-lg p-4 border-l-[3px]"
              :class="project.borderColor === 'cyan' ? 'border-l-cyan' : project.borderColor === 'muted' ? 'border-l-muted' : 'border-l-spring'"
            >
              <div v-if="project.name" class="text-sm font-semibold mb-2 text-text-primary">
                {{ project.name }}
                <span v-if="project.period" class="text-muted text-xs font-normal ml-1">{{ project.period }}</span>
              </div>
              <ul class="flex flex-col gap-1.5">
                <li
                  v-for="(bullet, k) in project.bullets"
                  :key="k"
                  class="text-sm text-muted pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-spring before:text-xs before:top-0.5"
                  v-html="bullet"
                />
              </ul>
              <div class="flex flex-wrap gap-1.5 mt-3">
                <span v-for="tag in project.tags" :key="tag.name" :class="['tag', `tag-${tag.color}`]">
                  {{ tag.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Job } from '~/types/cv'

defineProps<{ data: Job[] }>()
</script>
