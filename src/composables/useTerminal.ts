import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import {
  COMMANDS,
  ALL_CMDS,
  WELCOME_LINES,
  type Line,
} from '@/components/base/terminal/commands'

export function useTerminal() {
  const isOpen = ref(false)
  const input = ref('')
  const lines = ref<Line[]>([])
  const bodyRef = ref<HTMLElement | null>(null)
  const inputRef = ref<HTMLInputElement | null>(null)
  const isTyping = ref(false)

  // ── Command history ────────────────────────────────────────────────────────
  const history = ref<string[]>([])
  const histIdx = ref(-1)

  // ── Helpers ────────────────────────────────────────────────────────────────
  const scrollBottom = () =>
    nextTick(() => {
      if (bodyRef.value) bodyRef.value.scrollTop = bodyRef.value.scrollHeight
    })

  const push = (l: Line) => {
    lines.value.push(l)
    scrollBottom()
  }

  const typeLines = async (ls: Line[], delay = 12) => {
    isTyping.value = true
    for (const l of ls) {
      push(l)
      await new Promise((r) => setTimeout(r, l.type === 'blank' ? 0 : delay))
    }
    isTyping.value = false
  }

  // ── Command execution ──────────────────────────────────────────────────────
  const run = async (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    push({ type: 'cmd', text: `yeyo@portfolio:~$ ${raw.trim()}` })

    if (!cmd) return

    if (cmd === 'clear') {
      lines.value = []
      return
    }
    if (cmd === 'exit') {
      isOpen.value = false
      return
    }

    const def = COMMANDS[cmd]
    if (def) {
      await typeLines(def.run())
    } else {
      push({ type: 'err', text: `  command not found: ${cmd}` })
      push({ type: 'dim', text: '  type "help" for available commands' })
    }
    push({ type: 'blank', text: '' })
  }

  // ── Input handling ─────────────────────────────────────────────────────────
  const onKeydown = async (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !isTyping.value) {
      const val = input.value
      if (val.trim()) {
        history.value.unshift(val)
        histIdx.value = -1
      }
      input.value = ''
      await run(val)
      return
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      histIdx.value = Math.min(histIdx.value + 1, history.value.length - 1)
      input.value = history.value[histIdx.value] ?? ''
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      histIdx.value = Math.max(histIdx.value - 1, -1)
      input.value = histIdx.value >= 0 ? (history.value[histIdx.value] ?? '') : ''
      return
    }

    if (e.key === 'Tab') {
      e.preventDefault()
      const partial = input.value.toLowerCase()
      const match = ALL_CMDS.find((c) => c.startsWith(partial) && c !== partial)
      if (match) input.value = match
      return
    }
  }

  // ── Open / close ───────────────────────────────────────────────────────────
  const open = async () => {
    isOpen.value = true
    if (lines.value.length === 0) {
      await nextTick()
      await typeLines(WELCOME_LINES, 8)
    }
    await nextTick()
    inputRef.value?.focus()
  }

  const close = () => {
    isOpen.value = false
  }

  // ── Keyboard shortcut: Ctrl+` ──────────────────────────────────────────────
  const onGlobalKey = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === '`') {
      if (isOpen.value) {
        close()
      } else {
        open()
      }
    }
  }

  onMounted(() => document.addEventListener('keydown', onGlobalKey))
  onUnmounted(() => document.removeEventListener('keydown', onGlobalKey))

  return { isOpen, input, lines, bodyRef, inputRef, isTyping, onKeydown, open, close }
}
