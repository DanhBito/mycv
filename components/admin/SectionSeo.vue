<template>
  <AdminCard title="SEO Settings">
    <div class="grid gap-4">
      <AdminField label="Page Title" v-model="form.title" />
      <AdminField label="Description" v-model="form.description" type="textarea" />
      <AdminField label="Author" v-model="form.author" />
      <AdminField label="OG Title" v-model="form.ogTitle" />
      <AdminField label="OG Description" v-model="form.ogDescription" type="textarea" />
    </div>
    <template #actions>
      <AdminSaveBtn @click="$emit('save', { ...form })" />
    </template>
  </AdminCard>
</template>

<script setup lang="ts">
import type { SeoConfig } from '~/types/cv'

const props = defineProps<{ data: SeoConfig }>()
defineEmits<{ save: [data: SeoConfig] }>()

const form = reactive({ ...props.data })
watch(() => props.data, (v) => Object.assign(form, v))
</script>
