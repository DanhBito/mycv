<template>
  <AdminCard title="Skills">
    <AdminField label="Section Description" v-model="form.description" type="textarea" />

    <div class="mt-4 flex flex-col gap-4">
      <div v-for="(group, gi) in form.groups" :key="gi" class="bg-bg-tertiary border border-border rounded-lg p-4">
        <div class="flex items-center gap-2 mb-3">
          <input v-model="group.icon" class="admin-input w-12 text-center" placeholder="Icon" />
          <input v-model="group.title" class="admin-input flex-1" placeholder="Group title" />
          <button class="text-red-400 hover:text-red-300 text-sm px-2" @click="form.groups.splice(gi, 1)">&#10005;</button>
        </div>
        <div v-for="(skill, si) in group.skills" :key="si" class="flex gap-2 mb-1.5">
          <input v-model="skill.name" class="admin-input flex-1" placeholder="Skill name" />
          <select v-model="skill.color" class="admin-input w-28">
            <option value="green">Green</option>
            <option value="cyan">Cyan</option>
            <option value="orange">Orange</option>
            <option value="purple">Purple</option>
          </select>
          <button class="text-red-400 hover:text-red-300 text-sm px-2" @click="group.skills.splice(si, 1)">&#10005;</button>
        </div>
        <button class="text-xs text-cyan hover:underline mt-1" @click="group.skills.push({ name: '', color: 'cyan' })">+ Add skill</button>
      </div>
    </div>
    <button class="text-xs text-cyan hover:underline mt-3" @click="form.groups.push({ icon: '', title: '', skills: [] })">+ Add group</button>

    <template #actions>
      <AdminSaveBtn @click="$emit('save', JSON.parse(JSON.stringify(form)))" />
    </template>
  </AdminCard>
</template>

<script setup lang="ts">
import type { Skills } from '~/types/cv'

const props = defineProps<{ data: Skills }>()
defineEmits<{ save: [data: Skills] }>()

const form = reactive<Skills>(JSON.parse(JSON.stringify(props.data)))
watch(() => props.data, (v) => Object.assign(form, JSON.parse(JSON.stringify(v))))
</script>
