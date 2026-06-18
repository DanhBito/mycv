import { promises as fs } from 'node:fs'
import { resolve, extname } from 'node:path'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)
  if (!formData || !formData.length) {
    throw createError({ statusCode: 400, message: 'No file uploaded' })
  }

  const file = formData.find(f => f.name === 'file')
  const labelField = formData.find(f => f.name === 'label')

  if (!file || !file.filename || !file.data) {
    throw createError({ statusCode: 400, message: 'Missing file' })
  }

  if (extname(file.filename).toLowerCase() !== '.pdf') {
    throw createError({ statusCode: 400, message: 'Only PDF files are allowed' })
  }

  const filename = file.filename.replace(/[^a-zA-Z0-9._-]/g, '_')
  const label = labelField?.data?.toString() || filename.replace('.pdf', '')
  const id = filename.replace('.pdf', '').toLowerCase().replace(/[^a-z0-9]/g, '_')

  const destPath = resolve('public/cv', filename)
  await fs.writeFile(destPath, file.data)

  const data = await readCvData()
  const exists = data.pdf.files.some(f => f.id === id)
  if (!exists) {
    data.pdf.files.push({ id, filename, label })
    await writeCvData(data)
  }

  return { success: true, id, filename, label }
})
