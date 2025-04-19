<template>
  <div class="text-input" :class="{
    [`label-${labelPosition}`]: label,
    [`label-align-${labelAlign}`]: label,
  }" :style="[
    { width: type === 'date' ? totalWidth || '12rem' : totalWidth || '100%' },
    labelStyle,
    {
      '--max-textarea-height': props.maxHeight || props.height || '14rem',
      '--textarea-height': props.height || '5.5rem',
    },
  ]">
    <label v-if="label" :for="id" class="label">
      {{ label }}
    </label>
    <div class="input-wrapper" :class="{
      'has-error': error,
      'has-icon': icon,
    }">
      <div v-if="icon" class="icon-wrapper" @click="focusInput">
        <font-awesome-icon :icon="icon" class="icon" />
      </div>
      <Datepicker v-if="type === 'date'" :id="id" v-model="dateValue" :placeholder="placeholder" :disabled="disabled"
        :readonly="readonly" :min-date="min" :max-date="max" :format="dateFormat" :enable-time-picker="false"
        :auto-apply="true" :close-on-auto-apply="true" :clearable="true"
        :input-class-name="['input', { 'has-icon': icon }]" @update:model-value="handleDateChange" @focus="handleFocus"
        @blur="handleBlur" />
      <input v-else-if="!isTextarea" :id="id" :type="type" :value="modelValue" :placeholder="placeholder"
        :required="required" :disabled="disabled" :readonly="readonly" :maxlength="maxlength" class="input"
        @input="handleInput" @focus="handleFocus" @blur="handleBlur" @keydown="handleKeydown" ref="inputRef" />
      <textarea v-else :id="id" :value="modelValue" :placeholder="placeholder" :required="required" :disabled="disabled"
        class="input" @input="handleInput" ref="inputRef"></textarea>
      <span v-if="required && !showSaved && !showChanged && !error"
        class="status-indicator required-indicator">required</span>
      <transition name="fade">
        <span v-if="showSaved && !error" class="status-indicator saved-indicator">saved</span>
      </transition>
      <transition name="fade">
        <span v-if="showChanged && !error" class="status-indicator changed-indicator">changed</span>
      </transition>
      <transition name="fade">
        <span v-if="error" class="status-indicator error-indicator" :data-error="error">error</span>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted, onMounted } from 'vue'
import { TextInputProps } from '../types'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = withDefaults(defineProps<TextInputProps>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  label: '',
  icon: undefined,
  disabled: false,
  readonly: false,
  maxlength: undefined,
  error: '',
  min: undefined,
  max: undefined,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'changed'): void
  (e: 'saved'): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'keydown', event: KeyboardEvent): void
}>()

const id = ref<string>('')
const showSaved = ref(false)
const showChanged = ref(false)
const isChanged = ref(false)
const debounceTimer = ref<number | null>(null)
const changedTimer = ref<number | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const dateValue = ref<Date | null>(null)

const dateFormat = 'dd/MM/yyyy'

const labelStyle = computed(() => {
  if (!props.label) return {}
  if (props.labelPosition === 'left' && props.labelWidth) {
    return {
      'grid-template-columns': `${props.labelWidth} 1fr`,
    }
  }
  return {}
})

const formatDateForModel = (date: Date | null): string => {
  if (!date) return ''
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const parseDateFromModel = (dateStr: string): Date | null => {
  if (!dateStr) return null
  const [day, month, year] = dateStr.split('/').map(Number)
  return new Date(year, month - 1, day)
}

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

const handleFocus = () => {
  emit('focus')
}

const handleBlur = () => {
  emit('blur')
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)
}

const handleDateChange = (date: Date | null) => {
  const formattedDate = formatDateForModel(date)
  emit('update:modelValue', formattedDate)
  debounceAutosave(formattedDate)
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

onMounted(() => {
  id.value = `text-input-${Math.random().toString(36).substr(2, 9)}`
  if (props.type === 'date' && props.modelValue) {
    dateValue.value = parseDateFromModel(props.modelValue)
  }
})

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
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

  &.has-icon {
    grid-template-columns: auto 1fr;
  }

  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 0 2px var(--primary-color) inset;
  }

  &:focus-within {
    border-color: var(--primary-color);
    box-shadow: 0 0 2px var(--primary-color) inset;
  }

  &.has-error {
    border-color: var(--danger-color);

    .icon {
      color: var(--danger-color);
    }

    &:hover .error-indicator::after {
      content: attr(data-error);
      display: block;
      position: absolute;
      bottom: 0.25rem;
      right: 0;
      padding: 0.25rem 0.75rem;
      color: white;
      background-color: var(--danger-color);
      line-height: var(--line-height);
      min-width: 200px;
      border-radius: 0.25rem;
      z-index: 1;
    }
  }
}

.icon-wrapper {
  display: grid;
  place-items: start;
  padding: 0.5rem;
  border-right: 1px solid rgb(from var(--border-color) r g b / 20%);
  cursor: pointer;
  overflow: hidden;

  &:hover {
    background-color: var(--input-bg-hover);
  }

  .icon {
    color: var(--text-muted);
    font-size: 1rem;
  }
}

.input {
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 0.5rem;
  outline: none;
  font-size: 1rem;
  color: var(--text-color);
  background: transparent;
  width: 100%;
  line-height: var(--line-height);

  &::placeholder {
    color: var(--text-muted);
  }

  &:disabled {
    background-color: var(--input-bg-disabled);
    cursor: not-allowed;
  }
}

.status-indicator {
  position: absolute;
  display: block;
  top: -1px;
  line-height: 1px;
  right: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  background-color: var(--input-bg-color);
  padding: 0 0.25rem;

  &.saved-indicator {
    color: var(--success-color);
  }

  &.changed-indicator {
    color: var(--warning-color);
  }

  &.error-indicator {
    color: var(--danger-color);
  }
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

:deep(.dp__input) {
  padding: 0.25rem 0.5rem;
  border: none;
  outline: none;
  font-size: 1rem;
  color: var(--text-color);
  background: transparent;
  width: 100%;
  line-height: var(--line-height);
}

:deep(.dp__input::placeholder) {
  color: var(--text-muted);
}

:deep(.dp__input:disabled) {
  background-color: var(--input-bg-disabled);
  cursor: not-allowed;
}

:deep(.dp__input.has-icon) {
  padding-left: 2.5rem;
}

:deep(.dp__input_icon) {
  display: none;
}

:deep(.dp__input_icon_pad) {
  padding-right: 0.75rem;
}

:deep(.dp__menu) {
  background-color: var(--input-bg-color);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

:deep(.dp__cell_inner) {
  color: var(--text-color);
}

:deep(.dp__today) {
  border-color: var(--primary-color);
}

:deep(.dp__active_date) {
  background-color: var(--primary-color);
  color: white;
}

:deep(.dp__range_start),
:deep(.dp__range_end) {
  background-color: var(--primary-color);
  color: white;
}

:deep(.dp__range_between) {
  background-color: var(--primary-color-light);
  color: var(--text-color);
}
</style>
