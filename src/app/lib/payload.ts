import type { Article, Page, SiteSetting } from './types/payload-types'

const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL || 'http://localhost:3000/api'

interface PayloadListResponse<T> {
  docs: T[]
  totalDocs: number
  hasNextPage: boolean
  hasPrevPage: boolean
  page: number
  totalPages: number
}

async function payloadFetch<T>(path: string, revalidate = 60): Promise<T> {
  const res = await fetch(`${PAYLOAD_API_URL}${path}`, {
    next: { revalidate },
  })

  if (!res.ok) {
    throw new Error(`Payload API error (${res.status}) fetching ${path}`)
  }

  return res.json()
}

export async function getSiteSettings(): Promise<SiteSetting> {
  return payloadFetch<SiteSetting>('/globals/site-settings')
}

export async function getArticles(): Promise<PayloadListResponse<Article>> {
  return payloadFetch<PayloadListResponse<Article>>('/articles?sort=-publishedDate')
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const data = await payloadFetch<PayloadListResponse<Article>>(
    `/articles?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`
  )
  return data.docs[0] ?? null
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const data = await payloadFetch<PayloadListResponse<Page>>(
    `/pages?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`
  )
  return data.docs[0] ?? null
}