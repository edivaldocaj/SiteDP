import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function getPayloadClient() {
  const config = await configPromise
  return getPayload({ config })
}
