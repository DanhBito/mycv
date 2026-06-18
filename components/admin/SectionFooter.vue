<template>
  <AdminCard title="Footer">
    <AdminField label="Footer Text (HTML supported)" v-model="form.text" type="textarea" />
    <template #actions>
      <AdminSaveBtn @click="$emit('save', { ...form })" />
    </template>
  </AdminCard>
</template>

<script setup lang="ts">
import type { Footer } from '~/types/cv'

const props = defineProps<{ data: Footer }>()
defineEmits<{ save: [data: Footer] }>()

const form = reactive({ ...props.data })
watch(() => props.data, (v) => Object.assign(form, v))
</script>
