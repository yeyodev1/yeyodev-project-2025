import { ref, computed, reactive } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { BlogPost, BlogCategory, BlogFilters } from '@/types/blog'
import { mockPosts, mockCategories } from '@/data/blogPosts'

// Re-export de tipos para mantener compatibilidad con imports existentes
export type { BlogPost, BlogCategory, BlogFilters } from '@/types/blog'

// Estado global del blog (singleton pattern)
const blogState = reactive({
  posts: [] as BlogPost[],
  categories: [] as BlogCategory[],
  loading: false,
  error: null as string | null,
  initialized: false,
})

// Filtros reactivos
const filters = reactive<BlogFilters>({
  category: '',
  search: '',
  tags: [],
  featured: false,
})

/**
 * Composable principal para el manejo del blog
 * Implementa el patrón de estado global con reactividad de Vue 3
 */
export function useBlog() {
  // Referencias reactivas para la interfaz
  const selectedCategory: Ref<string> = ref(filters.category)
  const searchQuery: Ref<string> = ref(filters.search)
  const selectedTags: Ref<string[]> = ref([...filters.tags])
  const showFeaturedOnly: Ref<boolean> = ref(filters.featured)

  // Computed properties para filtrado inteligente
  const filteredPosts: ComputedRef<BlogPost[]> = computed(() => {
    let result = [...blogState.posts]

    // Filtro por categoría
    if (selectedCategory.value && selectedCategory.value !== 'all') {
      result = result.filter((post) => post.category === selectedCategory.value)
    }

    // Filtro por búsqueda (título, excerpt, tags)
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim()
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Filtro por tags
    if (selectedTags.value.length > 0) {
      result = result.filter((post) => selectedTags.value.some((tag) => post.tags.includes(tag)))
    }

    // Filtro por featured
    if (showFeaturedOnly.value) {
      result = result.filter((post) => post.featured)
    }

    // Ordenar por fecha de publicación (más recientes primero)
    return result.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
  })

  const featuredPosts: ComputedRef<BlogPost[]> = computed(() =>
    blogState.posts.filter((post) => post.featured),
  )

  const recentPosts: ComputedRef<BlogPost[]> = computed(() =>
    [...blogState.posts]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 5),
  )

  const allTags: ComputedRef<string[]> = computed(() => {
    const tags = new Set<string>()
    blogState.posts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  })

  // Métodos para gestión de datos
  const fetchPosts = async (): Promise<void> => {
    if (blogState.initialized) return

    try {
      blogState.loading = true
      blogState.error = null

      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      blogState.posts = mockPosts
      blogState.categories = mockCategories
      blogState.initialized = true
    } catch (error) {
      blogState.error = error instanceof Error ? error.message : 'Error desconocido'
    } finally {
      blogState.loading = false
    }
  }

  const getPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    if (!blogState.initialized) {
      await fetchPosts()
    }

    return blogState.posts.find((post) => post.slug === slug) || null
  }

  const getPostsByCategory = (categorySlug: string): BlogPost[] => {
    return blogState.posts.filter((post) => post.category === categorySlug)
  }

  const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
    return blogState.posts
      .filter(
        (post) =>
          post.id !== currentPost.id &&
          (post.category === currentPost.category ||
            post.tags.some((tag) => currentPost.tags.includes(tag))),
      )
      .slice(0, limit)
  }

  // Métodos para actualizar filtros
  const updateFilters = (newFilters: Partial<BlogFilters>): void => {
    Object.assign(filters, newFilters)

    if (newFilters.category !== undefined) selectedCategory.value = newFilters.category
    if (newFilters.search !== undefined) searchQuery.value = newFilters.search
    if (newFilters.tags !== undefined) selectedTags.value = [...newFilters.tags]
    if (newFilters.featured !== undefined) showFeaturedOnly.value = newFilters.featured
  }

  const clearFilters = (): void => {
    updateFilters({
      category: '',
      search: '',
      tags: [],
      featured: false,
    })
  }

  // Utilidades
  const formatDate = (dateString: string, locale: string = 'es-ES'): string => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  // API pública del composable
  return {
    // Estado
    posts: computed(() => blogState.posts),
    categories: computed(() => blogState.categories),
    loading: computed(() => blogState.loading),
    error: computed(() => blogState.error),

    // Filtros
    selectedCategory,
    searchQuery,
    selectedTags,
    showFeaturedOnly,

    // Computed
    filteredPosts,
    featuredPosts,
    recentPosts,
    allTags,

    // Métodos
    fetchPosts,
    getPostBySlug,
    getPostsByCategory,
    getRelatedPosts,
    updateFilters,
    clearFilters,
    formatDate,
    calculateReadingTime,
  }
}

// Composable específico para un post individual
export function useBlogPost(slug: string) {
  const post: Ref<BlogPost | null> = ref(null)
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref(null)
  const relatedPosts: Ref<BlogPost[]> = ref([])

  const { getPostBySlug, getRelatedPosts } = useBlog()

  const fetchPost = async (): Promise<void> => {
    try {
      loading.value = true
      error.value = null

      const foundPost = await getPostBySlug(slug)

      if (!foundPost) {
        error.value = 'Post no encontrado'
        return
      }

      post.value = foundPost
      relatedPosts.value = getRelatedPosts(foundPost)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error desconocido'
    } finally {
      loading.value = false
    }
  }

  return {
    post,
    loading,
    error,
    relatedPosts,
    fetchPost,
  }
}
