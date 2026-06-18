<template>
  <AdminCard title="Metrics">
    <div v-for="(metric, i) in form" :key="i" class="flex gap-2 mb-2">
      <input v-model="metric.value" class="admin-input w-24" placeholder="Value" />
      <input v-model="metric.label" class="admin-input flex-1" placeholder="Label" />
      <button class="text-red-400 hover:text-red-300 text-sm px-2" @click="form.splice(i, 1)">&#10005;</button>
    </div>
    <button class="text-xs text-cyan hover:underline mt-1" @click="form.push({ value: '', label: '' })">+ Add metric</button>

    <template #actions>
      <AdminSaveBtn @click="$emit('save', [...form])" />
    </template>
  </AdminCard>
</template>

<script setup lang="ts">
import type { Metric } from '~/types/cv'

const props = defineProps<{ data: Metric[] }>()
defineEmits<{ save: [data: Metric[]] }>()

const form = reactive<Metric[]>(JSON.parse(JSON.stringify(props.data)))
watch(() => props.data, (v) => {
  form.splice(0, form.length, ...JSON.parse(JSON.stringify(v)))
})
</script>
