import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'

export default defineEventHandler(async (event) => {
  const data = await readCvData()
  const activeFile = data.pdf.files.find(f => f.id === data.pdf.activeId)
  if (!activeFile) {
    throw createError({ statusCode: 404, message: 'No active PDF configured' })
  }

  const filePath = resolve('public/cv', activeFile.filename)
  const fileBuffer = await fs.readFile(filePath)

  setHeaders(event, {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="${activeFile.filename}"`,
  })

  return fileBuffer
})
