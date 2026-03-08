<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGithub } from '@/composables/useGithub'
import { useCountUp, fmtNum } from '@/composables/useCountUp'

const { t } = useI18n()

const {
  user, topRepos, recentCommits, totalStars,
  totalCommits, yearsData, maxYearCommits,
  loading, error, load, loadCommitsByYear,
} = useGithub()

// ── Count-up instances ────────────────────────────────────────────────────────
const { display: displayTotal, run: runTotal } = useCountUp(2200)
const { display: displayStars, run: runStars } = useCountUp(1800)
const { display: displayRepos, run: runRepos } = useCountUp(1600)

// Per-year display map (animated independently)
const yearDisplays = ref<Record<number, number>>({})
const yearFrames: Record<number, number> = {}

function animateYear(year: number, target: number, delay: number) {
  if (target <= 0) { yearDisplays.value[year] = 0; return }
  setTimeout(() => {
    const duration = 1800
    const startTime = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      yearDisplays.value[year] = Math.round(target * eased)
      if (t < 1) yearFrames[year] = requestAnimationFrame(tick)
    }
    yearFrames[year] = requestAnimationFrame(tick)
  }, delay)
}

onUnmounted(() => {
  Object.values(yearFrames).forEach(f => cancelAnimationFrame(f))
})

// ── Intersection Observer ─────────────────────────────────────────────────────
const sectionRef = ref<HTMLElement | null>(null)
const isVisible  = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  load()
  loadCommitsByYear()

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.1 },
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onUnmounted(() => observer?.disconnect())

// ── Trigger animations when visible + data ready ──────────────────────────────
let totalTriggered = false
let yearsTriggered = false

watch([isVisible, totalCommits, totalStars, () => user.value?.public_repos], ([vis]) => {
  if (!vis || totalTriggered) return
  if (totalCommits.value > 0) {
    totalTriggered = true
    runTotal(totalCommits.value, 0)
    runStars(totalStars.value, 200)
    runRepos(user.value?.public_repos ?? 0, 400)
  }
})

watch([isVisible, yearsData], ([vis]) => {
  if (!vis || yearsTriggered) return
  const loaded = yearsData.value.filter(y => y.count !== null)
  if (loaded.length === 0) return
  yearsTriggered = true
  yearsData.value.forEach((y, i) => {
    animateYear(y.year, y.count ?? 0, i * 120)
  })
})

// Re-animate total when commits update (years finish loading)
watch(totalCommits, (val) => {
  if (isVisible.value && val > 0) runTotal(val, 0)
})

// Animate new year data as it arrives
watch(yearsData, (newVal) => {
  if (!isVisible.value) return
  newVal.forEach((y, i) => {
    if (y.count !== null && !yearDisplays.value[y.year]) {
      animateYear(y.year, y.count, i * 80)
    }
  })
}, { deep: true })

// ── Bar height (0–100%) ───────────────────────────────────────────────────────
const barPercent = computed(() => {
  const max = maxYearCommits.value
  const result: Record<number, number> = {}
  for (const y of yearsData.value) {
    result[y.year] = y.count ? Math.max(8, Math.round((y.count / max) * 100)) : 0
  }
  return result
})
</script>

