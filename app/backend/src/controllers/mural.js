import { fail } from '../errors.js'
import * as entries from '../models/entry.js'
import { downloadUrl, uploadUrl } from '../models/photo.js'

export async function list({ quiz }) {
  const withPhoto = (await entries.listEntries(quiz.id)).filter((entry) => entry.photo)
  return Promise.all(withPhoto.map(async (entry) => ({ name: entry.name, url: await downloadUrl(entry.photo) })))
}

export async function upload({ user, quiz, body }) {
  if (!/^image\/(jpeg|png|webp)$/.test(body.contentType)) fail(400, 'Envie uma imagem JPG, PNG ou WebP.')
  const key = `${quiz.id}/${user.sub}`
  await entries.savePhoto(quiz.id, user, key)
  return { url: await uploadUrl(key, body.contentType) }
}
