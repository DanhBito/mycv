const STORAGE_KEY = 'theme-preference'

type Theme = 'light' | 'dark'

function getTimeBasedTheme(): Theme {
  const hour = new Date().getHours()
  return hour >= 6 && hour < 18 ? 'light' : 'dark'
}

function applyTheme(theme: Theme) {
  if (import.meta.server) return
  const html = document.documentElement
  if (theme === 'dark') {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}

const isDark = ref(true)

export function useTheme() {
  function init() {
    if (import.meta.server) return

    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    const theme = stored ?? getTimeBasedTheme()
    isDark.value = theme === 'dark'
    applyTheme(theme)
  }

  function toggle() {
    isDark.value = !isDark.value
    const theme: Theme = isDark.value ? 'dark' : 'light'
    localStorage.setItem(STORAGE_KEY, theme)
    applyTheme(theme)
  }

  init()

  return { isDark: readonly(isDark), toggle }
}
