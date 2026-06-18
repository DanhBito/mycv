<template>
  <AdminCard title="Experience">
    <div class="flex flex-col gap-6">
      <div v-for="(job, ji) in form" :key="ji" class="bg-bg-tertiary border border-border rounded-lg p-4">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-semibold text-cyan">{{ job.company || 'New Company' }}</span>
          <button class="text-red-400 hover:text-red-300 text-xs" @click="form.splice(ji, 1)">Remove job</button>
        </div>
        <div class="grid grid-cols-2 gap-2 mb-3">
          <input v-model="job.company" class="admin-input" placeholder="Company" />
          <input v-model="job.role" class="admin-input" placeholder="Role" />
          <input v-model="job.period" class="admin-input" placeholder="Period" />
          <select v-model="job.companyColor" class="admin-input">
            <option value="">Default (cyan)</option>
            <option value="green">Green</option>
          </select>
        </div>

        <!-- Projects -->
        <div v-for="(project, pi) in job.projects" :key="pi" class="ml-3 border-l-2 border-border pl-3 mb-3">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs text-muted">Project {{ pi + 1 }}</span>
            <button class="text-red-400 hover:text-red-300 text-xs" @click="job.projects.splice(pi, 1)">&#10005;</button>
          </div>
          <div class="grid grid-cols-2 gap-2 mb-2">
            <input v-model="project.name" class="admin-input" placeholder="Project name" />
            <input v-model="project.period" class="admin-input" placeholder="Period" />
            <select v-model="project.borderColor" class="admin-input">
              <option value="">Default (spring)</option>
              <option value="cyan">Cyan</option>
              <option value="muted">Muted</option>
            </select>
          </div>

          <!-- Bullets -->
          <div class="text-xs text-muted mb-1">Bullets (HTML supported)</div>
          <div v-for="(_, bi) in project.bullets" :key="bi" class="flex gap-1 mb-1">
            <textarea v-model="project.bullets[bi]" class="admin-input flex-1 text-xs" rows="2" />
            <button class="text-red-400 hover:text-red-300 text-sm px-1" @click="project.bullets.splice(bi, 1)">&#10005;</button>
          </div>
          <button class="text-xs text-cyan hover:underline" @click="project.bullets.push('')">+ Add bullet</button>

          <!-- Tags -->
          <div class="text-xs text-muted mt-2 mb-1">Tags</div>
          <div v-for="(tag, ti) in project.tags" :key="ti" class="flex gap-1 mb-1">
            <input v-model="tag.name" class="admin-input flex-1 text-xs" placeholder="Tag name" />
            <select v-model="tag.color" class="admin-input w-24 text-xs">
              <option value="green">Green</option>
              <option value="cyan">Cyan</option>
              <option value="orange">Orange</option>
              <option value="purple">Purple</option>
            </select>
            <button class="text-red-400 hover:text-red-300 text-sm px-1" @click="project.tags.splice(ti, 1)">&#10005;</button>
          </div>
          <button class="text-xs text-cyan hover:underline" @click="project.tags.push({ name: '', color: 'cyan' })">+ Add tag</button>
        </div>
        <button class="text-xs text-cyan hover:underline" @click="job.projects.push({ name: '', period: '', borderColor: '', bullets: [], tags: [] })">+ Add project</button>
      </div>
    </div>
    <button class="text-xs text-cyan hover:underline mt-3" @click="form.push({ company: '', role: '', period: '', companyColor: '', dotColor: '', projects: [] })">+ Add job</button>

    <template #actions>
      <AdminSaveBtn @click="$emit('save', JSON.parse(JSON.stringify(form)))" />
    </template>
  </AdminCard>
</template>

<script setup lang="ts">
import type { Job } from '~/types/cv'

const props = defineProps<{ data: Job[] }>()
defineEmits<{ save: [data: Job[]] }>()

const form = reactive<Job[]>(JSON.parse(JSON.stringify(props.data)))
watch(() => props.data, (v) => {
  form.splice(0, form.length, ...JSON.parse(JSON.stringify(v)))
})
</script>
