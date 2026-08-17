export interface Line {
  type: 'cmd' | 'out' | 'err' | 'success' | 'accent' | 'dim' | 'blank'
  text: string
}

export const WELCOME_LINES: Line[] = [
  { type: 'accent', text: '  yeyo.dev  —  interactive terminal  v3' },
  { type: 'dim', text: '  ─────────────────────────────────────────' },
  { type: 'out', text: '  Hey dev — you found the terminal. Nice.' },
  { type: 'out', text: '  Type "help" to see what you can do here.' },
  { type: 'blank', text: '' },
]

export const COMMANDS: Record<string, { hint: string; run: () => Line[] }> = {
  help: {
    hint: 'list available commands',
    run: () => [
      { type: 'accent', text: '  Available commands' },
      { type: 'dim', text: '  ─────────────────────────────────────────' },
      { type: 'out', text: '  whoami        — who is this guy?' },
      { type: 'out', text: '  skills        — tech stack & proficiency' },
      { type: 'out', text: '  experience    — professional timeline' },
      { type: 'out', text: '  projects      — featured work' },
      { type: 'out', text: '  contact       — get in touch' },
      { type: 'out', text: '  achievements  — stats & highlights' },
      { type: 'out', text: '  git log       — commit history (fun version)' },
      { type: 'out', text: '  sudo hire me  — make a great decision' },
      { type: 'out', text: '  clear         — clear terminal' },
      { type: 'out', text: '  exit          — close terminal' },
      { type: 'blank', text: '' },
      { type: 'dim', text: '  ↑ ↓  navigate history  |  Tab  autocomplete' },
    ],
  },

  whoami: {
    hint: 'who is this guy?',
    run: () => [
      { type: 'accent', text: '  Diego Reyes  ·  aka Yeyo' },
      { type: 'dim', text: '  ─────────────────────────────────────────' },
      { type: 'out', text: '  Role      : CTO @ Bakano · Full Stack Dev · AI Trainer' },
      { type: 'out', text: '  Location  : Ecuador (EC) — available worldwide' },
      { type: 'out', text: '  Experience: 6+ years building production systems' },
      { type: 'blank', text: '' },
      { type: 'out', text: '  I read businesses like code —' },
      { type: 'out', text: '  walk in, observe the team, and map the entire' },
      { type: 'out', text: '  system in my head before writing line one.' },
      { type: 'blank', text: '' },
      { type: 'success', text: '  Scale AI  : Early AI trainer · GPT-3 & GPT-3.5 datasets' },
      { type: 'success', text: '  Bakano    : Built & lead the tech team from day 1' },
      { type: 'success', text: '  Finestra  : SaaS for pastry studios — prod since 2024' },
    ],
  },

  skills: {
    hint: 'tech stack & proficiency',
    run: () => [
      { type: 'accent', text: '  Tech Stack' },
      { type: 'dim', text: '  ─────────────────────────────────────────' },
      { type: 'out', text: '  Vue 3 / Nuxt      ██████████████████  98%' },
      { type: 'out', text: '  TypeScript        █████████████████░  92%' },
      { type: 'out', text: '  Node.js / Express ████████████████░░  88%' },
      { type: 'out', text: '  PostgreSQL / SQL  ███████████████░░░  82%' },
      { type: 'out', text: '  Python            ██████████████░░░░  78%' },
      { type: 'out', text: '  Docker / CI-CD    █████████████░░░░░  74%' },
      { type: 'blank', text: '' },
      { type: 'accent', text: '  Also fluent in' },
      { type: 'out', text: '  SCSS · Tailwind · Vite · Pinia · REST · WebSockets' },
      { type: 'out', text: '  Spline · Three.js · Figma → code workflows' },
    ],
  },

  experience: {
    hint: 'professional timeline',
    run: () => [
      { type: 'accent', text: '  Professional Timeline' },
      { type: 'dim', text: '  ─────────────────────────────────────────' },
      { type: 'success', text: '  2024 → now   CTO · Bakano' },
      { type: 'out', text: '               Built the product from zero.' },
      { type: 'out', text: '               Led team, architected the stack,' },
      { type: 'out', text: '               delivered in 3 days.' },
      { type: 'blank', text: '' },
      { type: 'success', text: '  2024 → now   Finestra SaaS' },
      { type: 'out', text: '               Order mgmt → production → dispatch' },
      { type: 'out', text: '               → delivery → warehouse. Contifico billing.' },
      { type: 'blank', text: '' },
      { type: 'success', text: '  2023 → 2025  AI Trainer · Scale AI' },
      { type: 'out', text: '               One of the first teams. Wrote Python,' },
      { type: 'out', text: '               JS & TS code to shape GPT-3 / GPT-3.5.' },
      { type: 'blank', text: '' },
      { type: 'success', text: '  2024         Opus Dental Lab' },
      { type: 'out', text: '               Full dental-lab management app.' },
      { type: 'out', text: '               Design → production in 5 days.' },
      { type: 'blank', text: '' },
      { type: 'dim', text: '  3 402 commits  ·  4 countries  ·  15+ projects' },
    ],
  },

  projects: {
    hint: 'featured work',
    run: () => [
      { type: 'accent', text: '  Featured Projects' },
      { type: 'dim', text: '  ─────────────────────────────────────────' },
      { type: 'success', text: '  Finestra — Pastry Studio SaaS' },
      { type: 'out', text: '  Vue 3 · Node · PostgreSQL · Contifico' },
      { type: 'out', text: '  Full order lifecycle in production' },
      { type: 'blank', text: '' },
      { type: 'success', text: '  Bakano — Digital Agency Platform' },
      { type: 'out', text: '  Vue 3 · TypeScript · Vite · SCSS' },
      { type: 'out', text: '  Shipped in 3 days as CTO' },
      { type: 'blank', text: '' },
      { type: 'success', text: '  Opus Dental Lab — Lab Management' },
      { type: 'out', text: '  Full workflow: orders → production → delivery' },
      { type: 'blank', text: '' },
      { type: 'success', text: '  Scale AI — GPT Training Datasets' },
      { type: 'out', text: '  Python · TypeScript · original code, no copy-paste' },
    ],
  },

  contact: {
    hint: 'get in touch',
    run: () => [
      { type: 'accent', text: "  Let's build something" },
      { type: 'dim', text: '  ─────────────────────────────────────────' },
      { type: 'out', text: '  WhatsApp  : +1 (763) 352-4852' },
      { type: 'out', text: '  Email     : diego@yeyo.dev' },
      { type: 'out', text: '  GitHub    : github.com/yeyodev1' },
      { type: 'out', text: '  LinkedIn  : linkedin.com/in/yeyodev' },
      { type: 'blank', text: '' },
      { type: 'success', text: '  Ecuador 🇪🇨 · respond within a few hours' },
      { type: 'out', text: '  Available for projects · consulting · full-time' },
    ],
  },

  achievements: {
    hint: 'stats & highlights',
    run: () => [
      { type: 'accent', text: '  Stats' },
      { type: 'dim', text: '  ─────────────────────────────────────────' },
      { type: 'out', text: '  Commits        3 402' },
      { type: 'out', text: '  Years exp       6+' },
      { type: 'out', text: '  Countries        4  (EC · MX · US · remote)' },
      { type: 'out', text: '  Projects        15+' },
      { type: 'out', text: '  Coffees          ∞' },
      { type: 'blank', text: '' },
      { type: 'accent', text: '  Highlights' },
      { type: 'success', text: '  [+]  One of first AI trainers on GPT-3 team' },
      { type: 'success', text: '  [+]  CTO & product built in 3 days' },
      { type: 'success', text: '  [+]  SaaS in production serving real businesses' },
      { type: 'success', text: '  [+]  Maps entire business systems by observation' },
    ],
  },

  'git log': {
    hint: 'commit history',
    run: () => [
      { type: 'accent', text: '  git log --oneline --graph' },
      { type: 'dim', text: '  ─────────────────────────────────────────' },
      { type: 'success', text: '  * a1b2c3  feat: ship portfolio v3 — Spline robot + timeline' },
      { type: 'out', text: '  * d4e5f6  feat: CTO mode activated @ Bakano' },
      { type: 'out', text: '  * 7g8h9i  feat: add Scale AI GPT-3.5 training dataset' },
      { type: 'out', text: '  * j0k1l2  feat: Finestra SaaS goes live in production' },
      { type: 'out', text: '  * m3n4o5  feat: Opus Dental Lab — design to prod in 5d' },
      { type: 'out', text: '  * p6q7r8  fix: business logic — read 3 companies by lunch' },
      { type: 'out', text: '  * s9t0u1  chore: relocate Ecuador -> world stage' },
      { type: 'dim', text: '' },
      { type: 'dim', text: '  3 402 commits and counting...' },
    ],
  },

  'sudo hire me': {
    hint: '',
    run: () => [
      { type: 'dim', text: '  [sudo] password for recruiter:  ........' },
      { type: 'blank', text: '' },
      { type: 'success', text: '  Access granted.' },
      { type: 'blank', text: '' },
      { type: 'accent', text: '  Executing: hire --candidate="Diego Reyes" --level=senior' },
      { type: 'blank', text: '' },
      { type: 'out', text: '  Checking availability ............. OPEN' },
      { type: 'out', text: '  Checking skills ................... EXCEPTIONAL' },
      { type: 'out', text: '  Checking business instinct ........ OFF THE CHARTS' },
      { type: 'out', text: '  Checking team impact .............. HIGH' },
      { type: 'blank', text: '' },
      { type: 'success', text: "  Result: Best decision you'll make this quarter." },
      { type: 'dim', text: '  -> WhatsApp: +1 (763) 352-4852' },
    ],
  },
}

export const ALL_CMDS = Object.keys(COMMANDS)
