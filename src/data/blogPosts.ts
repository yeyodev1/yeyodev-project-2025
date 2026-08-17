import type { BlogPost, BlogCategory } from '@/types/blog'

// Mock data para desarrollo (en producción vendría de una API)
export const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Construyendo Aplicaciones Escalables con Vue 3 y TypeScript',
    slug: 'vue3-typescript-aplicaciones-escalables',
    excerpt:
      'Descubre las mejores prácticas para crear aplicaciones Vue 3 robustas y mantenibles usando TypeScript, Composition API y arquitectura limpia.',
    content: `
      <h2>Introducción</h2>
      <p>Vue 3 junto con TypeScript representa una combinación poderosa para el desarrollo frontend moderno...</p>

      <h2>Composition API: El Nuevo Paradigma</h2>
      <p>La Composition API nos permite organizar mejor la lógica de nuestros componentes...</p>

      <h2>Arquitectura Escalable</h2>
      <p>Para proyectos grandes, es crucial establecer una arquitectura sólida desde el inicio...</p>

      <h2>Conclusiones</h2>
      <p>Vue 3 con TypeScript nos proporciona las herramientas necesarias para construir aplicaciones robustas...</p>
    `,
    author: {
      name: 'Diego Reyes',
      avatar: '/images/avatar.jpg',
      bio: 'Frontend Developer especializado en Vue.js y arquitectura de software',
    },
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    readingTime: 8,
    category: 'desarrollo',
    tags: ['Vue.js', 'TypeScript', 'Frontend', 'Arquitectura'],
    featured: true,
    coverImage: {
      url: '/images/blog/vue3-typescript.jpg',
      alt: 'Vue 3 y TypeScript código en pantalla',
    },
    seo: {
      metaTitle: 'Vue 3 + TypeScript: Guía Completa para Aplicaciones Escalables',
      metaDescription:
        'Aprende a construir aplicaciones Vue 3 escalables con TypeScript. Guía completa con mejores prácticas y ejemplos reales.',
      keywords: ['Vue 3', 'TypeScript', 'Frontend', 'Desarrollo Web', 'JavaScript'],
    },
  },
  {
    id: '2',
    title: 'Optimización de Performance en Aplicaciones Web Modernas',
    slug: 'optimizacion-performance-web-modernas',
    excerpt:
      'Técnicas avanzadas para mejorar el rendimiento de tus aplicaciones web: lazy loading, code splitting, y optimización de assets.',
    content: `
      <h2>Core Web Vitals</h2>
      <p>Los Core Web Vitals son métricas esenciales para medir la experiencia del usuario...</p>

      <h2>Lazy Loading y Code Splitting</h2>
      <p>Estas técnicas nos permiten cargar solo el código necesario cuando se necesita...</p>

      <h2>Optimización de Assets</h2>
      <p>Las imágenes y otros recursos pueden impactar significativamente el rendimiento...</p>
    `,
    author: {
      name: 'Diego Reyes',
      avatar: '/images/avatar.jpg',
      bio: 'Frontend Developer especializado en Vue.js y arquitectura de software',
    },
    publishedAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    readingTime: 12,
    category: 'performance',
    tags: ['Performance', 'Optimización', 'Web Vitals', 'UX'],
    featured: false,
    coverImage: {
      url: '/images/blog/performance-optimization.jpg',
      alt: 'Gráficos de performance y métricas web',
    },
    seo: {
      metaTitle: 'Optimización de Performance Web: Guía Completa 2024',
      metaDescription:
        'Mejora el rendimiento de tu web con técnicas avanzadas de optimización. Lazy loading, code splitting y más.',
      keywords: ['Performance', 'Optimización Web', 'Core Web Vitals', 'UX'],
    },
  },
  {
    id: '3',
    title: 'Design Systems: Creando Consistencia en Equipos de Desarrollo',
    slug: 'design-systems-consistencia-equipos',
    excerpt:
      'Cómo implementar un design system efectivo que mejore la colaboración entre diseñadores y desarrolladores.',
    content: `
      <h2>¿Qué es un Design System?</h2>
      <p>Un design system es mucho más que una librería de componentes...</p>

      <h2>Beneficios para el Equipo</h2>
      <p>La implementación de un design system trae múltiples beneficios...</p>

      <h2>Implementación Práctica</h2>
      <p>Veamos cómo implementar un design system desde cero...</p>
    `,
    author: {
      name: 'Diego Reyes',
      avatar: '/images/avatar.jpg',
      bio: 'Frontend Developer especializado en Vue.js y arquitectura de software',
    },
    publishedAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
    readingTime: 10,
    category: 'design',
    tags: ['Design System', 'UI/UX', 'Componentes', 'Colaboración'],
    featured: true,
    coverImage: {
      url: '/images/blog/design-systems.jpg',
      alt: 'Componentes de design system organizados',
    },
    seo: {
      metaTitle: 'Design Systems: Guía Completa para Equipos de Desarrollo',
      metaDescription:
        'Aprende a crear y mantener design systems efectivos. Mejora la consistencia y colaboración en tu equipo.',
      keywords: ['Design System', 'UI', 'UX', 'Componentes', 'Frontend'],
    },
  },
]

export const mockCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'Desarrollo',
    slug: 'desarrollo',
    description: 'Artículos sobre desarrollo frontend y backend',
    count: 1,
  },
  {
    id: '2',
    name: 'Performance',
    slug: 'performance',
    description: 'Optimización y rendimiento web',
    count: 1,
  },
  { id: '3', name: 'Design', slug: 'design', description: 'Design systems y UI/UX', count: 1 },
  {
    id: '4',
    name: 'Arquitectura',
    slug: 'arquitectura',
    description: 'Patrones y arquitectura de software',
    count: 0,
  },
]
