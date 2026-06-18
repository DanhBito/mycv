export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const session = await useSession(event, { password: config.session.password })
  await session.clear()

  return { success: true }
})
