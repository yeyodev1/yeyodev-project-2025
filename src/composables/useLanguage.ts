import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const currentLanguage = ref<'en' | 'es'>('en')

export function useLanguage() {
  const { locale, t } = useI18n()

  const toggleLanguage = () => {
    currentLanguage.value = currentLanguage.value === 'en' ? 'es' : 'en'
    locale.value = currentLanguage.value
    
    // Guardar preferencia en localStorage
    localStorage.setItem('preferred-language', currentLanguage.value)
  }

  const setLanguage = (lang: 'en' | 'es') => {
    currentLanguage.value = lang
    locale.value = lang
    localStorage.setItem('preferred-language', lang)
  }

  const initializeLanguage = () => {
    // Verificar si hay una preferencia guardada
    const savedLanguage = localStorage.getItem('preferred-language') as 'en' | 'es' | null
    
    if (savedLanguage && ['en', 'es'].includes(savedLanguage)) {
      currentLanguage.value = savedLanguage
      locale.value = savedLanguage
    } else {
      // Detectar idioma del navegador como fallback
      const browserLanguage = navigator.language.toLowerCase()
      const detectedLanguage = browserLanguage.startsWith('es') ? 'es' : 'en'
      currentLanguage.value = detectedLanguage
      locale.value = detectedLanguage
    }
  }

  const languageLabel = computed(() => {
    return currentLanguage.value === 'en' ? 'ES' : 'EN'
  })

  const languageFlag = computed(() => {
    return currentLanguage.value === 'en' ? '🇪🇸' : '🇺🇸'
  })

  return {
    currentLanguage,
    languageLabel,
    languageFlag,
    toggleLanguage,
    setLanguage,
    initializeLanguage,
    t
  }
}