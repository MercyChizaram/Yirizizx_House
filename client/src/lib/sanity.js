const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2025-01-01'

const query = `*[_type == "product" && isAvailable != false] | order(_createdAt desc) {
  _id, title, price, currency, category, description, "imageUrl": image.asset->url,
  "imageAlt": image.alt, imageDescription, whatsappNumber
}`

const socialQuery = `*[_type == "siteSettings"][0]{socialLinks[]{platform, url}}`

export async function getProducts(signal) {
  if (!projectId) return null
  const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`Sanity returned ${response.status}`)
  const { result } = await response.json()
  return result
}

export async function getSocialLinks(signal) {
  if (!projectId) return null
  const url = `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(socialQuery)}`
  const response = await fetch(url, { signal })
  if (!response.ok) throw new Error(`Sanity returned ${response.status}`)
  const { result } = await response.json()
  return result?.socialLinks || []
}
