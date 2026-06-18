const protectedRoutes: Array<{ path: string; methods: string[] }> = [
  { path: '/api/cv/', methods: ['PUT'] },
  { path: '/api/pdf/config', methods: ['PUT'] },
  { path: '/api/pdf/upload', methods: ['POST'] },
  { path: '/api/pdf/', methods: ['DELETE'] },
]

export default defineEventHandler(async (event) => {
  const method = getMethod(event)
  const path = getRequestURL(event).pathname

  const isProtected = protectedRoutes.some(
    r => path.startsWith(r.path) && r.methods.includes(method),
  )
  if (!isProtected) return

  const config = useRuntimeConfig()
  const session = await useSession(event, { password: config.session.password })

  if (!session.data?.authenticated) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
})
