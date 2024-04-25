import { SVG_FOLDER, TYPES_FOLDER } from './constants.mjs'
import { createFolder, getIconNames, writeToFile } from './api/fileSystemIO.mjs'

const groupIconsBySize = (iconNames: string[]) => {
  const groupedIcons: { [key: string]: string[] } = {}

  iconNames.forEach((iconName) => {
    const [size, name] = iconName.split('-')

    if (groupedIcons[size]) {
      groupedIcons[size].push(name)
    } else {
      groupedIcons[size] = [name]
    }
  })

  return groupedIcons
}

const generate = async () => {
  const iconNames = await getIconNames(SVG_FOLDER)
  const groupedIcons = groupIconsBySize(iconNames)
  const newLine = '\n'

  const types = Object.entries(groupedIcons).map(([size, names]) => {
    return `${newLine}  ${size}: '${names.join('\' | \'')}'${newLine}`
  })

  const fileData = `/* eslint-disable max-lines */${newLine}export type TIconNameBySize = {${types.join(' , ')}}`

  const names = Object.entries(groupedIcons).map(([size, names]) => {
    return `{${newLine}  size: ${size}, names: ['${names.join('\', \'')}']${newLine}  }`
  })

  const fileNames = `/* eslint-disable max-lines */${newLine}export const allIcons = [${names}]`

  await createFolder(TYPES_FOLDER)
  await writeToFile(`${TYPES_FOLDER}/types.auto.ts`, fileData)
  await writeToFile(`${TYPES_FOLDER}/names.auto.ts`, fileNames)
}

await generate()
