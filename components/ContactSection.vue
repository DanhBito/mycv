<template>
  <section id="contact" class="py-20 bg-bg-secondary">
    <div class="max-w-[1100px] mx-auto px-8">
      <div class="font-mono text-xs text-spring uppercase tracking-widest mb-2 reveal">Contact</div>
      <h2 class="text-2xl md:text-3xl font-bold mb-2 reveal">Let's connect</h2>
      <div class="w-12 h-[3px] bg-gradient-to-r from-spring to-cyan rounded mb-10 reveal" />

      <div class="reveal max-w-2xl bg-bg border border-border rounded-xl overflow-hidden">
        <div class="flex items-center gap-2 bg-bg-tertiary px-4 py-3 border-b border-border">
          <div class="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div class="w-3 h-3 rounded-full bg-[#28c840]" />
          <div class="text-xs text-muted mx-auto">bash — contact.sh</div>
        </div>

        <div class="p-6 font-mono text-sm">
          <div class="mb-2.5">
            <span class="text-spring">{{ data.terminalUser }}:~$ </span>
            <span class="text-text-primary">curl -X GET /api/contact</span>
          </div>
          <div class="mt-2 text-muted">{</div>
          <div v-for="(field, i) in data.fields" :key="i" class="pl-6">
            <span class="text-cyan">"{{ field.key }}"</span>
            <span class="text-muted">: </span>
            <span :class="field.valueColor">{{ field.value }}</span>
            <span v-if="i < data.fields.length - 1" class="text-muted">,</span>
          </div>
          <div class="text-muted">}</div>
          <div class="mt-3">
            <span class="text-spring">{{ data.terminalUser }}:~$ </span>
            <span class="inline-block w-2 h-[1em] bg-spring align-text-bottom animate-blink" />
          </div>
        </div>
      </div>

      <div class="flex gap-4 mt-8 flex-wrap">
        <a :href="data.emailLink" class="px-6 py-2.5 rounded-md text-sm font-semibold bg-spring text-white hover:bg-spring/80 hover:-translate-y-0.5 transition-all">
          &#9993; Send Email
        </a>
        <a :href="data.phoneLink" class="px-6 py-2.5 rounded-md text-sm border border-border text-text-primary hover:border-cyan hover:text-cyan transition-all">
          &#128222; {{ data.phoneDisplay }}
        </a>
        <a href="/api/pdf/download" download class="px-6 py-2.5 rounded-md text-sm border border-border text-text-primary hover:border-spring hover:text-spring transition-all">
          &#128196; Download CV
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Contact } from '~/types/cv'

defineProps<{ data: Contact }>()
</script>
