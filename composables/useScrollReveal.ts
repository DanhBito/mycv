export function useScrollReveal() {
  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12 }
    )

    document.querySelectorAll('.reveal, .timeline-item').forEach((el) => {
      observer.observe(el)
    })

    onUnmounted(() => observer.disconnect())
  })
}
