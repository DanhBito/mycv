export default defineEventHandler(async (event) => {
  const { password } = await readBody<{ password: string }>(event)
  const config = useRuntimeConfig()

  if (!config.adminPassword) {
    throw createError({ statusCode: 500, message: 'Admin password not configured' })
  }

  if (password !== config.adminPassword) {
    throw createError({ statusCode: 401, message: 'Invalid password' })
  }

  const session = await useSession(event, { password: config.session.password })
  await session.update({ authenticated: true })

  return { success: true }
})
