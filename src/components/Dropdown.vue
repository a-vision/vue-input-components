<template>
  <div class="dropdown" :class="{
    'dropdown--open': isOpen,
    'dropdown--disabled': disabled,
    'dropdown--multiple': multiple,
    'dropdown--large-icon': iconSize === 'large',
  }" :style="{
    '--dropdown-color': color,
    '--dropdown-hover-color': hoverColor,
    '--dropdown-active-color': activeColor,
    '--dropdown-disabled-color': disabledColor,
    '--dropdown-background-color': backgroundColor,
    '--dropdown-border-radius': borderRadius,
    '--dropdown-padding': padding,
    '--dropdown-max-height': maxHeight,
    '--dropdown-width': width,
  }" @click="toggleDropdown" @keydown.esc="closeDropdown" @keydown.space.prevent="toggleDropdown"
    @keydown.enter.prevent="toggleDropdown" tabindex="0">
    <div class="dropdown__selected">
      <div v-if="icon" class="dropdown__icon">
        <img v-if="icon.startsWith('img:')" :src="icon.substring(4)" :alt="placeholder" class="dropdown__icon-image" />
        <font-awesome-icon v-else :icon="icon" />
      </div>
      <div v-if="!hasSelection" class="dropdown__placeholder">
        {{ placeholder }}
      </div>
      <div v-else class="dropdown__selected-items">
        <template v-if="multiple">
          <div v-for="option in selectedOptions" :key="option.id" class="dropdown__selected-tag"
            @click.stop="deselectOption(option)">
            {{ option.label }}
            <font-awesome-icon icon="xmark" class="dropdown__selected-tag-remove" />
          </div>
        </template>
        <template v-else>
          {{ selectedOptions[0]?.label }}
        </template>
      </div>
      <div class="dropdown__icons">
        <font-awesome-icon v-if="hasSelection && !multiple" icon="xmark" class="dropdown__clear"
          @click.stop="clearSelection" />
        <font-awesome-icon icon="chevron-down" class="dropdown__arrow" :class="{ 'dropdown__arrow--open': isOpen }" />
      </div>
    </div>

    <div v-if="isOpen" class="dropdown__content">
      <div v-if="filterable" class="dropdown__filter">
        <input ref="filterInput" v-model="filterText" type="text" class="dropdown__filter-input"
          placeholder="Type to filter..." @click.stop @keydown.stop />
      </div>
      <div class="dropdown__options">
        <div v-for="option in filteredOptions" :key="option.id" class="dropdown__option" :class="{
          'dropdown__option--selected': isSelected(option),
          'dropdown__option--disabled': option.disabled,
        }" @click.stop="toggleOption(option)">
          <font-awesome-icon v-if="multiple && isSelected(option)" icon="check" class="dropdown__option-check" />
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import type { DropdownProps, DropdownOption } from '../types/dropdown'

const props = withDefaults(defineProps<DropdownProps>(), {
  multiple: false,
  placeholder: 'Select an option',
  filterable: false,
  disabled: false,
  maxHeight: '300px',
  width: '100%',
  color: 'var(--text-primary)',
  hoverColor: 'var(--primary)',
  activeColor: 'var(--primary)',
  disabledColor: 'var(--text-disabled)',
  backgroundColor: 'white',
  borderRadius: '0.375rem',
  padding: '0.5rem',
  icon: '',
  iconSize: 'normal',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
}>()

const isOpen = ref(false)
const filterText = ref('')
const filterInput = ref<HTMLInputElement | null>(null)

const selectedOptions = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.options.filter((option) => props.modelValue.includes(option.id))
  }
  return props.options.filter((option) => option.id === props.modelValue)
})

const hasSelection = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.length > 0
  }
  return !!props.modelValue
})

const filteredOptions = computed(() => {
  if (!filterText.value) return props.options
  const searchText = filterText.value.toLowerCase()
  return props.options.filter((option) =>
    option.label.toLowerCase().includes(searchText)
  )
})

const isSelected = (option: DropdownOption) => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(option.id)
  }
  return option.id === props.modelValue
}

const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value && props.filterable) {
    nextTick(() => {
      filterInput.value?.focus()
    })
  }
}

const closeDropdown = () => {
  isOpen.value = false
  filterText.value = ''
}

const toggleOption = (option: DropdownOption) => {
  if (option.disabled) return

  if (props.multiple) {
    const currentValue = Array.isArray(props.modelValue) ? props.modelValue : []
    const newValue = currentValue.includes(option.id)
      ? currentValue.filter((id) => id !== option.id)
      : [...currentValue, option.id]
    emit('update:modelValue', newValue)
  } else {
    emit('update:modelValue', option.id)
    closeDropdown()
  }
}

