export default defineEventHandler(async (event) => {
  const { activeId } = await readBody<{ activeId: string }>(event)
  const data = await readCvData()

  const exists = data.pdf.files.some(f => f.id === activeId)
  if (!exists) {
    throw createError({ statusCode: 400, message: `PDF id "${activeId}" not found` })
  }

  data.pdf.activeId = activeId
  await writeCvData(data)

  return { success: true, activeId }
})
