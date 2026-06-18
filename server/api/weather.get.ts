function isPublicIp(ip: string): boolean {
  if (!ip || ip === '::1' || ip === '127.0.0.1') return false
  if (ip.startsWith('10.') || ip.startsWith('192.168.') || ip.startsWith('172.')) return false
  if (ip.startsWith('::ffff:127.') || ip.startsWith('fe80:') || ip.startsWith('fc') || ip.startsWith('fd')) return false
  return true
}

async function getLocationByIp(ip: string): Promise<{ lat: string; lon: string }> {
  try {
    const endpoint = isPublicIp(ip)
      ? `http://ip-api.com/json/${ip}?fields=lat,lon,status`
      : 'http://ip-api.com/json/?fields=lat,lon,status'
    const res = await fetch(endpoint)
    const data = await res.json()
    if (data.status === 'success') {
      return { lat: String(data.lat), lon: String(data.lon) }
    }
  } catch {
    // ignore
  }
  return { lat: '10.8231', lon: '106.6297' }
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  let lat = query.lat as string
  let lon = query.lon as string

  if (!lat || !lon) {
    const clientIp = getRequestIP(event, { xForwardedFor: true }) || ''
    const location = await getLocationByIp(clientIp)
    console.log('[weather] location by IP', clientIp, location)
    lat = location.lat
    lon = location.lon
  }

  const apiKey = useRuntimeConfig().weatherApiKey
  if (!apiKey) {
    throw createError({ statusCode: 500, statusMessage: 'Weather API key not configured' })
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=${apiKey}&units=metric`

  const res = await fetch(url)
  if (!res.ok) {
    const body = await res.text()
    console.error('[weather]', res.status, body)
    throw createError({ statusCode: 502, statusMessage: 'Weather service unavailable' })
  }

  const data = await res.json()

  return {
    condition: data.weather?.[0]?.main ?? 'Clear',
    description: data.weather?.[0]?.description ?? '',
    temp: Math.round(data.main?.temp ?? 0),
    city: data.name ?? '',
    icon: data.weather?.[0]?.icon ?? '01d',
  }
})
