import type { CvData } from '~/types/cv'

const validSections: (keyof CvData)[] = [
  'seo', 'nav', 'hero', 'skills', 'experience',
  'metrics', 'education', 'contact', 'footer', 'pdf',
]

export default defineEventHandler(async (event) => {
  const section = getRouterParam(event, 'section') as keyof CvData
  if (!validSections.includes(section)) {
    throw createError({ statusCode: 400, message: `Invalid section: ${section}` })
  }

  const body = await readBody(event)
  const data = await readCvData()
  ;(data as Record<string, unknown>)[section] = body
  await writeCvData(data)

  return { success: true, section }
})
