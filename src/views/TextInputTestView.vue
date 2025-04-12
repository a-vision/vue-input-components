<template>
  <div class="text-input-test">
    <div class="header">
      <router-link to="/" class="back-link">
        <font-awesome-icon icon="home" />
        <span>Back to Dashboard</span>
      </router-link>
      <h1>Text Input Testing</h1>
    </div>
    <div class="test-container">
      <div class="input-group">
        <h2>Account Information</h2>
        <TextInput
          v-model="username"
          type="text"
          icon="user"
          placeholder="Enter your username"
          :required="true"
          :error="usernameError"
          label="Username"
          label-position="left"
          label-align="right"
          label-width="20%"
          total-width="100%"
        />
        <TextInput
          v-model="password"
          type="password"
          icon="lock"
          placeholder="Enter your password"
          :required="true"
          :error="passwordError"
          label="Password"
          label-position="left"
          label-align="right"
          label-width="20%"
          total-width="100%"
        />
      </div>
      <div class="input-group">
        <h2>Address Information</h2>
        <TextInput
          v-model="street"
          label="Street Address"
          type="text"
          icon="road"
          placeholder="Enter your street address"
          :error="streetError"
          :autosave="handleStreetAutosave"
          label-position="top"
          label-align="left"
          total-width="100%"
        />
        <div class="address-row">
          <TextInput
            v-model="city"
            label="City"
            type="text"
            icon="building"
            placeholder="Enter your city"
            :error="cityError"
            :autosave="handleCityAutosave"
            label-position="top"
            label-align="left"
            total-width="48%"
          />
          <TextInput
            v-model="postalCode"
            label="Postal Code"
            type="text"
            icon="fas fa-hashtag"
            placeholder="1234AB"
            :error="postalCodeError"
            @update:modelValue="handlePostalCodeInput"
            :autosave="handlePostalCodeAutosave"
            label-position="top"
            label-align="left"
            total-width="48%"
          />
        </div>
        <TextInput
          v-model="country"
          label="Country"
          type="text"
          icon="flag"
          placeholder="Enter your country"
          :error="countryError"
          :autosave="handleCountryAutosave"
          label-position="top"
          label-align="left"
          total-width="100%"
        />
        <TextInput
          v-model="comment"
          label="Comment"
          type="text"
          placeholder="Your comment"
          label-position="top"
          label-align="left"
          total-width="100%"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TextInput from '@/components/TextInput.vue'

const username = ref('')
const password = ref('')
const street = ref('')
const city = ref('')
const postalCode = ref('')
const country = ref('')
const comment = ref('')

const usernameError = ref('')
const passwordError = ref('')
const streetError = ref('')
const cityError = ref('')
const postalCodeError = ref('')
const countryError = ref('')

const formatPostalCode = (value: string) => {
  // Remove all non-alphanumeric characters except spaces
  let formatted = value.replace(/[^a-zA-Z0-9\s]/g, '')

  // Convert to uppercase
  formatted = formatted.toUpperCase()

  // Format as NNNN AA
  if (formatted.length > 4) {
    formatted = formatted.slice(0, 4) + ' ' + formatted.slice(4, 6)
  }

  return formatted
}

const handlePostalCodeInput = (value: string) => {
  postalCodeError.value = ''
}

const handlePostalCodeAutosave = async (value: string) => {
  // First validate the format
  if (value.length > 0) {
    const postalCodeRegex = /^[0-9]{4}\s?[A-Za-z]{2}$/
    if (!postalCodeRegex.test(value)) {
      postalCodeError.value = 'Postal code must be in format NNNN AA (e.g., 1234 AB)'
      return
    }
  }

  // Format the value after successful validation
  const formattedValue = formatPostalCode(value)
  postalCode.value = formattedValue

  await new Promise((resolve) => setTimeout(resolve, 1000))
  postalCodeError.value = ''
}

const handleStreetAutosave = async (value: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  streetError.value = ''
}

const handleCityAutosave = async (value: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  cityError.value = ''
}

const handleCountryAutosave = async (value: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  countryError.value = ''
}
</script>

<style scoped>
.text-input-test {
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--text-color);
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--primary-color);
}

h1 {
  margin: 0;
  color: #212529;
}

h2 {
  color: #495057;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.test-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group {
  background: var(--card-bg);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.input-group h2 {
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
  font-size: 1.1rem;
}

.address-row {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}
</style>
