<template>
  <div class="bg-bg-secondary border border-border rounded-xl p-6">
    <h3 class="text-sm font-semibold text-cyan uppercase tracking-wider mb-4">{{ title }}</h3>
    <slot />
    <div v-if="$slots.actions" class="mt-4 pt-4 border-t border-border flex justify-end">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>
