<template>
  <div v-if="data">
    <TheNav :data="data.nav" />
    <HeroSection :data="data.hero" />
    <SkillsSection :data="data.skills" />
    <ExperienceSection :data="data.experience" />
    <MetricsSection :data="data.metrics" />
    <EducationSection :data="data.education" />
    <ContactSection :data="data.contact" />
    <TheFooter :data="data.footer" />
  </div>
</template>

<script setup lang="ts">
import type { CvData } from '~/types/cv'

const { data } = await useFetch<CvData>('/api/cv')

useScrollReveal()

if (data.value?.seo) {
  useHead({
    title: data.value.seo.title,
    meta: [
      { name: 'description', content: data.value.seo.description },
      { name: 'author', content: data.value.seo.author },
      { property: 'og:title', content: data.value.seo.ogTitle },
      { property: 'og:description', content: data.value.seo.ogDescription },
    ],
  })
}
</script>
