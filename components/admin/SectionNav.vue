<template>
  <AdminCard title="Navigation">
    <AdminField label="Brand Name" v-model="form.brandName" />
    <div class="mt-4">
      <div class="text-xs text-muted uppercase tracking-wider mb-2">Nav Links</div>
      <div v-for="(link, i) in form.links" :key="i" class="flex gap-2 mb-2">
        <input v-model="link.href" placeholder="href" class="admin-input flex-1" />
        <input v-model="link.label" placeholder="Label" class="admin-input flex-1" />
        <button class="text-red-400 hover:text-red-300 text-sm px-2" @click="form.links.splice(i, 1)">&#10005;</button>
      </div>
      <button class="text-xs text-cyan hover:underline mt-1" @click="form.links.push({ href: '', label: '' })">+ Add link</button>
    </div>
    <template #actions>
      <AdminSaveBtn @click="$emit('save', { ...form, links: [...form.links] })" />
    </template>
  </AdminCard>
</template>

<script setup lang="ts">
import type { Nav } from '~/types/cv'

const props = defineProps<{ data: Nav }>()
defineEmits<{ save: [data: Nav] }>()

const form = reactive({
  brandName: props.data.brandName,
  links: props.data.links.map(l => ({ ...l })),
})
watch(() => props.data, (v) => {
  form.brandName = v.brandName
  form.links = v.links.map(l => ({ ...l }))
})
</script>
