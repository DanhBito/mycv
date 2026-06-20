interface WeatherData {
  condition: string
  description: string
  temp: number
  city: string
  icon: string
}

export type WeatherCondition = 'clear' | 'clouds' | 'rain' | 'drizzle' | 'thunderstorm' | 'snow' | 'mist'

function mapCondition(condition: string): WeatherCondition {
  const c = condition.toLowerCase()
  if (c === 'thunderstorm') return 'thunderstorm'
  if (c === 'drizzle' || c === 'rain') return 'rain'
  if (c === 'snow') return 'snow'
  if (['mist', 'smoke', 'haze', 'dust', 'fog', 'sand', 'ash', 'squall', 'tornado'].includes(c)) return 'mist'
  if (c === 'clouds') return 'clouds'
  return 'clear'
}

const AUTO_REFRESH_INTERVAL = 60 *60 * 1000

export function useWeather() {
  const weather = ref<WeatherData | null>(null)
  const weatherCondition = ref<WeatherCondition>('clear')
  const loading = ref(false)
  const error = ref(false)

  let lastLat: number | null = null
  let lastLon: number | null = null
  let refreshTimer: ReturnType<typeof setInterval> | null = null

  async function fetchWeather(lat: number, lon: number) {
    lastLat = lat
    lastLon = lon
    try {
      const data = await $fetch<WeatherData>('/api/weather', {
        params: { lat, lon },
      })
      weather.value = data
      weatherCondition.value = mapCondition(data.condition)
      error.value = false
    } catch {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  async function fetchWeatherByIp() {
    lastLat = null
    lastLon = null
    try {
      const data = await $fetch<WeatherData>('/api/weather')
      weather.value = data
      weatherCondition.value = mapCondition(data.condition)
      error.value = false
    } catch {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  function refresh() {
    if (lastLat !== null && lastLon !== null) {
      fetchWeather(lastLat, lastLon)
    } else {
      fetchWeatherByIp()
    }
  }

  function startAutoRefresh() {
    refreshTimer = setInterval(refresh, AUTO_REFRESH_INTERVAL)
  }

  function init() {
    if (!navigator.geolocation) {
      fetchWeatherByIp()
      startAutoRefresh()
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeather(pos.coords.latitude, pos.coords.longitude)
        startAutoRefresh()
      },
      () => {
        fetchWeatherByIp()
        startAutoRefresh()
      },
      { timeout: 5000 }
    )
  }

  onMounted(init)

  onUnmounted(() => {
    if (refreshTimer) {
      clearInterval(refreshTimer)
      refreshTimer = null
    }
  })

  return { weather, weatherCondition, loading, error }
}
