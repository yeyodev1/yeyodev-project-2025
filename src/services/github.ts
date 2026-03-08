const GITHUB_USER = 'yeyodev1'
const BASE_URL = 'https://api.github.com'

const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined

const headers: Record<string, string> = {
  Accept: 'application/vnd.github+json',
}
if (token) headers['Authorization'] = `Bearer ${token}`

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, { headers })
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${path}`)
  return res.json() as Promise<T>
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface GithubUser {
  login: string
  name: string
  avatar_url: string
  bio: string
  public_repos: number
  followers: number
  following: number
  html_url: string
  created_at: string
}

export interface GithubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  updated_at: string
  pushed_at: string
  fork: boolean
  private: boolean
}

export interface GithubEvent {
  id: string
  type: string
  repo: { name: string; url: string }
  created_at: string
  payload: {
    commits?: Array<{ message: string; sha: string }>
    ref?: string
    ref_type?: string
    action?: string
  }
}

// ── API calls ────────────────────────────────────────────────────────────────

export const fetchUser = (): Promise<GithubUser> =>
  get<GithubUser>(`/users/${GITHUB_USER}`)

export const fetchRepos = (): Promise<GithubRepo[]> =>
  get<GithubRepo[]>(`/users/${GITHUB_USER}/repos?sort=pushed&per_page=100&type=owner`)

export const fetchEvents = (): Promise<GithubEvent[]> =>
  get<GithubEvent[]>(`/users/${GITHUB_USER}/events?per_page=100`)

/**
 * Uses GitHub Search API to count commits authored in a specific year.
 * Returns total_count which is accurate even with per_page=1.
 */
export async function fetchCommitsByYear(year: number): Promise<number> {
  const data = await get<{ total_count: number }>(
    `/search/commits?q=author:${GITHUB_USER}+committer-date:${year}-01-01..${year}-12-31&per_page=1`,
  )
  return data.total_count
}
