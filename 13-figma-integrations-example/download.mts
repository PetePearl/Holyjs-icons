import axios from 'axios'
import { logger } from './utils/logger.mjs'

import { TComponents, TDownloadResponse, TSelectedNode } from './types'
import figmaRestApi from './api/figmaAxiosInstance.mjs'
import { FIGMA_PROJECT_ID, FIGMA_ROOT_NODE_ID, MAX_BATCH_SIZE, SKIP_CACHED, SVG_FOLDER } from './constants.mjs'
import { createFolder, getIconNames, writeToFile } from './api/fileSystemIO.mjs'

const selectNodes = (nodes: TComponents, skipList: string[]) => {
  const selectedNodes: TSelectedNode[] = []

  Object.entries(nodes).forEach(([nodeId, nodeData]) => {
    const formatedName = nodeData.name.replace(' / ', '-')

    if (!skipList.includes(formatedName)) {
      selectedNodes.push({ id: nodeId, name: formatedName })
    }
  })

  return selectedNodes
}

const getDownloadLinks = async (nodes: TSelectedNode[]) => {
  const requestIds = nodes.map((node) => node.id)

  const { data } = await figmaRestApi.get<TDownloadResponse>(
    `images/${FIGMA_PROJECT_ID}/?ids=${requestIds.join(',')}&format=svg`
  )

  return data
}

const download = async () => {
  try {
    await createFolder(SVG_FOLDER)

    const response = await figmaRestApi.get(
      `files/${FIGMA_PROJECT_ID}/nodes?ids=${FIGMA_ROOT_NODE_ID}`
    )
    const componentNodes = response.data.nodes[FIGMA_ROOT_NODE_ID].components
    const existingIcons = SKIP_CACHED ? await getIconNames(SVG_FOLDER) : []
    const selectedNodes = selectNodes(componentNodes, existingIcons)

    logger.debug(`Number of SVGs to download: ${selectedNodes.length}`)

    const batches = []

    for (let i = 0; i < selectedNodes.length; i += MAX_BATCH_SIZE) {
      batches.push(selectedNodes.slice(i, i + MAX_BATCH_SIZE))
    }

    // скачиваем svg пачками по n-штук
    batches.forEach(async (batch) => {
      const { images: downloadLinks } = await getDownloadLinks(batch)

      Object.entries(downloadLinks).forEach(async ([nodeId, nodeLink]) => {
        const selectedNode = batch.find((node) => nodeId === node.id)

        if (selectedNode) {
          const svgData = await axios.get(nodeLink)
          await writeToFile(`${SVG_FOLDER}/${selectedNode.name}.svg`, svgData.data)
        } else {
          logger.error(`Node name for node ${nodeId} not found!`)
        }
      })
    })
  } catch (error) {
    logger.error(error)
  }
}

await download()
