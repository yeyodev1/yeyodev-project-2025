<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogPost } from '@/composables/useBlog'
import BlogPostToolbar from '@/components/blog/BlogPostToolbar.vue'
import type { PostFontSize } from '@/components/blog/BlogPostToolbar.vue'
import BlogPostHeader from '@/components/blog/BlogPostHeader.vue'

const route = useRoute()
const slug = route.params.slug as string
const { post, loading, error, fetchPost } = useBlogPost(slug)

// Estados para personalización
const fontSize = ref<PostFontSize>('medium')
const isDarkMode = ref(true)

// Computed para clases CSS
const containerClasses = computed(() => ({
  'post-view': true,
  'post-view--dark': isDarkMode.value,
  'post-view--light': !isDarkMode.value,
  [`post-view--${fontSize.value}`]: true,
}))

// Lifecycle
onMounted(() => {
  fetchPost()
})

// Métodos
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}

const changeFontSize = (size: PostFontSize) => {
  fontSize.value = size
}
</script>

<template>
  <div :class="containerClasses">
    <!-- Controles de personalización -->
    <BlogPostToolbar
      :font-size="fontSize"
      :is-dark-mode="isDarkMode"
      @font-size-change="changeFontSize"
      @theme-toggle="toggleTheme"
    />

    <!-- Loading State -->
    <div v-if="loading" class="post-loading">
      <div class="loading-spinner"></div>
      <p>Cargando artículo...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="post-error">
      <h2>❌ Error</h2>
      <p>{{ error }}</p>
    </div>

    <!-- Post Content -->
    <article v-else-if="post" class="post-content">
      <!-- Header -->
      <BlogPostHeader :post="post" />

      <!-- Content -->
      <div class="post-body" v-html="post.content"></div>

      <!-- Tags -->
      <footer class="post-footer">
        <div class="post-tags">
          <span v-for="tag in post.tags" :key="tag" class="tag"> #{{ tag }} </span>
        </div>
      </footer>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.post-view {
  min-height: 100vh;
  padding: 2rem 1rem;
  transition: all 0.3s ease;

  // Modo oscuro (por defecto)
  &--dark {
    background: linear-gradient(
      135deg,
      $YEYO-VIOLET 0%,
      rgba(26, 26, 46, 0.95) 20%,
      rgba(22, 33, 62, 0.9) 100%
    );
    color: rgba(255, 255, 255, 0.9);
  }

  // Modo claro
  &--light {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 20%, #cbd5e1 100%);
    color: #1a202c;
  }

  // Tamaños de fuente
  &--small {
    .post-body {
      font-size: 0.9rem;
      line-height: 1.6;
    }
    :deep(.post-title) {
      font-size: 2rem;
    }
  }

  &--medium {
    .post-body {
      font-size: 1.1rem;
      line-height: 1.7;
    }
    :deep(.post-title) {
      font-size: 2.5rem;
    }
  }

  &--large {
    .post-body {
      font-size: 1.3rem;
      line-height: 1.8;
    }
    :deep(.post-title) {
      font-size: 3rem;
    }
  }
}

// Estados de carga y error
.post-loading,
.post-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(79, 172, 254, 0.3);
    border-top: 3px solid #4facfe;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
}

// Contenido del post
.post-content {
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);

  .post-view--light & {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
}

.post-body {
  margin-bottom: 3rem;

  :deep(h2) {
    font-size: 1.8rem;
    margin: 2rem 0 1rem;
    color: #4facfe;
    font-weight: 600;
  }

  :deep(p) {
    margin-bottom: 1.5rem;
    text-align: justify;
  }

  :deep(code) {
    background: rgba(79, 172, 254, 0.2);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-family: 'Fira Code', monospace;
  }
}

.post-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;

  .post-view--light & {
    border-top-color: rgba(0, 0, 0, 0.1);
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;

    .tag {
      padding: 0.5rem 1rem;
      background: rgba(79, 172, 254, 0.2);
      border-radius: 20px;
      font-size: 0.9rem;
      color: #4facfe;
      font-weight: 500;
    }
  }
}

// Animaciones
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// Responsive
@media (max-width: 768px) {
  .post-view {
    padding: 1rem 0.5rem;

    &--small :deep(.post-title) {
      font-size: 1.5rem;
    }
    &--medium :deep(.post-title) {
      font-size: 2rem;
    }
    &--large :deep(.post-title) {
      font-size: 2.5rem;
    }
  }

  .post-content {
    padding: 2rem 1.5rem;
    margin: 0 0.5rem;
  }
}

@media (max-width: 480px) {
  .post-content {
    padding: 1.5rem 1rem;
  }
}
</style>
