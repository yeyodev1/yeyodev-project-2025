<script setup lang="ts">
const services = [
  {
    icon: '⚡',
    title: 'Full Stack Development',
    desc: 'End-to-end systems built with Vue.js, Node.js & MongoDB. From architecture to deployment. Fast, clean, scalable.',
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'TypeScript'],
    highlight: false,
  },
  {
    icon: '🧠',
    title: 'Business Logic → Software',
    desc: 'My edge: I map your entire workflow by observing how your team works, then I turn that into a system. No bloated specs, just working software.',
    tags: ['Systems Design', 'Process Mapping', 'Custom SaaS'],
    highlight: true,
  },
  {
    icon: '🎯',
    title: 'Tech Leadership & CTO',
    desc: 'Define architecture, lead dev teams, and translate business strategy into technical decisions. Currently serving as CTO at Bakano.',
    tags: ['Architecture', 'Team Leadership', 'Roadmap', 'Tech Strategy'],
    highlight: false,
  },
  {
    icon: '🤖',
    title: 'AI Integration',
    desc: 'Integrate AI into your product: chatbots, automation, data pipelines, and more. Trained models at Scale AI — I know how the sausage is made.',
    tags: ['AI Tools', 'LLM Integration', 'Automation', 'Data Pipelines'],
    highlight: false,
  },
  {
    icon: '🌐',
    title: 'Web & Marketing Sites',
    desc: 'High-conversion websites with clean design, SEO optimization, and modern stacks. Delivered fast — like Opus Dental Lab in 5 days.',
    tags: ['Vue.js', 'SEO', 'Vite', 'Responsive'],
    highlight: false,
  },
  {
    icon: '🔗',
    title: 'System Integrations',
    desc: 'Connect your tools: billing systems, CRMs, ERPs, payment gateways, third-party APIs. I\'ve integrated Contifico, Stripe, WhatsApp, and more.',
    tags: ['REST APIs', 'Webhooks', 'Contifico', 'Stripe'],
    highlight: false,
  },
]
</script>

<template>
  <section id="services" class="services">
    <div class="services__container">

      <div class="services__header">
        <span class="services__eyebrow">What I do</span>
        <h2 class="services__title">
          Services &amp; <span class="services__title--accent">Expertise</span>
        </h2>
        <p class="services__subtitle">
          6 years building products across Ecuador, Peru, Spain and the US.
          I bring both the engineering and the business eye.
        </p>
      </div>

      <div class="services__grid">
        <div
          v-for="svc in services"
          :key="svc.title"
          class="services__card"
          :class="{ 'services__card--highlight': svc.highlight }"
        >
          <div class="services__icon">{{ svc.icon }}</div>
          <h3 class="services__card-title">{{ svc.title }}</h3>
          <p class="services__card-desc">{{ svc.desc }}</p>
          <div class="services__tags">
            <span v-for="tag in svc.tags" :key="tag" class="services__tag">{{ tag }}</span>
          </div>
        </div>
      </div>

      <!-- Scale AI badge -->
      <div class="services__ai-badge">
        <div class="services__ai-badge-inner">
          <span class="services__ai-icon">🤝</span>
          <div>
            <strong>Early AI Trainer · Scale AI</strong>
            <p>Part of one of the first teams training GPT-3 &amp; GPT-3.5 — writing original Python, JS &amp; TS code that fed the models.</p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>


@keyframes fade-up {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

.services {
  background: $bg-deep;
  padding: 6rem 0;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;

    @media (min-width: $breakpoint-md) { padding: 0 2rem; }
  }

  &__header {
    text-align: center;
    margin-bottom: 4rem;
  }

  &__eyebrow {
    display: inline-block;
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
    font-size: 1.05rem;
    color: $text-secondary;
    max-width: 520px;
    margin: 0 auto;
    line-height: 1.7;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;

    @media (min-width: $breakpoint-md) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__card {
    background: $bg-secondary;
    border: 1px solid $border-subtle;
    border-radius: 20px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: all 0.3s ease;

    &:hover {
      border-color: $border-violet;
      transform: translateY(-4px);
      box-shadow: 0 12px 40px $accent-glow;
    }

    &--highlight {
      border-color: $border-violet;
      background: linear-gradient(135deg, $bg-secondary, rgba(124, 58, 237, 0.08));
      box-shadow: 0 0 30px rgba(124, 58, 237, 0.1);
    }
  }

  &__icon {
    font-size: 2rem;
    line-height: 1;
  }

  &__card-title {
    font-size: 1.15rem;
    font-weight: 700;
    color: $text-primary;
    font-family: 'Bitcount', sans-serif;
  }

  &__card-desc {
    font-size: 0.9rem;
    color: $text-secondary;
    line-height: 1.65;
    flex: 1;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-top: 0.5rem;
  }

  &__tag {
    padding: 0.2rem 0.6rem;
    background: $bg-elevated;
    border: 1px solid $border-subtle;
    border-radius: 999px;
    font-size: 0.75rem;
    color: $text-muted;
  }

  // Scale AI badge
  &__ai-badge {
    margin-top: 4rem;
    padding: 2rem;
    border-radius: 20px;
    border: 1px solid rgba(245, 158, 11, 0.25);
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.06), transparent);
  }

  &__ai-badge-inner {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;

    strong {
      display: block;
      font-size: 1rem;
      color: $accent-gold;
      margin-bottom: 0.4rem;
    }

    p {
      font-size: 0.9rem;
      color: $text-secondary;
      line-height: 1.6;
      margin: 0;
    }
  }

  &__ai-icon {
    font-size: 2rem;
    flex-shrink: 0;
  }
}
</style>
