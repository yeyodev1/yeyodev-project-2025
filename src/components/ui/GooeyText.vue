<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface Props {
  texts: string[]
  morphTime?: number
  cooldownTime?: number
  class?: string
  textClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  morphTime: 1,
  cooldownTime: 0.25,
})

const text1Ref = ref<HTMLSpanElement | null>(null)
const text2Ref = ref<HTMLSpanElement | null>(null)
let animFrameId = 0

onMounted(() => {
  const { texts, morphTime, cooldownTime } = props
  let textIndex = texts.length - 1
  let time = Date.now()
  let morph = 0
  let cooldown = cooldownTime

  const setMorph = (fraction: number) => {
    if (!text1Ref.value || !text2Ref.value) return
    text2Ref.value.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
    text2Ref.value.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`
    const f = 1 - fraction
    text1Ref.value.style.filter = `blur(${Math.min(8 / f - 8, 100)}px)`
    text1Ref.value.style.opacity = `${Math.pow(f, 0.4) * 100}%`
  }

  const doCooldown = () => {
    morph = 0
    if (!text1Ref.value || !text2Ref.value) return
    text2Ref.value.style.filter = ''
    text2Ref.value.style.opacity = '100%'
    text1Ref.value.style.filter = ''
    text1Ref.value.style.opacity = '0%'
  }

  const doMorph = () => {
    morph -= cooldown
    cooldown = 0
    let fraction = morph / morphTime
    if (fraction > 1) {
      cooldown = cooldownTime
      fraction = 1
    }
    setMorph(fraction)
  }

  const animate = () => {
    animFrameId = requestAnimationFrame(animate)
    const newTime = Date.now()
    const shouldIncrement = cooldown > 0
    const dt = (newTime - time) / 1000
    time = newTime
    cooldown -= dt

    if (cooldown <= 0) {
      if (shouldIncrement) {
        textIndex = (textIndex + 1) % texts.length
        if (text1Ref.value && text2Ref.value) {
          text1Ref.value.textContent = texts[textIndex % texts.length]
          text2Ref.value.textContent = texts[(textIndex + 1) % texts.length]
        }
      }
      doMorph()
    } else {
      doCooldown()
    }
  }

  // Init
  if (text1Ref.value) text1Ref.value.textContent = texts[textIndex % texts.length]
  if (text2Ref.value) text2Ref.value.textContent = texts[(textIndex + 1) % texts.length]
  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(animFrameId)
})
</script>

<template>
  <div class="gooey-root" :class="props.class">
    <svg class="gooey-svg" aria-hidden="true" focusable="false">
      <defs>
        <filter id="gooey-threshold">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
          />
        </filter>
      </defs>
    </svg>
    <div class="gooey-inner" style="filter: url(#gooey-threshold)">
      <span ref="text1Ref" class="gooey-text" :class="props.textClass" />
      <span ref="text2Ref" class="gooey-text" :class="props.textClass" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gooey-root {
  position: relative;
}

.gooey-svg {
  position: absolute;
  height: 0;
  width: 0;
}

.gooey-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.gooey-text {
  position: absolute;
  display: inline-block;
  select: none;
  text-align: center;
}
</style>
