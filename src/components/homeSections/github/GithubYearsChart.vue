<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGithub } from '@/composables/useGithub'
import { fmtNum } from '@/composables/useCountUp'

defineProps<{
  yearDisplays: Record<number, number>
}>()

const { t } = useI18n()
const { yearsData, maxYearCommits } = useGithub()

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
  <div class="ghs__years-wrap">
    <h3 class="ghs__section-title">
      <i class="fa-solid fa-chart-column" aria-hidden="true" /> {{ t('github.chart') }}
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
</template>

<style lang="scss" scoped>
@keyframes dot-bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.3;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.ghs {
  &__years-wrap {
    background: $bg-secondary;
    border: 1px solid $border-subtle;
    border-radius: 24px;
    padding: 2rem;
    margin-bottom: 2rem;
    transition: border-color 0.3s ease;

    &:hover {
      border-color: $border-violet;
    }
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

    i {
      color: $accent-primary;
    }
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
    &::-webkit-scrollbar {
      display: none;
    }
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

    &--current .ghs__year-label {
      color: $accent-cyan;
    }
    &--current .ghs__year-count {
      color: $accent-cyan;
    }
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
}
</style>
