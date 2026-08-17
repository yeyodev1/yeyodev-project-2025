// Tipos TypeScript para el sistema de blog
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  publishedAt: string
  updatedAt: string
  readingTime: number
  category: string
  tags: string[]
  featured: boolean
  coverImage: {
    url: string
    alt: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string
  count: number
}

export interface BlogFilters {
  category: string
  search: string
  tags: string[]
  featured: boolean
}
