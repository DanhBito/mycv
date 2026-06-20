<template>
  <div v-if="!loading && !error" class="weather-widget relative group cursor-default">
    <div class="weather-pill" :class="weatherCondition">
      <!-- Sunny -->
      <template v-if="weatherCondition === 'clear'">
        <div class="wp-sun">
          <div class="wp-sun-core" />
          <div class="wp-sun-ring" />
          <div class="wp-sun-ring wp-sun-ring-2" />
        </div>
        <div class="wp-ray wp-ray-1" />
        <div class="wp-ray wp-ray-2" />
        <div class="wp-ray wp-ray-3" />
        <div class="wp-ray wp-ray-4" />
        <div class="wp-ray wp-ray-5" />
        <div class="wp-sparkle wp-sparkle-1" />
        <div class="wp-sparkle wp-sparkle-2" />
        <div class="wp-sparkle wp-sparkle-3" />
      </template>

      <!-- Clouds -->
      <template v-else-if="weatherCondition === 'clouds'">
        <div class="wp-cloud wp-cloud-bg" />
        <div class="wp-cloud wp-cloud-md" />
        <div class="wp-cloud wp-cloud-fg" />
        <div class="wp-cloud wp-cloud-sm" />
      </template>

      <!-- Rain -->
      <template v-else-if="weatherCondition === 'rain' || weatherCondition === 'drizzle'">
        <div class="wp-cloud wp-rain-cloud" />
        <div class="wp-cloud wp-rain-cloud-2" />
        <div class="wp-drop wp-drop-1" />
        <div class="wp-drop wp-drop-2" />
        <div class="wp-drop wp-drop-3" />
        <div class="wp-drop wp-drop-4" />
        <div class="wp-drop wp-drop-5" />
        <div class="wp-drop wp-drop-6" />
        <div class="wp-drop wp-drop-7" />
        <div class="wp-drop wp-drop-8" />
        <div class="wp-ripple wp-ripple-1" />
        <div class="wp-ripple wp-ripple-2" />
      </template>

      <!-- Thunderstorm -->
      <template v-else-if="weatherCondition === 'thunderstorm'">
        <div class="wp-cloud wp-storm-cloud" />
        <div class="wp-cloud wp-storm-cloud-2" />
        <div class="wp-bolt wp-bolt-1" />
        <div class="wp-bolt wp-bolt-2" />
        <div class="wp-drop wp-drop-1" />
        <div class="wp-drop wp-drop-3" />
        <div class="wp-drop wp-drop-5" />
        <div class="wp-drop wp-drop-7" />
        <div class="wp-storm-flash" />
      </template>

      <!-- Snow -->
      <template v-else-if="weatherCondition === 'snow'">
        <div class="wp-cloud wp-snow-cloud" />
        <div class="wp-cloud wp-snow-cloud-2" />
        <div class="wp-flake wp-flake-1">❄</div>
        <div class="wp-flake wp-flake-2">❄</div>
        <div class="wp-flake wp-flake-3">❄</div>
        <div class="wp-flake wp-flake-4">❄</div>
        <div class="wp-flake wp-flake-5">❄</div>
        <div class="wp-flake wp-flake-6">•</div>
        <div class="wp-flake wp-flake-7">•</div>
      </template>

      <!-- Mist -->
      <template v-else-if="weatherCondition === 'mist'">
        <div class="wp-mist wp-mist-1" />
        <div class="wp-mist wp-mist-2" />
        <div class="wp-mist wp-mist-3" />
        <div class="wp-mist wp-mist-4" />
        <div class="wp-mist wp-mist-5" />
      </template>

      <!-- Temperature overlay -->
      <span v-if="weather" class="wp-temp">{{ weather.temp }}°</span>
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
    </div>
  </div>
</template>

<script setup lang="ts">
const { weather, weatherCondition, loading, error } = useWeather()
</script>
