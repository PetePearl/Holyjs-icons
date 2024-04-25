import fs from 'fs/promises'
import fspath from 'path'
import { createReadStream } from 'fs'
import { logger } from '../../../utils/logger.mjs'


export const createFolder = async (path: string) => {
  try {
    await fs.access(path)
  } catch {
    await fs.mkdir(path)
  }
}

export const writeToFile = async (filename: string, data: string | NodeJS.ArrayBufferView) => {
  try {
    await fs.writeFile(filename, data)
    logger.debug(`The file ${filename} has been saved!`)
  } catch (error) {
    logger.error(error)
  }
}

export const getIconNames = async (folderPath: string) => {
  try {
    const dirContents = await fs.readdir(folderPath)
    return dirContents.map((fileName) => fileName.split('.')[0])
  } catch (error) {
    logger.error(error)
    return []
  }
}

export const getIconPaths = async (folderPath: string) => {
  try {
    const dirContents = await fs.readdir(folderPath)
    return dirContents.map((fileName) => fspath.resolve(folderPath, fileName))
  } catch (error) {
    logger.error(error)
    return []
  }
}

export const getBaseName = (iconPath: string) => fspath.basename(iconPath)

export const getReadStream = (iconPath: string) => createReadStream(iconPath)
