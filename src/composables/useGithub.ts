import { ref, computed } from 'vue'
import {
  fetchUser,
  fetchRepos,
  fetchEvents,
  fetchCommitsByYear,
  type GithubUser,
  type GithubRepo,
  type GithubEvent,
} from '@/services/github'

// ── Module-level cache (shared across all component instances) ────────────────
let _loaded = false
let _loading = false
let _yearsLoaded = false

const CURRENT_YEAR = new Date().getFullYear()
const START_YEAR   = 2019
const YEARS        = Array.from({ length: CURRENT_YEAR - START_YEAR + 1 }, (_, i) => START_YEAR + i)

const user          = ref<GithubUser | null>(null)
const repos         = ref<GithubRepo[]>([])
const events        = ref<GithubEvent[]>([])
const commitsByYear = ref<Record<number, number>>({})
const error         = ref<string | null>(null)
const loading       = ref(false)
const loadingYears  = ref(false)

// ── Load base data (user, repos, events) ─────────────────────────────────────

async function load() {
  if (_loaded || _loading) return
  _loading = true
  loading.value = true
  error.value = null

  try {
    const [u, r, e] = await Promise.all([fetchUser(), fetchRepos(), fetchEvents()])
    user.value   = u
    repos.value  = r
    events.value = e
    _loaded = true
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'GitHub API error'
  } finally {
    _loading = false
    loading.value = false
  }
}

// ── Load commits per year (sequential to respect search rate limit) ───────────

async function loadCommitsByYear() {
  if (_yearsLoaded) return
  _yearsLoaded = true
  loadingYears.value = true

  // Sequential with small gap — GitHub search API: 30 req/min authenticated
  for (const year of YEARS) {
    try {
      const count = await fetchCommitsByYear(year)
      commitsByYear.value = { ...commitsByYear.value, [year]: count }
    } catch {
      commitsByYear.value = { ...commitsByYear.value, [year]: 0 }
    }
    // tiny pause to avoid secondary rate limit
    await new Promise(r => setTimeout(r, 150))
  }

  loadingYears.value = false
}

// ── Derived data ──────────────────────────────────────────────────────────────

const topRepos = computed(() =>
  repos.value
    .filter(r => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 5),
)

const languages = computed(() => {
  const count: Record<string, number> = {}
  for (const r of repos.value) {
    if (r.language) count[r.language] = (count[r.language] ?? 0) + 1
  }
  return Object.entries(count)
    .sort((a, b) => b[1] - a[1])
    .map(([lang, n]) => ({ lang, count: n }))
})

const recentCommits = computed(() =>
  events.value
    .filter(e => e.type === 'PushEvent' && e.payload.commits?.length)
    .slice(0, 10)
    .flatMap(e =>
      (e.payload.commits ?? []).map(c => ({
        message: c.message.split('\n')[0],
        sha: c.sha.slice(0, 7),
        repo: e.repo.name.replace('yeyodev1/', ''),
        date: new Date(e.created_at),
      })),
    )
    .slice(0, 8),
)

const totalStars = computed(() =>
  repos.value.filter(r => !r.fork).reduce((acc, r) => acc + r.stargazers_count, 0),
)

const totalCommits = computed(() =>
  Object.values(commitsByYear.value).reduce((a, b) => a + b, 0),
)

const yearsData = computed(() =>
  YEARS.map(year => ({
    year,
    count: commitsByYear.value[year] ?? null,
    isCurrent: year === CURRENT_YEAR,
  })),
)

const maxYearCommits = computed(() =>
  Math.max(1, ...Object.values(commitsByYear.value)),
)

export function useGithub() {
  return {
    user,
    repos,
    events,
    commitsByYear,
    loading,
    loadingYears,
    error,
    topRepos,
    languages,
    recentCommits,
    totalStars,
    totalCommits,
    yearsData,
    maxYearCommits,
    currentYear: CURRENT_YEAR,
    load,
    loadCommitsByYear,
  }
}
