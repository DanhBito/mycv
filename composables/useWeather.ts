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

export function useWeather() {
  const weather = ref<WeatherData | null>(null)
  const weatherCondition = ref<WeatherCondition>('clear')
  const loading = ref(true)
  const error = ref(false)

  async function fetchWeather(lat: number, lon: number) {
    try {
      const data = await $fetch<WeatherData>('/api/weather', {
        params: { lat, lon },
      })
      weather.value = data
      weatherCondition.value = mapCondition(data.condition)
    } catch {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  async function fetchWeatherByIp() {
    try {
      const data = await $fetch<WeatherData>('/api/weather')
      weather.value = data
      weatherCondition.value = mapCondition(data.condition)
    } catch {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  function init() {
    if (!navigator.geolocation) {
      fetchWeatherByIp()
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => fetchWeatherByIp(),
      { timeout: 5000 }
    )
  }

  onMounted(init)

  return { weather, weatherCondition, loading, error }
}
