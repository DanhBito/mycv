import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'Missing PDF id' })
  }

  const data = await readCvData()
  const fileIndex = data.pdf.files.findIndex(f => f.id === id)
  if (fileIndex === -1) {
    throw createError({ statusCode: 404, message: `PDF "${id}" not found` })
  }

  if (data.pdf.activeId === id) {
    throw createError({ statusCode: 400, message: 'Cannot delete the active PDF. Switch to another PDF first.' })
  }

  const filename = data.pdf.files[fileIndex].filename
  data.pdf.files.splice(fileIndex, 1)
  await writeCvData(data)

  const filePath = resolve('public/cv', filename)
  try {
    await fs.unlink(filePath)
  } catch {
    // file may not exist on disk, that's ok
  }

  return { success: true, id }
})
