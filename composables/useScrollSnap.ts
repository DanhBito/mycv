export function useScrollSnap() {
  if (!import.meta.client) return

  let isScrolling = false
  let lastScrollTime = 0
  const cooldown = 800

  function getSections(): HTMLElement[] {
    return Array.from(document.querySelectorAll('section[id]'))
  }

  function getCurrentSectionIndex(sections: HTMLElement[]): number {
    const scrollY = window.scrollY + window.innerHeight / 3
    for (let i = sections.length - 1; i >= 0; i--) {
      if (sections[i].offsetTop <= scrollY) return i
    }
    return 0
  }

  function scrollToSection(section: HTMLElement) {
    isScrolling = true
    const navHeight = document.querySelector('nav')?.offsetHeight ?? 0
    const targetY = section.id === 'hero' ? 0 : section.offsetTop - navHeight

    window.scrollTo({ top: targetY, behavior: 'smooth' })
    setTimeout(() => { isScrolling = false }, cooldown)
  }

  function onWheel(e: WheelEvent) {
    const now = Date.now()
    if (isScrolling || now - lastScrollTime < cooldown) return
    if (Math.abs(e.deltaY) < 30) return

    const sections = getSections()
    if (!sections.length) return

    const currentIndex = getCurrentSectionIndex(sections)
    const direction = e.deltaY > 0 ? 1 : -1
    const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction))

    if (nextIndex !== currentIndex) {
      e.preventDefault()
      lastScrollTime = now
      scrollToSection(sections[nextIndex])
    }
  }

  let touchStartY = 0

  function onTouchStart(e: TouchEvent) {
    touchStartY = e.touches[0].clientY
  }

  function onTouchEnd(e: TouchEvent) {
    const now = Date.now()
    if (isScrolling || now - lastScrollTime < cooldown) return

    const deltaY = touchStartY - e.changedTouches[0].clientY
    if (Math.abs(deltaY) < 50) return

    const sections = getSections()
    if (!sections.length) return

    const currentIndex = getCurrentSectionIndex(sections)
    const direction = deltaY > 0 ? 1 : -1
    const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction))

    if (nextIndex !== currentIndex) {
      lastScrollTime = now
      scrollToSection(sections[nextIndex])
    }
  }

  onMounted(() => {
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchend', onTouchEnd)
  })
}