const deselectOption = (option: DropdownOption) => {
  if (props.disabled || option.disabled) return

  if (props.multiple && Array.isArray(props.modelValue)) {
    const newValue = props.modelValue.filter((id) => id !== option.id)
    emit('update:modelValue', newValue)
  }
}

const clearSelection = () => {
  if (props.disabled) return
  emit('update:modelValue', props.multiple ? [] : '')
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.dropdown')) {
    closeDropdown()
  }
}

watch(isOpen, (newValue) => {
  if (newValue) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script>

<style scoped>
.dropdown {
  position: relative;
  width: var(--dropdown-width);
  font-family: Arial, sans-serif;
  cursor: pointer;
  user-select: none;
  outline: none;
}

.dropdown--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.dropdown__selected {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  min-height: 2.5rem;
  border: 1px solid var(--dropdown-color);
  border-radius: var(--dropdown-border-radius);
  background-color: var(--dropdown-background-color);
  color: var(--dropdown-color);
  transition: all 0.2s ease;
}

.dropdown:not(.dropdown--disabled):hover .dropdown__selected {
  border-color: var(--dropdown-hover-color);
  color: var(--dropdown-hover-color);
}

.dropdown--open .dropdown__selected {
  border-color: var(--dropdown-active-color);
  color: var(--dropdown-active-color);
}

.dropdown__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  color: var(--dropdown-color);
  padding: 0 0.75rem;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  grid-column: 1;
  height: 100%;
  align-self: stretch;
}

.dropdown__selected-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  min-width: 0;
  padding: 0.5rem 0.75rem;
  grid-column: 2;
}

.dropdown__placeholder {
  color: var(--text-secondary);
  font-style: italic;
  padding: 0.5rem 0.75rem;
  grid-column: 2;
}

.dropdown__selected-tag {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.375rem;
  background-color: var(--dropdown-active-color);
  color: white;
  border-radius: calc(var(--dropdown-border-radius) * 0.75);
  font-size: 0.875rem;
  color: var(--dropdown-color);
}

.dropdown__selected-tag-remove {
  font-size: 0.75rem;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.dropdown__selected-tag:hover .dropdown__selected-tag-remove {
  opacity: 1;
}

.dropdown__icons {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.75rem;
  grid-column: 3;
}

.dropdown__clear {
  font-size: 0.875rem;
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.dropdown__clear:hover {
  opacity: 1;
}

.dropdown__arrow {
  font-size: 0.875rem;
  transition: transform 0.2s ease;
}

.dropdown__arrow--open {
  transform: rotate(180deg);
}

.dropdown__content {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.25rem;
  background-color: var(--dropdown-background-color);
  border: 1px solid var(--dropdown-color);
  border-radius: var(--dropdown-border-radius);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.dropdown__filter {
  padding: calc(var(--dropdown-padding) * 0.75);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.dropdown__filter-input {
  width: 100%;
  padding: 0.375rem 0.5rem;
  border: 1px solid var(--dropdown-color);
  border-radius: calc(var(--dropdown-border-radius) * 0.75);
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.dropdown__filter-input:focus {
  border-color: var(--dropdown-active-color);
}

.dropdown__options {
  max-height: var(--dropdown-max-height);
  overflow-y: auto;
}

.dropdown__option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: var(--dropdown-padding);
  transition: all 0.2s ease;
}

.dropdown__option:not(.dropdown__option--disabled):hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: var(--dropdown-hover-color);
}

.dropdown__option--selected {
  color: var(--dropdown-active-color);
  background-color: rgba(0, 0, 0, 0.05);
}

.dropdown__option--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  color: var(--dropdown-disabled-color);
}

.dropdown__option-check {
  font-size: 0.875rem;
}

.dropdown__icon-image {
  width: 1.2em;
  height: 1.2em;
  object-fit: contain;
}

.dropdown--large-icon .dropdown__selected {
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 0.5rem;
}

.dropdown--large-icon .dropdown__icon {
  grid-column: 1;
  grid-row: 1;
  border-right: none;
  padding: 0.75rem 0;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  height: auto;
}

.dropdown--large-icon .dropdown__selected-items,
.dropdown--large-icon .dropdown__placeholder {
  grid-column: 1;
  grid-row: 2;
  text-align: center;
  padding: 0.5rem 0.75rem;
}

.dropdown--large-icon .dropdown__icons {
  grid-column: 1;
  grid-row: 3;
  justify-content: center;
  padding: 0.75rem 0;
}
</style>
