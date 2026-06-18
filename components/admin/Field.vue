<template>
  <div>
    <label class="block text-xs text-muted uppercase tracking-wider mb-1.5">{{ label }}</label>
    <textarea
      v-if="type === 'textarea'"
      :value="modelValue"
      class="admin-input w-full"
      rows="3"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <input
      v-else
      :value="modelValue"
      :type="type"
      class="admin-input w-full"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  modelValue: string
  type?: string
}>()
defineEmits<{ 'update:modelValue': [value: string] }>()
</script>
