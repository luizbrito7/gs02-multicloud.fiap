import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({
  forcePathStyle: Boolean(process.env.AWS_ENDPOINT_URL_S3),
  requestChecksumCalculation: 'WHEN_REQUIRED',
})
const Bucket = process.env.BUCKET_NAME

export const uploadUrl = (Key, ContentType) =>
  getSignedUrl(s3, new PutObjectCommand({ Bucket, Key, ContentType }), { expiresIn: 300 })

export const downloadUrl = (Key) =>
  getSignedUrl(s3, new GetObjectCommand({ Bucket, Key }), { expiresIn: 300 })
