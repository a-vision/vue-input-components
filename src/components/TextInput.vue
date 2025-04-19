<template>
  <div class="text-input" :class="{
    'text-input--disabled': disabled,
    'text-input--has-error': error,
    [`label-${labelPosition}`]: label,
    [`label-align-${labelAlign}`]: label,
    'text-input--has-icon': icon,
  }" :style="[
    { width: (width || '100%') },
    labelStyle,
    {
      '--text-input-color': error ? 'var(--danger-color)' : 'var(--text-primary)',
      '--text-input-hover-color': 'var(--primary-color)',
      '--text-input-active-color': 'var(--primary-color)',
      '--text-input-disabled-color': 'var(--text-disabled)',
      '--text-input-background-color': bgColor || 'var(--input-color, #ffffffaa)',
      '--text-dp-background-color': bgColor || '#ffffff',
      '--text-input-border-radius': '0.5rem',
      '--text-input-padding': '0.5rem',
      '--max-textarea-height': maxHeight || height || '14rem',
      '--textarea-height': height || '5.5rem',
    }
  ]">
    <label v-if="label" :for="id" class="label">
      {{ label }}
    </label>
    <div class="text-input__wrapper">
      <div v-if="icon" class="text-input__icon" @click="focusInput">
        <font-awesome-icon :icon="icon" />
      </div>
      <Datepicker v-if="type === 'date'" :id="id" v-model="dateValue" :placeholder="placeholder" :disabled="disabled"
        :readonly="readonly" :min-date="min" :max-date="max" :format="dateFormat" :enable-time-picker="false"
        :auto-apply="true" :close-on-auto-apply="true" :clearable="true"
        :input-class-name="['text-input__input', { 'text-input__input--has-icon': icon }]"
        @update:model-value="handleDateChange" @focus="handleFocus" @blur="handleBlur" />
      <input v-else-if="type !== 'textarea'" :id="id" :type="type" :value="modelValue" :placeholder="placeholder"
        :required="required" :disabled="disabled" :readonly="readonly" :maxlength="maxlength" class="text-input__input"
        @input="handleInput" @focus="handleFocus" @blur="handleBlur" @keydown="handleKeydown" ref="inputRef" />
      <textarea v-else :id="id" :value="modelValue" :placeholder="placeholder" :required="required" :disabled="disabled"
        class="text-input__input" @input="handleInput" ref="inputRef"></textarea>
      <span v-if="required && !showSaved && !showChanged && !error"
        class="text-input__status required-indicator">required</span>
      <transition name="fade">
        <span v-if="showSaved && !showChanged && !error" class="text-input__status saved-indicator">saved</span>
      </transition>
      <transition name="fade">
        <span v-if="showChanged && !error" class="text-input__status changed-indicator">changed</span>
      </transition>
      <transition name="fade">
        <span v-if="error" class="text-input__status error-indicator" :data-error="error">error</span>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted, onMounted } from 'vue'
import { TextInputProps } from '../types/textinput'
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
  labelPosition: 'top',
  labelAlign: 'left',
  labelWidth: '',
  height: '5.5rem',
  maxHeight: '14rem',
  bgColor: 'var(--input-color, #ffffffee)',
  width: (props) => (props.type === 'date') ? '10rem' : '100%',
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
  if (debounceTimer.value) {
    clearTimeout(debounceTimer.value)
  }
  if (changedTimer.value) {
    clearTimeout(changedTimer.value)
  }

  if (!props.error) {
    showChanged.value = true
  }

  changedTimer.value = window.setTimeout(() => {
    emit('changed')
    isChanged.value = true
  }, 500)

  debounceTimer.value = window.setTimeout(() => {
    handleAutosave(value)
  }, 1500)
}

const focusInput = () => {
  inputRef.value?.focus()
}

const adjustHeight = (element: HTMLTextAreaElement) => {
  element.style.height = 'auto'
  element.style.height = `${element.scrollHeight}px`
}

const handleInput = (event: Event) => {
  const value = (event.target as HTMLTextAreaElement).value
  emit('update:modelValue', value)
  debounceAutosave(value)
  if (props.type === 'text' && (event.target as HTMLTextAreaElement).tagName === 'TEXTAREA') {
    adjustHeight(event.target as HTMLTextAreaElement)
  }
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

  &:not(.text-input--has-icon) {
    .text-input__wrapper {
      grid-template-columns: 1fr;
    }
  }

  &.text-input--has-error {
    border-color: var(--danger-color);

    .text-input__icon {
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

    input,
    textarea {
      color: var(--danger-color);
    }
  }
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
  padding-top: 0.25rem;
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

.text-input__wrapper {
  position: relative;
  display: grid;
  grid-template-columns: 2em auto;
  border: 1px solid var(--text-input-color);
  border-radius: var(--text-input-border-radius);
  transition: all 0.2s ease;
  width: 100%;
  min-height: 2rem;
  background: var(--text-input-background-color);

  &:hover {
    border-color: var(--text-input-hover-color);
    box-shadow: 0 0 2px var(--text-input-hover-color) inset;
  }

  &:focus-within {
    border-color: var(--text-input-active-color);
    box-shadow: 0 0 2px var(--text-input-active-color) inset;
  }
}

.text-input {}

.text-input--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.text-input__icon {
  display: grid;
  place-items: start;
  padding: 0.5rem;
  border-right: 1px solid rgb(from var(--text-input-color) r g b / 20%);
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

.text-input__input {
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: var(--text-input-border-radius);
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

.text-input__status {
  position: absolute;
  display: block;
  top: -1px;
  line-height: 1px;
  right: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  background-color: var(--text-input-background-color);
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
  min-height: var(--textarea-height);
  max-height: var(--max-textarea-height);
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

:deep(.dp__input.text-input__input--has-icon) {
  padding-left: 2.5rem;
}

:deep(.dp__input_icon) {
  display: none;
}

:deep(.dp__input_icon_pad) {
  padding-right: 0.75rem;
}

:deep(.dp__menu) {
  background-color: var(--text-dp-background-color);
  border: 1px solid var(--text-input-color);
  border-radius: var(--text-input-border-radius);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

:deep(.dp__cell_inner) {
  color: var(--text-color);
}

:deep(.dp__today) {
  border-color: var(--text-input-active-color);
}

:deep(.dp__active_date) {
  background-color: var(--text-input-active-color);
  color: white;
}

:deep(.dp__range_start),
:deep(.dp__range_end) {
  background-color: var(--text-input-active-color);
  color: white;
}

:deep(.dp__range_between) {
  background-color: var(--primary-color-light);
  color: var(--text-color);
}

:deep(.dp__arrow_bottom),
:deep(.dp__arrow_top) {
  background-color: inherit;
}
</style>
