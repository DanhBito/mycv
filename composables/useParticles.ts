interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
}

export function useParticles(canvasRef: Ref<HTMLCanvasElement | null>) {
  const { isDark } = useTheme()

  let animationId: number
  let particles: Particle[] = []
  let W = 0
  let H = 0

  function createParticle(): Particle {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    }
  }

  function initParticles() {
    const count = Math.floor((W * H) / 12000)
    particles = Array.from({ length: count }, createParticle)
  }

  function animate() {
    const canvas = canvasRef.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, W, H)

    const dotColor = isDark.value ? '0,212,255' : '2,117,255'
    const lineColor = isDark.value ? '109,179,63' : '40,100,25'
    const lineAlphaMultiplier = isDark.value ? 0.15 : 0.3

    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
        Object.assign(p, createParticle())
      }
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${dotColor},${p.alpha})`
      ctx.fill()
    }

    const maxDist = 130
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < maxDist) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(${lineColor},${(1 - dist / maxDist) * lineAlphaMultiplier})`
          ctx.lineWidth = 1
          ctx.stroke()
        }
      }
    }

    animationId = requestAnimationFrame(animate)
  }

  function resize() {
    const canvas = canvasRef.value
    if (!canvas) return
    W = canvas.width = window.innerWidth
    H = canvas.height = window.innerHeight
    initParticles()
  }

  onMounted(() => {
    resize()
    animate()
    window.addEventListener('resize', resize)
  })

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resize)
  })
}
