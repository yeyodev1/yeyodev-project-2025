<script setup lang="ts">
import { useTerminal } from '@/composables/useTerminal'

const { isOpen, input, lines, bodyRef, inputRef, isTyping, onKeydown, open, close } = useTerminal()
</script>

<template>
  <div class="dt">
    <!-- ── Trigger button ───────────────────────────────────────────────── -->
    <Transition name="dt-pop">
      <button v-if="!isOpen" class="dt__trigger" @click="open" aria-label="Open terminal">
        <i class="fa-solid fa-terminal dt__trigger-icon" />
        <span class="dt__trigger-label">Terminal</span>
        <kbd class="dt__trigger-kbd">^`</kbd>
      </button>
    </Transition>

    <!-- ── Terminal window ──────────────────────────────────────────────── -->
    <Transition name="dt-slide">
      <div v-if="isOpen" class="dt__backdrop" @click.self="close">
        <div class="dt__window">
          <!-- Title bar -->
          <div class="dt__bar">
            <div class="dt__dots">
              <button class="dt__dot dt__dot--red" @click="close" aria-label="close" />
              <button class="dt__dot dt__dot--yellow" aria-label="minimize" />
              <button class="dt__dot dt__dot--green" aria-label="maximize" />
            </div>
            <span class="dt__bar-title">yeyo@portfolio — bash</span>
            <span class="dt__bar-hint">ctrl+` to toggle</span>
          </div>

          <!-- Output area -->
          <div ref="bodyRef" class="dt__body" @click="inputRef?.focus()">
            <div
              v-for="(line, i) in lines"
              :key="i"
              class="dt__line"
              :class="`dt__line--${line.type}`"
            >
              {{ line.text }}
            </div>

            <!-- Active input row -->
            <div class="dt__input-row">
              <span class="dt__ps1">yeyo@portfolio:~$&nbsp;</span>
              <input
                ref="inputRef"
                v-model="input"
                class="dt__input"
                @keydown="onKeydown"
                autocomplete="off"
                spellcheck="false"
                :disabled="isTyping"
                aria-label="terminal input"
              />
              <span class="dt__caret" :class="{ 'dt__caret--pause': isTyping }" />
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
@use './terminal/terminal';
</style>
