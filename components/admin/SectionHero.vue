<template>
  <AdminCard title="Hero Section">
    <div class="grid gap-4">
      <AdminField label="Status Badge" v-model="form.statusBadge" />
      <AdminField label="Full Name" v-model="form.name" />
      <AdminField label="Highlighted Part (colored)" v-model="form.highlightedPart" />
    </div>

    <div class="mt-4">
      <div class="text-xs text-muted uppercase tracking-wider mb-2">Typewriter Lines</div>
      <div v-for="(_, i) in form.typewriterLines" :key="i" class="flex gap-2 mb-2">
        <input v-model="form.typewriterLines[i]" class="admin-input flex-1" />
        <button class="text-red-400 hover:text-red-300 text-sm px-2" @click="form.typewriterLines.splice(i, 1)">&#10005;</button>
      </div>
      <button class="text-xs text-cyan hover:underline" @click="form.typewriterLines.push('')">+ Add line</button>
    </div>

    <div class="mt-4">
      <div class="text-xs text-muted uppercase tracking-wider mb-2">Stats</div>
      <div v-for="(stat, i) in form.stats" :key="i" class="flex gap-2 mb-2 items-center">
        <input v-model.number="stat.target" type="number" placeholder="Target" class="admin-input w-20" />
        <input v-model="stat.suffix" placeholder="Suffix" class="admin-input w-16" />
        <input v-model="stat.label" placeholder="Label" class="admin-input flex-1" />
        <button class="text-red-400 hover:text-red-300 text-sm px-2" @click="form.stats.splice(i, 1)">&#10005;</button>
      </div>
      <button class="text-xs text-cyan hover:underline" @click="form.stats.push({ target: 0, suffix: '', label: '' })">+ Add stat</button>
    </div>

    <template #actions>
      <AdminSaveBtn @click="$emit('save', toRaw(form))" />
    </template>
  </AdminCard>
</template>

<script setup lang="ts">
import type { Hero } from '~/types/cv'

const props = defineProps<{ data: Hero }>()
defineEmits<{ save: [data: Hero] }>()

const form = reactive<Hero>(JSON.parse(JSON.stringify(props.data)))
watch(() => props.data, (v) => Object.assign(form, JSON.parse(JSON.stringify(v))))
</script>
