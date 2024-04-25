import { PutObjectCommand } from '@aws-sdk/client-s3'
import { BUCKET_NAME, BUCKET_SVG_FOLDER, UPLOAD_FROM_FOLDER } from './constants.mjs'
import { logger } from './utils/logger.mjs'
import { getBaseName, getIconPaths, getReadStream } from './api/fileSystemIO.mjs'
import { s3 } from './api/s3ClientInstance.mjs'

const upload = async () => {
  const iconPaths = await getIconPaths(UPLOAD_FROM_FOLDER)
  iconPaths.forEach(async (iconPath) => {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `${BUCKET_SVG_FOLDER}/${getBaseName(iconPath)}`,
      Body: getReadStream(iconPath),
      ContentType: 'image/svg+xml'
    })
    try {
      const response = await s3.send(command)
      if (response.$metadata.httpStatusCode === 200) {
        logger.debug(`Success upload to ${command.input.Key}`)
      } else {
        throw new Error(`FAILED upload to ${command.input.Key}`)
      }
    } catch (error) {
      logger.error(error)
    }
  })
}

upload()
