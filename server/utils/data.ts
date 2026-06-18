import { promises as fs } from 'node:fs'
import { resolve } from 'node:path'
import type { CvData } from '~/types/cv'

const dataPath = resolve(process.cwd(), 'data/cv.json')

export async function readCvData(): Promise<CvData> {
  const raw = await fs.readFile(dataPath, 'utf-8')
  return JSON.parse(raw)
}

export async function writeCvData(data: CvData): Promise<void> {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8')
}
