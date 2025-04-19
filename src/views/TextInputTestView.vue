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
      <div class="column">
        <div class="input-group">
          <h2>Account Information</h2>
          <TextInput v-model="username" type="text" icon="user" placeholder="Enter your username" :required="true"
            :error="usernameError" label="Username" label-position="left" label-align="right" label-width="20%" />
          <TextInput v-model="password" type="password" icon="lock" placeholder="Enter your password" :required="true"
            :error="passwordError" label="Password" label-position="left" label-align="right" label-width="20%" />
        </div>
        <div class="input-group">
          <h2>Additional Information</h2>
          <TextInput v-model="bio" type="textarea" label="Bio" icon="user-circle"
            placeholder="Tell us about yourself..." :rows="4" :maxLength="500" :error="bioError"
            :autosave="handleBioAutosave" label-position="top" label-align="left" height="10rem" max-height="20rem" />
          <TextInput v-model="feedback" type="textarea" label="Feedback" icon="comment"
            placeholder="Share your thoughts..." :rows="3" :maxLength="1000" :error="feedbackError"
            :autosave="handleFeedbackAutosave" label-position="left" label-align="left" label-width="auto"
            max-height="8rem" />
        </div>
      </div>
      <div class="column">
        <div class="input-group">
          <h2>Address Information</h2>
          <TextInput v-model="street" label="Street Address" type="text" icon="road"
            placeholder="Enter your street address" :error="streetError" :autosave="handleStreetAutosave"
            label-position="top" label-align="left" />
          <div class="address-row">
            <TextInput v-model="city" label="City" type="text" icon="building" placeholder="Enter your city"
              :error="cityError" :autosave="handleCityAutosave" label-position="top" label-align="left"
              total-width="calc(100% - 11rem)" />
            <TextInput v-model="postalCode" label="Postal Code" type="text" icon="fas fa-hashtag" placeholder="1234AB"
              :error="postalCodeError" @update:modelValue="handlePostalCodeInput" :autosave="handlePostalCodeAutosave"
              label-position="top" label-align="left" width="10rem" />
          </div>
          <TextInput v-model="country" label="Country" type="text" icon="flag" placeholder="Enter your country"
            :error="countryError" :autosave="handleCountryAutosave" label-position="top" label-align="left" />
          <TextInput v-model="birthDate" type="date" label="Date of Birth" icon="calendar" placeholder="DD/MM/YYYY"
            :min="minDate" :max="maxDate" :error="birthDateError" :autosave="handleBirthDateAutosave"
            label-position="top" label-align="left" />
          <TextInput v-model="comment" label="Comment" type="text" placeholder="Your comment" label-position="top"
            label-align="left" />
        </div>
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
const birthDate = ref('')
const comment = ref('')
const bio = ref('')
const feedback = ref('')

const usernameError = ref('')
const passwordError = ref('')
const streetError = ref('')
const cityError = ref('')
const postalCodeError = ref('')
const countryError = ref('')
const birthDateError = ref('')
const bioError = ref('')
const feedbackError = ref('')

const minDate = '01/01/1900'
const maxDate = '31/12/2024'

const formatPostalCode = (value: string) => {
  // Remove all non-alphanumeric characters except spaces
  let formatted = value.replace(/[^a-zA-Z0-9]/g, '')

  // Convert to uppercase
  formatted = formatted.toUpperCase()

  // Format as NNNN AA
  if (formatted.length > 4) {
    formatted = formatted.slice(0, 4) + ' ' + formatted.slice(4, 6)
  }

  return formatted
}

const handlePostalCodeInput = (_value: string) => {
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
  console.log('Autosaving street:', value)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  streetError.value = ''
}

const handleCityAutosave = async (value: string) => {
  console.log('Autosaving city:', value)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  cityError.value = ''
}

const handleCountryAutosave = async (value: string) => {
  console.log('Autosaving country:', value)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  countryError.value = ''
}

const handleBirthDateAutosave = async (value: string) => {
  console.log('Autosaving birth date:', value)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  birthDateError.value = ''
}

const handleBioAutosave = async (value: string) => {
  console.log('Autosaving bio:', value)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  bioError.value = ''
}

const handleFeedbackAutosave = async (value: string) => {
  console.log('Autosaving feedback:', value)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  feedbackError.value = ''
}
</script>

<style scoped>
.text-input-test {
  padding: 2rem;
  min-height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=2070');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.text-input-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.input-section {
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.input-section h2 {
  margin-bottom: 1rem;
  color: var(--text-color);
}

.group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 1rem;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 600px), 1fr));
  gap: 1rem;
}

.column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: fit-content;
  backdrop-filter: blur(5px);
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

@media (max-width: 1200px) {
  .test-container {
    grid-template-columns: 1fr;
  }
}
</style>
