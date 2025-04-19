<template>
  <div class="dropdown-test">
    <div class="dropdown-test__back">
      <router-link to="/" class="back-link"> ← Back to Dashboard </router-link>
    </div>

    <div class="dropdown-test__section">
      <h2>Single Select Dropdown</h2>
      <Dropdown v-model="selectedSingle" :options="options" placeholder="Select a color" filterable required
        @update:modelValue="handleSingleChange" error="This is an error" />
      <div v-if="selectedSingle" class="selection-info">
        Selected: {{ getOptionLabel(selectedSingle) }}
      </div>
    </div>

    <div class="dropdown-test__section">
      <h2>Multiple Select Dropdown</h2>
      <Dropdown v-model="selectedMultiple" :options="options" multiple filterable placeholder="Select colors"
        icon="paintbrush" @update:modelValue="handleMultipleChange" color="#aa0000" />
      <div v-if="selectedMultiple.length" class="selection-info">
        Selected: {{ getSelectedLabels(selectedMultiple).join(', ') }}
      </div>
    </div>

    <div class="dropdown-test__section">
      <h2>Dropdown with Icon</h2>
      <Dropdown v-model="selectedWithIcon" :options="options" placeholder="Select with icon" icon="house"
        @update:modelValue="handleIconChange" />
      <div v-if="selectedWithIcon" class="selection-info">
        Selected: {{ getOptionLabel(selectedWithIcon) }}
      </div>
    </div>

    <div class="dropdown-test__section">
      <h2>Dropdown with Large Icon</h2>
      <Dropdown v-model="selectedWithLargeIcon" :options="options" placeholder="Select with large icon"
        icon="gauge-high" iconSize="large" @update:modelValue="handleLargeIconChange" />
      <div v-if="selectedWithLargeIcon" class="selection-info">
        Selected: {{ getOptionLabel(selectedWithLargeIcon) }}
      </div>
    </div>

    <div class="dropdown-test__section">
      <h2>Custom Styled Dropdown</h2>
      <Dropdown v-model="selectedCustom" :options="options" placeholder="Select with custom style" color="#4a90e2"
        hoverColor="#357abd" activeColor="#2c5a8c" borderRadius="1rem" padding="0.75rem 1rem"
        @update:modelValue="handleCustomChange" />
      <div v-if="selectedCustom" class="selection-info">
        Selected: {{ getOptionLabel(selectedCustom) }}
      </div>
    </div>

    <div class="dropdown-test__section">
      <h2>Disabled Dropdown</h2>
      <Dropdown v-model="selectedDisabled" :options="options" disabled placeholder="This dropdown is disabled" />
    </div>

    <div class="dropdown-test__section">
      <h2>Dropdown with Disabled Options</h2>
      <Dropdown v-model="selectedWithDisabled" :options="optionsWithDisabled" placeholder="Some options are disabled"
        @update:modelValue="handleDisabledChange" />
      <div v-if="selectedWithDisabled" class="selection-info">
        Selected: {{ getOptionLabel(selectedWithDisabled) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DropdownOption } from '../types/dropdown'
import Dropdown from '@/components/Dropdown.vue'

const options: DropdownOption[] = [
  { id: 'red', label: 'Red' },
  { id: 'blue', label: 'Blue' },
  { id: 'green', label: 'Green' },
  { id: 'yellow', label: 'Yellow' },
  { id: 'purple', label: 'Purple' },
  { id: 'orange', label: 'Orange' },
  { id: 'pink', label: 'Pink' },
  { id: 'brown', label: 'Brown' },
  { id: 'gray', label: 'Gray' },
  { id: 'black', label: 'Black' },
]

const optionsWithDisabled: DropdownOption[] = [
  { id: 'red', label: 'Red' },
  { id: 'blue', label: 'Blue', disabled: true },
  { id: 'green', label: 'Green' },
  { id: 'yellow', label: 'Yellow', disabled: true },
  { id: 'purple', label: 'Purple' },
]

const selectedSingle = ref('')
const selectedMultiple = ref<string[]>([])
const selectedCustom = ref('')
const selectedDisabled = ref('')
const selectedWithDisabled = ref('')
const selectedWithIcon = ref('')
const selectedWithLargeIcon = ref('')

const getOptionLabel = (id: string) => {
  return options.find((option) => option.id === id)?.label || ''
}

const getSelectedLabels = (ids: string[]) => {
  return ids.map((id) => getOptionLabel(id)).filter(Boolean)
}

const handleSingleChange = (value: string | string[]) => {
  if (typeof value === 'string') {
    console.log('Single selection changed:', value)
  }
}

const handleMultipleChange = (value: string | string[]) => {
  if (Array.isArray(value)) {
    console.log('Multiple selection changed:', value)
  }
}

const handleCustomChange = (value: string | string[]) => {
  if (typeof value === 'string') {
    console.log('Custom selection changed:', value)
  }
}

const handleDisabledChange = (value: string | string[]) => {
  if (typeof value === 'string') {
    console.log('Selection with disabled options changed:', value)
  }
}

const handleIconChange = (value: string | string[]) => {
  if (typeof value === 'string') {
    console.log('Selection with icon changed:', value)
  }
}

const handleLargeIconChange = (value: string | string[]) => {
  if (typeof value === 'string') {
    console.log('Selection with large icon changed:', value)
  }
}
</script>

<style scoped>
.dropdown-test {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  margin-bottom: 5rem;
}

.dropdown-test__back {
  margin-bottom: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a90e2;
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  color: #357abd;
}

.dropdown-test__section {
  margin-bottom: 3rem;
}

.dropdown-test__section h2 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.5rem;
}

.selection-info {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #f7fafc;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #4a5568;
}
</style>
