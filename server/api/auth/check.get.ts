export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const session = await useSession(event, { password: config.session.password })

  return { authenticated: session.data?.authenticated === true }
})
