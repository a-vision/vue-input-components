<template>
  <div
    class="text-input"
    :class="{
      [`label-${labelPosition}`]: label,
      [`label-align-${labelAlign}`]: label,
    }"
    :style="[
      { width: totalWidth || '100%' },
      labelStyle,
      {
        '--max-textarea-height': props.maxHeight || props.height || '14rem',
        '--textarea-height': props.height || '5.5rem',
      },
    ]"
  >
    <label v-if="label" :for="id" class="label">
      {{ label }}
    </label>
    <div
      class="input-wrapper"
      :class="{
        'has-error': error,
        'has-icon': icon,
      }"
    >
      <div v-if="icon" class="icon-wrapper" @click="focusInput">
        <font-awesome-icon :icon="icon" class="icon" />
      </div>
      <input
        v-if="!isTextarea"
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        class="input"
        @input="handleInput"
        ref="inputRef"
      />
      <textarea
        v-else
        :id="id"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        class="input"
        @input="handleInput"
        ref="inputRef"
      ></textarea>
      <span
        v-if="required && !showSaved && !showChanged"
        class="status-indicator required-indicator"
        >required</span
      >
      <transition name="fade">
        <span v-if="showSaved && !error" class="status-indicator saved-indicator">saved</span>
      </transition>
      <transition name="fade">
        <span v-if="showChanged && !error" class="status-indicator changed-indicator">changed</span>
      </transition>
      <div v-if="error" class="error-message">{{ error }}</div>
      <span v-if="success" class="message success-message">{{ success }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue: string
  label?: string
  type?: string
  icon?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  success?: string
  labelPosition?: 'top' | 'left'
  labelAlign?: 'left' | 'right' | 'center'
  totalWidth?: string
  inputWidth?: string
  labelWidth?: string
  autosave?: (value: string) => Promise<void>
  isTextarea?: boolean
  maxHeight?: string
  height?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'changed'): void
  (e: 'saved'): void
}>()

const id = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)
const showSaved = ref(false)
const showChanged = ref(false)
const isChanged = ref(false)
const debounceTimer = ref<number | null>(null)
const changedTimer = ref<number | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)

const labelStyle = computed(() => {
  if (!props.label) return {}
  if (props.labelPosition === 'left' && props.labelWidth) {
    return {
      'grid-template-columns': `${props.labelWidth} 1fr`,
    }
  }
  return {}
})

const handleAutosave = async (value: string) => {
  if (props.autosave) {
    try {
      await props.autosave(value)
      if (!props.error) {
        emit('saved')
        showSaved.value = true
        showChanged.value = false
        setTimeout(() => {
          showSaved.value = false
        }, 3000)
      }
    } catch (error) {
      console.error('Autosave failed:', error)
    }
  }
}

const debounceAutosave = (value: string) => {
  // Clear existing timers
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }
  if (changedTimer.value) {
    clearTimeout(changedTimer.value)
  }

  // Show changed indicator immediately
  if (!props.error) {
    showChanged.value = true
  }

  // Trigger changed event after 500ms
  changedTimer.value = window.setTimeout(() => {
    emit('changed')
    isChanged.value = true
  }, 500)

  // Trigger autosave after 1500ms
  debounceTimer.value = window.setTimeout(() => {
    handleAutosave(value)
  }, 1500)
}

const focusInput = () => {
  inputRef.value?.focus()
}

const adjustHeight = (element: HTMLTextAreaElement) => {
  element.style.height = 'auto' // Reset height to auto to calculate new height
  element.style.height = `${element.scrollHeight}px` // Set height to scrollHeight
}

const handleInput = (event: Event) => {
  const value = (event.target as HTMLTextAreaElement).value
  emit('update:modelValue', value)
  debounceAutosave(value)
  adjustHeight(event.target as HTMLTextAreaElement) // Adjust height on input
}

// Cleanup timers on unmount
onUnmounted(() => {
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }
  if (changedTimer.value) {
    clearTimeout(changedTimer.value)
  }
})
</script>

<style scoped>
.text-input {
  display: grid;
  gap: 0.5rem;
  width: 100%;
  margin-top: 0.7rem;
}

.text-input.label-top {
  grid-template-rows: auto 1fr;
}

.text-input.label-left {
  grid-template-columns: 30% 1fr;
  align-items: start;
  gap: 1rem;
}

.text-input.label-left .label {
  padding-top: 0.75rem;
  width: 100%;
}

.label {
  font-weight: 500;
  color: var(--text-color);
  text-align: left;
}

.label-align-left .label {
  text-align: left;
}

.label-align-right .label {
  text-align: right;
}

.label-align-center .label {
  text-align: center;
}

.required {
  color: var(--danger-color);
  margin-left: 0.25rem;
}

.input-wrapper {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  width: 100%;
  min-height: 2rem;
  background: var(--input-bg-color);
}

.input-wrapper.has-icon {
  grid-template-columns: auto 1fr;
}

.input-wrapper:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--shadow-color);
}

.input-wrapper.has-error {
  border-color: var(--danger-color);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.icon-wrapper {
  display: grid;
  place-items: start;
  padding: 1rem;
  border-right: 1px solid var(--border-color);
  cursor: pointer;
  overflow: hidden;
}

.icon-wrapper:hover {
  background-color: var(--input-bg-hover);
}

.icon {
  color: var(--text-muted);
  font-size: 1rem;
}

.input {
  padding: 0.75rem 1rem;
  border: none;
  outline: none;
  font-size: 1rem;
  color: var(--text-color);
  background: transparent;
  width: 100%;
  line-height: var(--line-height);
}

.input::placeholder {
  color: var(--text-muted);
}

.input:disabled {
  background-color: var(--input-bg-disabled);
  cursor: not-allowed;
}

.message {
  position: absolute;
  bottom: -1.5rem;
  left: 0;
  font-size: 0.75rem;
  white-space: nowrap;
}

.error-message {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.25rem 0.75rem;
  background-color: var(--danger-color);
  color: white;
  font-size: 0.75rem;
  border-radius: 0 0 0.5rem 0.5rem;
  transform: translateY(100%);
  transition: transform 0.2s ease;
  line-height: var(--line-height);
  z-index: 1;
}

.success-message {
  position: absolute;
  bottom: -1.5rem;
  left: 0;
  color: var(--success-color);
  font-size: 0.75rem;
  line-height: var(--line-height);
}

.status-indicator {
  position: absolute;
  top: -0.1rem;
  right: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 0px;
  background-color: var(--input-bg-color);
  padding: 0 0.25rem;
}

.saved-indicator {
  color: var(--success-color);
}

.changed-indicator {
  color: var(--warning-color);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

textarea {
  min-height: var(--textarea-height, 5.5rem);
  max-height: var(--max-textarea-height, 14rem);
  overflow-y: auto;
  resize: none;
}
</style>
