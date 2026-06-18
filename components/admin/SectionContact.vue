<template>
  <AdminCard title="Contact">
    <AdminField label="Terminal User" v-model="form.terminalUser" />

    <div class="mt-4">
      <div class="text-xs text-muted uppercase tracking-wider mb-2">Contact Fields</div>
      <div v-for="(field, i) in form.fields" :key="i" class="flex gap-2 mb-2">
        <input v-model="field.key" class="admin-input w-24" placeholder="Key" />
        <input v-model="field.value" class="admin-input flex-1" placeholder="Value" />
        <input v-model="field.valueColor" class="admin-input w-36" placeholder="Color class" />
        <button class="text-red-400 hover:text-red-300 text-sm px-2" @click="form.fields.splice(i, 1)">&#10005;</button>
      </div>
      <button class="text-xs text-cyan hover:underline" @click="form.fields.push({ key: '', value: '', valueColor: 'text-[#a5d6ff]' })">+ Add field</button>
    </div>

    <div class="grid grid-cols-2 gap-4 mt-4">
      <AdminField label="Email Link" v-model="form.emailLink" />
      <AdminField label="Phone Link" v-model="form.phoneLink" />
      <AdminField label="Phone Display" v-model="form.phoneDisplay" />
    </div>

    <template #actions>
      <AdminSaveBtn @click="$emit('save', JSON.parse(JSON.stringify(form)))" />
    </template>
  </AdminCard>
</template>

<script setup lang="ts">
import type { Contact } from '~/types/cv'

const props = defineProps<{ data: Contact }>()
defineEmits<{ save: [data: Contact] }>()

const form = reactive<Contact>(JSON.parse(JSON.stringify(props.data)))
watch(() => props.data, (v) => Object.assign(form, JSON.parse(JSON.stringify(v))))
</script>
