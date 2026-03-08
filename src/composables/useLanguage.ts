import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export function useLanguage() {
  const { locale, t } = useI18n()

  const isEs = computed(() => locale.value === 'es')

  const toggle = () => {
    locale.value = isEs.value ? 'en' : 'es'
    localStorage.setItem('lang', locale.value)
  }

  const init = () => {
    const saved = localStorage.getItem('lang') as 'en' | 'es' | null
    if (saved) locale.value = saved
  }

  return { locale, isEs, toggle, init, t }
}