<template>
  <section ref="sectionRef" class="ghs">
    <div class="ghs__bg-grid" />

    <div class="ghs__container">

      <!-- Header -->
      <div class="ghs__header">
        <span class="ghs__eyebrow">
          <i class="fa-brands fa-github" /> {{ t('github.eyebrow') }}
        </span>
        <h2 class="ghs__title">
          {{ t('github.title') }} <span class="ghs__title--accent">{{ t('github.titleAccent') }}</span>
        </h2>
        <p class="ghs__subtitle">
          {{ t('github.subtitle') }}
        </p>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="ghs__loading">
        <div class="ghs__spinner" />
        <span>{{ t('github.loading') }}</span>
      </div>

      <div v-else-if="error" class="ghs__error">
        <i class="fa-solid fa-triangle-exclamation" /> {{ t('github.error') }}
      </div>

      <template v-else-if="user">

        <!-- ── Hero counter row ───────────────────────────────────────────────── -->
        <div class="ghs__hero-stats">
          <div class="ghs__hero-stat ghs__hero-stat--main">
            <div class="ghs__hero-glow" />
            <i class="fa-solid fa-code-commit ghs__hero-icon" />
            <span class="ghs__hero-value">{{ fmtNum(displayTotal) }}</span>
            <span class="ghs__hero-label">{{ t('github.stats.commits') }}</span>
            <span v-if="totalCommits === 0" class="ghs__loading-dots">
              <span /><span /><span />
            </span>
          </div>

          <div class="ghs__hero-stat">
            <i class="fa-solid fa-code-branch ghs__hero-icon ghs__hero-icon--violet" />
            <span class="ghs__hero-value">{{ fmtNum(displayRepos) }}</span>
            <span class="ghs__hero-label">{{ t('github.stats.repos') }}</span>
          </div>

          <div class="ghs__hero-stat">
            <i class="fa-solid fa-star ghs__hero-icon ghs__hero-icon--gold" />
            <span class="ghs__hero-value">{{ fmtNum(displayStars) }}</span>
            <span class="ghs__hero-label">{{ t('github.stats.stars') }}</span>
          </div>

          <div class="ghs__hero-stat">
            <i class="fa-solid fa-users ghs__hero-icon ghs__hero-icon--cyan" />
            <span class="ghs__hero-value">{{ user.followers }}</span>
            <span class="ghs__hero-label">{{ t('github.stats.followers') }}</span>
          </div>
        </div>

        <!-- ── Year-by-year commit chart ─────────────────────────────────────── -->
        <div class="ghs__years-wrap">
          <h3 class="ghs__section-title">
            <i class="fa-solid fa-chart-column" /> {{ t('github.chart') }}
          </h3>

          <div class="ghs__years">
            <div
              v-for="y in yearsData"
              :key="y.year"
              class="ghs__year-card"
              :class="{ 'ghs__year-card--current': y.isCurrent }"
            >
              <!-- Bar -->
              <div class="ghs__bar-track">
                <div
                  class="ghs__bar-fill"
                  :style="{ height: barPercent[y.year] + '%' }"
                  :class="{ 'ghs__bar-fill--current': y.isCurrent }"
                />
              </div>

              <!-- Count -->
              <span class="ghs__year-count">
                <template v-if="y.count !== null">
                  {{ fmtNum(yearDisplays[y.year] ?? 0) }}
                </template>
                <span v-else class="ghs__year-pending">…</span>
              </span>

              <!-- Year label -->
              <span class="ghs__year-label">
                {{ y.year }}
                <span v-if="y.isCurrent" class="ghs__year-badge">{{ t('github.current') }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- ── Bottom grid: recent commits + top repos ───────────────────────── -->
        <div class="ghs__grid">

          <!-- Recent commits -->
          <div class="ghs__card">
            <h3 class="ghs__card-title">
              <i class="fa-solid fa-clock-rotate-left" /> {{ t('github.recentCommits') }}
            </h3>
            <ul class="ghs__commit-list">
              <li v-for="c in recentCommits" :key="c.sha" class="ghs__commit">
                <span class="ghs__commit-sha">{{ c.sha }}</span>
                <div class="ghs__commit-body">
                  <span class="ghs__commit-repo">{{ c.repo }}</span>
                  <span class="ghs__commit-msg">{{ c.message }}</span>
                </div>
              </li>
              <li v-if="!recentCommits.length" class="ghs__empty">No recent commits found.</li>
            </ul>
          </div>

          <!-- Top repos -->
          <div class="ghs__card">
            <h3 class="ghs__card-title">
              <i class="fa-solid fa-star" /> {{ t('github.topRepos') }}
            </h3>
            <ul class="ghs__repo-list">
              <li v-for="r in topRepos" :key="r.id" class="ghs__repo">
                <div class="ghs__repo-main">
                  <a :href="r.html_url" target="_blank" rel="noopener noreferrer" class="ghs__repo-name">
                    <i class="fa-regular fa-folder-open" />
                    {{ r.name }}
                  </a>
                  <p v-if="r.description" class="ghs__repo-desc">{{ r.description }}</p>
                </div>
                <div class="ghs__repo-meta">
                  <span v-if="r.language" class="ghs__repo-lang">{{ r.language }}</span>
                  <span class="ghs__repo-stars"><i class="fa-solid fa-star" /> {{ r.stargazers_count }}</span>
                  <span class="ghs__repo-forks"><i class="fa-solid fa-code-fork" /> {{ r.forks_count }}</span>
                </div>
              </li>
            </ul>

            <a :href="user.html_url" target="_blank" rel="noopener noreferrer" class="ghs__gh-link">
              <i class="fa-brands fa-github" /> {{ t('github.viewAll') }}
            </a>
          </div>

        </div>

      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>

@keyframes spin        { to { transform: rotate(360deg); } }
@keyframes pulse-glow  {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%      { opacity: 1;   transform: scale(1.08); }
}
@keyframes dot-bounce {
  0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
  40%           { transform: scale(1); opacity: 1; }
}
@keyframes bar-grow {
  from { height: 0; }
}

.ghs {
  position: relative;
  background: $bg-primary;
  padding: 6rem 0;
  overflow: hidden;

  // Subtle grid background
  &__bg-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient($border-subtle 1px, transparent 1px),
      linear-gradient(90deg, $border-subtle 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
    mask-image: radial-gradient(ellipse 80% 90% at 50% 50%, black 20%, transparent 100%);
    opacity: 0.5;
  }

  &__container {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    @media (min-width: $breakpoint-md) { padding: 0 2rem; }
  }

  // ── Header ──────────────────────────────────────────────────────────────────
  &__header {
    text-align: center;
    margin-bottom: 4rem;
  }

  &__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: $accent-primary;
    margin-bottom: 1rem;
  }

  &__title {
    font-size: clamp(2rem, 6vw, 3.5rem);
    font-weight: 800;
    color: $text-primary;
    margin-bottom: 1rem;

    &--accent {
      background: linear-gradient(135deg, $accent-primary, $accent-cyan);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  &__subtitle {
    font-size: 1rem;
    color: $text-secondary;
    max-width: 420px;
    margin: 0 auto;
    line-height: 1.7;
  }

  // ── Loading / Error ──────────────────────────────────────────────────────────
  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    color: $text-muted;
    padding: 6rem 0;
    font-size: 0.9rem;
  }

  &__spinner {
    width: 22px;
    height: 22px;
    border: 2px solid $border-subtle;
    border-top-color: $accent-primary;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  &__error {
    text-align: center;
    color: #f87171;
    padding: 4rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }

  // ── Hero stats ───────────────────────────────────────────────────────────────
  &__hero-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-bottom: 3rem;

    @media (min-width: $breakpoint-md) {
      grid-template-columns: 2fr 1fr 1fr 1fr;
    }
  }

  &__hero-stat {
    position: relative;
    background: $bg-secondary;
    border: 1px solid $border-subtle;
    border-radius: 20px;
    padding: 1.75rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.3rem;
    overflow: hidden;
    transition: border-color 0.3s ease, transform 0.3s ease;

    &:hover {
      border-color: $border-violet;
      transform: translateY(-3px);
    }

    &--main {
      border-color: rgba(124, 58, 237, 0.4);
      background: linear-gradient(135deg, $bg-secondary, rgba(124, 58, 237, 0.08));

      @media (min-width: $breakpoint-md) {
        grid-column: 1;
        grid-row: 1;
      }
    }
  }

  &__hero-glow {
    position: absolute;
    inset: -20px;
    background: radial-gradient(circle 80px at 50% 50%, rgba(124, 58, 237, 0.2), transparent);
    pointer-events: none;
    animation: pulse-glow 3s ease-in-out infinite;
  }

  &__hero-icon {
    font-size: 1.4rem;
    color: $accent-light;
    margin-bottom: 0.25rem;
    position: relative;

    &--violet { color: $accent-primary; }
    &--gold   { color: $accent-gold; }
    &--cyan   { color: $accent-cyan; }
  }

  &__hero-value {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    color: $text-primary;
    font-family: 'Bitcount', sans-serif;
    line-height: 1;
    position: relative;

    .ghs__hero-stat--main & {
      background: linear-gradient(135deg, $text-primary 0%, $accent-light 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  &__hero-label {
    font-size: 0.75rem;
    color: $text-muted;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  &__loading-dots {
    display: flex;
    gap: 4px;
    margin-top: 0.25rem;

    span {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: $accent-primary;
      animation: dot-bounce 1.4s ease-in-out infinite;

      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.4s; }
    }
  }

  // ── Year chart ───────────────────────────────────────────────────────────────
  &__years-wrap {
    background: $bg-secondary;
    border: 1px solid $border-subtle;
    border-radius: 24px;
    padding: 2rem;
    margin-bottom: 2rem;
    transition: border-color 0.3s ease;

    &:hover { border-color: $border-violet; }
  }

  &__section-title {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $text-muted;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i { color: $accent-primary; }
  }

  &__years {
    display: flex;
    gap: 0.75rem;
    align-items: flex-end;
    height: 180px;
    overflow-x: auto;
    padding-bottom: 0.5rem;

    // Hide scrollbar but keep scroll
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }

  &__year-card {
    flex: 1;
    min-width: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    height: 100%;
    justify-content: flex-end;
    cursor: default;

    &--current .ghs__year-label { color: $accent-cyan; }
    &--current .ghs__year-count { color: $accent-cyan; }
  }

  &__bar-track {
    flex: 1;
    width: 100%;
    max-width: 44px;
    background: $bg-elevated;
    border-radius: 6px 6px 0 0;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
  }

  &__bar-fill {
    width: 100%;
    background: linear-gradient(180deg, $accent-light 0%, $accent-primary 100%);
    border-radius: 6px 6px 0 0;
    transition: height 1.8s cubic-bezier(0.16, 1, 0.3, 1);
    min-height: 0;

    &--current {
      background: linear-gradient(180deg, $accent-cyan 0%, rgba(6, 214, 160, 0.5) 100%);
      box-shadow: 0 0 12px rgba(6, 214, 160, 0.4);
    }
  }

  &__year-count {
    font-size: 0.78rem;
    font-weight: 700;
    color: $text-secondary;
    font-family: 'Bitcount', sans-serif;
    line-height: 1;
  }

  &__year-pending {
    color: $text-muted;
    animation: dot-bounce 1.4s ease-in-out infinite;
  }

  &__year-label {
    font-size: 0.7rem;
    color: $text-muted;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
  }

  &__year-badge {
    display: inline-block;
    padding: 0.1rem 0.4rem;
    background: rgba(6, 214, 160, 0.15);
    border: 1px solid rgba(6, 214, 160, 0.4);
    border-radius: 999px;
    font-size: 0.6rem;
    color: $accent-cyan;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  // ── Bottom grid ──────────────────────────────────────────────────────────────
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__card {
    background: $bg-secondary;
    border: 1px solid $border-subtle;
    border-radius: 20px;
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    transition: border-color 0.3s ease;

    &:hover { border-color: $border-violet; }
  }

  &__card-title {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: $text-muted;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i { color: $accent-primary; }
  }

  // Commits
  &__commit-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__commit {
    display: flex;
    align-items: flex-start;
    gap: 0.6rem;
  }

  &__commit-sha {
    font-family: 'Roboto', monospace;
    font-size: 0.7rem;
    color: $accent-cyan;
    flex-shrink: 0;
    padding-top: 0.1rem;
    min-width: 46px;
  }

  &__commit-body {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    overflow: hidden;
  }

  &__commit-repo {
    font-size: 0.7rem;
    color: $accent-light;
    font-weight: 600;
  }

  &__commit-msg {
    font-size: 0.82rem;
    color: $text-secondary;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__empty {
    font-size: 0.85rem;
    color: $text-muted;
  }

  // Repos
  &__repo-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    flex: 1;
  }

  &__repo {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding-bottom: 0.9rem;
    border-bottom: 1px solid $border-subtle;

    &:last-child {
      padding-bottom: 0;
      border-bottom: none;
    }
  }

  &__repo-name {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    color: $text-primary;
    transition: color 0.2s ease;

    i { color: $accent-primary; font-size: 0.8rem; }
    &:hover { color: $accent-light; }
  }

  &__repo-desc {
    font-size: 0.78rem;
    color: $text-muted;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__repo-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.15rem;
  }

  &__repo-lang {
    font-size: 0.72rem;
    color: $accent-cyan;
    font-weight: 500;
  }

  &__repo-stars,
  &__repo-forks {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.72rem;
    color: $text-muted;

    i { font-size: 0.65rem; }
  }

  &__repo-stars i { color: $accent-gold; }

  &__gh-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: $accent-light;
    margin-top: 0.5rem;
    transition: color 0.2s ease;

    &:hover { color: $text-primary; }
  }
}
</style>
