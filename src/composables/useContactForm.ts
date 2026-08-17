import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const WEBHOOK_URL = import.meta.env.VITE_CONTACT_WEBHOOK as string | undefined
const QUALIFICATION_WEBHOOK = import.meta.env.VITE_QUALIFICATION_WEBHOOK as string | undefined

const WHATSAPP_NUMBER = '593963681303'

export interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  projectType: string
  budget: string
  timeline: string
  referralSource: string
  message: string
}

function buildWhatsAppMessage(f: ContactFormData): string {
  return (
    `👋 *Nuevo contacto desde yeyo.dev*\n\n` +
    `*Nombre:* ${f.firstName} ${f.lastName}\n` +
    `*Email:* ${f.email}\n` +
    `*Teléfono:* ${f.phone}\n` +
    `*Empresa:* ${f.company || '—'}\n` +
    `*Proyecto:* ${f.projectType}\n` +
    `*Presupuesto:* ${f.budget || '—'}\n` +
    `*Timeline:* ${f.timeline}\n` +
    `*Cómo me encontró:* ${f.referralSource || '—'}\n` +
    `*Mensaje:* ${f.message}`
  )
}

function buildTags(f: ContactFormData): string[] {
  return [
    'lead',
    'yeyo.dev',
    `project-type: ${f.projectType}`,
    `timeline: ${f.timeline}`,
    `referral: ${f.referralSource || 'direct'}`,
    f.budget ? `budget: ${f.budget}` : '',
  ].filter(Boolean)
}

function buildNote(f: ContactFormData): string {
  const lines = [
    `👤 Nombre: ${f.firstName} ${f.lastName}`,
    `📧 Email: ${f.email}`,
    `📞 Teléfono: ${f.phone}`,
    `🏢 Empresa: ${f.company || '—'}`,
    `📋 Tipo de proyecto: ${f.projectType}`,
    `💰 Presupuesto: ${f.budget || '—'}`,
    `⏱ Timeline: ${f.timeline}`,
    `🔍 Cómo me encontró: ${f.referralSource || '—'}`,
    `💬 Mensaje: ${f.message}`,
    ``,
    `🕐 Enviado: ${new Date().toLocaleString()}`,
    `📱 Fuente: yeyo.dev`,
  ]
  return lines.join('\n')
}

function buildPayload(f: ContactFormData, extra: Record<string, unknown> = {}) {
  return {
    firstName: f.firstName,
    lastName: f.lastName,
    email: f.email,
    phone: f.phone,
    company: f.company,
    projectType: f.projectType,
    budget: f.budget,
    timeline: f.timeline,
    referralSource: f.referralSource,
    message: f.message,
    source: 'yeyo.dev',
    submittedAt: new Date().toISOString(),
    tags: buildTags(f),
    ...extra,
  }
}

async function postTo(url: string, data: Record<string, unknown>): Promise<void> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error(`Webhook HTTP ${res.status}`)
}

export function useContactForm() {
  const { tm } = useI18n()

  const form = ref<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    referralSource: '',
    message: '',
  })
  const submitted = ref(false)
  const isSubmitting = ref(false)
  const submitError = ref('')

  const projectTypes = computed(() => tm('contact.form.projectTypes') as string[])
  const budgets = computed(() => tm('contact.form.budgets') as string[])
  const timelines = computed(() => tm('contact.form.timelines') as string[])
  const referralSources = computed(() => tm('contact.form.referralSources') as string[])

  const whatsappUrl = computed(() => {
    const text = encodeURIComponent(buildWhatsAppMessage(form.value))
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
  })

  const handleSubmit = async () => {
    isSubmitting.value = true
    submitError.value = ''
    const errors: string[] = []

    try {
      const promises: Promise<void>[] = []

      if (WEBHOOK_URL) {
        const leadPayload = buildPayload(form.value)
        promises.push(
          postTo(WEBHOOK_URL, leadPayload).catch(() => {
            errors.push('lead-registration')
          }),
        )
      }

      if (QUALIFICATION_WEBHOOK) {
        const qualPayload = buildPayload(form.value, {
          notes: buildNote(form.value),
          qualified: true,
        })
        promises.push(
          postTo(QUALIFICATION_WEBHOOK, qualPayload).catch(() => {
            errors.push('qualification')
          }),
        )
      }

      await Promise.allSettled(promises)

      if (promises.length > 0 && errors.length === promises.length) {
        submitError.value = 'Error al enviar. Contáctame directo por WhatsApp.'
        return
      }

      submitted.value = true
    } catch {
      submitError.value = 'Error inesperado. Contáctame por WhatsApp.'
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    form,
    submitted,
    isSubmitting,
    submitError,
    projectTypes,
    budgets,
    timelines,
    referralSources,
    whatsappUrl,
    handleSubmit,
  }
}
