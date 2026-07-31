
import type { Article, Page, SiteSetting, Category } from './payload-types'
import { draftMode } from 'next/headers'

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
  const { isEnabled } = await draftMode()

  const path = isEnabled
    ? `/articles?where[slug][equals]=${encodeURIComponent(slug)}&draft=true`
    : `/articles?where[slug][equals]=${encodeURIComponent(slug)}`

  const headers: Record<string, string> = {}
  if (isEnabled) {
    headers['Authorization'] = `users API-Key ${process.env.PAYLOAD_API_KEY}`
  }

  const res = await fetch(`${PAYLOAD_API_URL}${path}`, {
    headers,
    cache: isEnabled ? 'no-store' : undefined,
    next: isEnabled ? undefined : { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Payload API error (${res.status}) fetching article ${slug}`)
  }

  const data: PayloadListResponse<Article> = await res.json()
  return data.docs[0] ?? null
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const { isEnabled } = await draftMode()

  const path = isEnabled
    ? `/pages?where[slug][equals]=${encodeURIComponent(slug)}&draft=true`
    : `/pages?where[slug][equals]=${encodeURIComponent(slug)}`

  const headers: Record<string, string> = {}
  if (isEnabled) {
    headers['Authorization'] = `users API-Key ${process.env.PAYLOAD_API_KEY}`
  }

  const res = await fetch(`${PAYLOAD_API_URL}${path}`, {
    headers,
    cache: isEnabled ? 'no-store' : undefined,
    next: isEnabled ? undefined : { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`Payload API error (${res.status}) fetching page ${slug}`)
  }

  const data: PayloadListResponse<Page> = await res.json()
  return data.docs[0] ?? null
}

export async function getArticlesByCategory(categorySlug: string) {
  return payloadFetch<PayloadListResponse<Article>>(
    `/articles?where[category.slug][equals]=${encodeURIComponent(categorySlug)}&sort=-publishedDate`
  )
}

export async function getCategoryBySlug(categorySlug: string) {
  const data = await payloadFetch<PayloadListResponse<Category>>(
    `/categories?where[slug][equals]=${encodeURIComponent(categorySlug)}&limit=1`
  )
  return data.docs[0] ?? null
}

