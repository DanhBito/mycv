<template>
  <div v-if="!loading" class="weather-widget relative group cursor-default">
    <div class="weather-inner">
      <span class="wp-temp">{{ error ? '--' : `${displayTemp}` }}°</span>
      <div class="weather-pill">
        <img :src="weatherGif" :alt="weatherCondition" class="wp-gif" />
      </div>
    </div>

    <!-- Tooltip -->
    <div class="weather-tooltip">
      <template v-if="weather">
        <span class="weather-tooltip-temp">{{ weather.temp }}°C</span>
        <span class="weather-tooltip-sep">·</span>
        <span>{{ weather.description }}</span>
        <span class="weather-tooltip-sep">·</span>
        <span class="weather-tooltip-city">{{ weather.city }}</span>
      </template>
      <span v-else>Weather unavailable</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { weather, weatherCondition, loading, error } = useWeather()

const gifMap: Record<string, string> = {
  clear: '/weather/sun.gif',
  clouds: '/weather/cloudy.gif',
  rain: '/weather/rain.gif',
  drizzle: '/weather/rain.gif',
  thunderstorm: '/weather/storm.gif',
  snow: '/weather/snow.gif',
  mist: '/weather/mist.gif',
}

const weatherGif = computed(() => gifMap[weatherCondition.value] || '/weather/sun.gif')

const displayTemp = ref(0)
let animFrame: number | null = null

watch(() => weather.value?.temp, (target) => {
  if (target == null) return
  if (animFrame) cancelAnimationFrame(animFrame)

  const start = displayTemp.value
  const diff = target - start
  const duration = 800
  const startTime = performance.now()

  function step(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)
    displayTemp.value = Math.round(start + diff * ease)

    if (progress < 1) {
      animFrame = requestAnimationFrame(step)
    }
  }

  animFrame = requestAnimationFrame(step)
})
</script>
