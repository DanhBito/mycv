<template>
  <AdminCard title="Education">
    <div class="grid gap-4">
      <AdminField label="School" v-model="form.school" />
      <AdminField label="Degree" v-model="form.degree" />
      <AdminField label="Period" v-model="form.period" />
    </div>

    <div class="mt-4">
      <div class="text-xs text-muted uppercase tracking-wider mb-2">Languages</div>
      <div v-for="(lang, i) in form.languages" :key="i" class="flex gap-2 mb-2">
        <input v-model="lang.name" class="admin-input flex-1" placeholder="Language" />
        <input v-model="lang.level" class="admin-input w-28" placeholder="Level" />
        <select v-model="lang.color" class="admin-input w-24">
          <option value="green">Green</option>
          <option value="cyan">Cyan</option>
        </select>
        <button class="text-red-400 hover:text-red-300 text-sm px-2" @click="form.languages.splice(i, 1)">&#10005;</button>
      </div>
      <button class="text-xs text-cyan hover:underline" @click="form.languages.push({ name: '', level: '', color: 'cyan' })">+ Add language</button>
    </div>

    <template #actions>
      <AdminSaveBtn @click="$emit('save', JSON.parse(JSON.stringify(form)))" />
    </template>
  </AdminCard>
</template>

<script setup lang="ts">
import type { Education } from '~/types/cv'

const props = defineProps<{ data: Education }>()
defineEmits<{ save: [data: Education] }>()

const form = reactive<Education>(JSON.parse(JSON.stringify(props.data)))
watch(() => props.data, (v) => Object.assign(form, JSON.parse(JSON.stringify(v))))
</script>
