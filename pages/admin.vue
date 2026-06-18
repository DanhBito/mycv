<template>
  <div class="min-h-screen bg-bg text-text-primary">
    <!-- Login -->
    <div v-if="!authenticated" class="flex items-center justify-center min-h-screen">
      <form class="bg-bg-secondary border border-border rounded-xl p-8 w-full max-w-sm" @submit.prevent="login">
        <div class="font-mono text-sm text-spring mb-6 text-center">
          <span class="text-cyan">&lt;</span>Admin<span class="text-cyan">/&gt;</span>
        </div>
        <div class="mb-4">
          <label class="block text-xs text-muted uppercase tracking-wider mb-2">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full bg-bg-tertiary border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:border-cyan focus:outline-none"
            placeholder="Enter admin password"
          />
        </div>
        <p v-if="loginError" class="text-red-400 text-xs mb-3">{{ loginError }}</p>
        <button type="submit" :disabled="logging" class="w-full py-2.5 rounded-md text-sm font-semibold bg-spring text-white hover:bg-spring/80 transition-all disabled:opacity-50">
          {{ logging ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>

    <!-- Editor -->
    <div v-else class="flex">
      <!-- Sidebar -->
      <aside class="fixed left-0 top-0 bottom-0 w-56 bg-bg-secondary border-r border-border p-4 overflow-y-auto">
        <div class="font-mono text-sm text-spring mb-6">
          <span class="text-cyan">&lt;</span>Admin<span class="text-cyan">/&gt;</span>
        </div>
        <nav class="flex flex-col gap-1">
          <a
            v-for="section in sections"
            :key="section.id"
            :href="`#${section.id}`"
            class="text-sm px-3 py-2 rounded-lg transition-colors"
            :class="activeSection === section.id ? 'bg-bg-tertiary text-cyan' : 'text-muted hover:text-text-primary hover:bg-bg-tertiary'"
            @click="activeSection = section.id"
          >
            {{ section.label }}
          </a>
        </nav>
        <button class="mt-6 w-full py-2 rounded-md text-xs border border-border text-muted hover:border-red-400 hover:text-red-400 transition-colors" @click="logout">
          Logout
        </button>
      </aside>

      <!-- Content -->
      <main class="ml-56 flex-1 p-8 max-w-4xl">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-xl font-bold">CV Admin Panel</h1>
          <a href="/" target="_blank" class="text-xs text-cyan hover:underline">View public site &rarr;</a>
        </div>

        <div v-if="cvData" class="flex flex-col gap-8">
          <AdminSectionSeo id="seo" :data="cvData.seo" @save="saveSection('seo', $event)" />
          <AdminSectionNav id="nav-section" :data="cvData.nav" @save="saveSection('nav', $event)" />
          <AdminSectionHero id="hero" :data="cvData.hero" @save="saveSection('hero', $event)" />
          <AdminSectionSkills id="skills" :data="cvData.skills" @save="saveSection('skills', $event)" />
          <AdminSectionExperience id="experience" :data="cvData.experience" @save="saveSection('experience', $event)" />
          <AdminSectionMetrics id="metrics" :data="cvData.metrics" @save="saveSection('metrics', $event)" />
          <AdminSectionEducation id="education" :data="cvData.education" @save="saveSection('education', $event)" />
          <AdminSectionContact id="contact" :data="cvData.contact" @save="saveSection('contact', $event)" />
          <AdminSectionFooter id="footer" :data="cvData.footer" @save="saveSection('footer', $event)" />
          <AdminSectionPdf id="pdf" :data="cvData.pdf" @save="savePdf" @reload="loadData" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CvData } from '~/types/cv'

const authenticated = ref(false)
const password = ref('')
const loginError = ref('')
const logging = ref(false)
const activeSection = ref('seo')
const cvData = ref<CvData | null>(null)
const saveMessage = ref('')

const sections = [
  { id: 'seo', label: 'SEO' },
  { id: 'nav-section', label: 'Navigation' },
  { id: 'hero', label: 'Hero' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'metrics', label: 'Metrics' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
  { id: 'footer', label: 'Footer' },
  { id: 'pdf', label: 'PDF Download' },
]

async function checkAuth() {
  try {
    const res = await $fetch<{ authenticated: boolean }>('/api/auth/check')
    authenticated.value = res.authenticated
    if (res.authenticated) await loadData()
  } catch { /* not authenticated */ }
}

async function login() {
  logging.value = true
  loginError.value = ''
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: { password: password.value } })
    authenticated.value = true
    password.value = ''
    await loadData()
  } catch {
    loginError.value = 'Invalid password'
  } finally {
    logging.value = false
  }
}

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  authenticated.value = false
  cvData.value = null
}

async function loadData() {
  cvData.value = await $fetch<CvData>('/api/cv')
}

async function saveSection(section: string, data: unknown) {
  try {
    await $fetch(`/api/cv/${section}`, { method: 'PUT', body: data })
    await loadData()
  } catch (e) {
    alert(`Failed to save ${section}`)
  }
}

async function savePdf(data: unknown) {
  try {
    await $fetch('/api/cv/pdf', { method: 'PUT', body: data })
  } catch { /* upload/delete already saved, just reload */ }
  await loadData()
}

onMounted(checkAuth)
</script>
