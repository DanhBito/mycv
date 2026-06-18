<template>
  <section id="hero" class="relative h-screen flex items-center justify-center overflow-hidden">
    <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" />

    <div class="relative z-10 text-center px-4">
      <div class="inline-block font-mono text-xs text-spring border border-spring px-3 py-1 rounded-full mb-6 animate-fade-up">
        {{ data.statusBadge }}
      </div>

      <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight animate-fade-up animate-fade-up-1">
        {{ nameBefore }}<span class="text-cyan">{{ data.highlightedPart }}</span>
      </h1>

      <p class="mt-3 text-base sm:text-lg md:text-xl text-muted font-mono animate-fade-up animate-fade-up-2">
        <span>{{ displayText }}</span>
        <span class="inline-block w-0.5 h-[1.1em] bg-cyan ml-0.5 align-text-bottom animate-blink" />
      </p>

      <div class="flex flex-wrap gap-6 sm:gap-12 justify-center mt-10 animate-fade-up animate-fade-up-4">
        <div v-for="stat in animatedStats" :key="stat.label" class="text-center">
          <div class="text-2xl sm:text-3xl font-bold text-cyan tabular-nums">
            {{ stat.display }}
          </div>
          <div class="text-xs text-muted mt-1">{{ stat.label }}</div>
        </div>
      </div>

      <div class="mt-8 flex gap-4 justify-center flex-wrap animate-fade-up animate-fade-up-5">
        <a href="#contact" class="px-6 py-2.5 rounded-md text-sm font-semibold bg-spring text-white hover:bg-spring/80 hover:-translate-y-0.5 transition-all">
          Get in touch
        </a>
        <a href="/api/pdf/download" download class="px-6 py-2.5 rounded-md text-sm font-semibold border border-cyan text-cyan hover:bg-cyan/10 hover:-translate-y-0.5 transition-all">
          &#128196; Download CV
        </a>
        <a href="#experience" class="px-6 py-2.5 rounded-md text-sm border border-border text-text-primary hover:border-cyan hover:text-cyan transition-all">
          View experience
        </a>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted text-xs opacity-0 animate-fade-up" style="animation-delay: 1s;">
      <span>scroll</span>
      <div class="w-5 h-5 border-r-2 border-b-2 border-muted rotate-45 animate-scroll-bounce" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Hero } from '~/types/cv'

const props = defineProps<{ data: Hero }>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
useParticles(canvasRef)

const nameBefore = computed(() => {
  const idx = props.data.name.indexOf(props.data.highlightedPart)
  return idx > 0 ? props.data.name.slice(0, idx) : ''
})

const displayText = ref('')
let lineIndex = 0
let charIndex = 0
let deleting = false
let timeout: ReturnType<typeof setTimeout>

function type() {
  const lines = props.data.typewriterLines
  if (!lines.length) return
  const line = lines[lineIndex]
  if (!deleting) {
    charIndex++
    displayText.value = line.slice(0, charIndex)
    if (charIndex === line.length) {
      deleting = true
      timeout = setTimeout(type, 2000)
      return
    }
    timeout = setTimeout(type, 60)
  } else {
    charIndex--
    displayText.value = line.slice(0, charIndex)
    if (charIndex === 0) {
      deleting = false
      lineIndex = (lineIndex + 1) % lines.length
      timeout = setTimeout(type, 400)
      return
    }
    timeout = setTimeout(type, 35)
  }
}

const animatedStats = reactive(
  props.data.stats.map(s => ({ ...s, display: '0' }))
)

function animateCounters() {
  animatedStats.forEach((stat) => {
    let current = 0
    const step = stat.target / 50
    const timer = setInterval(() => {
      current = Math.min(current + step, stat.target)
      stat.display = Math.floor(current) + stat.suffix
      if (current >= stat.target) clearInterval(timer)
    }, 30)
  })
}

onMounted(() => {
  timeout = setTimeout(type, 800)

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(animateCounters, 600)
      observer.disconnect()
    }
  })
  const hero = document.getElementById('hero')
  if (hero) observer.observe(hero)
})

onUnmounted(() => clearTimeout(timeout))
</script>
