import { S3Client } from '@aws-sdk/client-s3'
import { BUCKET_ACCESS_KEY_ID, BUCKET_ENDPOINT, BUCKET_REGION, BUCKET_SECRET_ACCESS_KEY } from '../constants.mjs'

export const s3 = new S3Client({
  credentials: {
    accessKeyId: BUCKET_ACCESS_KEY_ID,
    secretAccessKey: BUCKET_SECRET_ACCESS_KEY
  },
  region: BUCKET_REGION,
  endpoint: BUCKET_ENDPOINT
})
