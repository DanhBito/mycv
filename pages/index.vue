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
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import type { CvData } from '~/types/cv'

const { data } = await useFetch<CvData>('/api/cv')

useScrollReveal()

if (data.value?.seo) {
  const seo = data.value.seo
  const ogImageUrl = seo.ogUrl
    ? `${seo.ogUrl}${seo.ogImage}`
    : seo.ogImage

  useHead({
    title: seo.title,
    meta: [
      { name: 'description', content: seo.description },
      { name: 'author', content: seo.author },
      { property: 'og:title', content: seo.ogTitle },
      { property: 'og:description', content: seo.ogDescription },
      { property: 'og:image', content: ogImageUrl },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:url', content: seo.ogUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seo.ogTitle },
      { name: 'twitter:description', content: seo.ogDescription },
      { name: 'twitter:image', content: ogImageUrl },
    ],
  })
}
</script>
