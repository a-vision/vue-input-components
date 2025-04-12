# TextInput Component

A versatile and customizable text input component for Vue 3 applications with built-in validation and autosave functionality.

## Features

- Label positioning (top, left, right, bottom)
- Label alignment (left, right, center)
- Icon support
- Required field indicator
- Error message display
- Autosave functionality
- Customizable width
- Disabled state
- Placeholder text
- Type support (text, password, etc.)

## Props

| Prop            | Type                                     | Default     | Description                           |
| --------------- | ---------------------------------------- | ----------- | ------------------------------------- |
| `modelValue`    | `string`                                 | `''`        | The input value (v-model)             |
| `label`         | `string`                                 | `undefined` | The label text                        |
| `type`          | `string`                                 | `'text'`    | The input type (text, password, etc.) |
| `icon`          | `string`                                 | `undefined` | Font Awesome icon class               |
| `placeholder`   | `string`                                 | `undefined` | Placeholder text                      |
| `required`      | `boolean`                                | `false`     | Whether the field is required         |
| `error`         | `string`                                 | `undefined` | Error message to display              |
| `success`       | `string`                                 | `undefined` | Success message to display            |
| `labelPosition` | `'top' \| 'left' \| 'right' \| 'bottom'` | `'top'`     | Position of the label                 |
| `labelAlign`    | `'left' \| 'right' \| 'center'`          | `'left'`    | Alignment of the label                |
| `totalWidth`    | `string`                                 | `'100%'`    | Total width of the component          |
| `inputWidth`    | `string`                                 | `'100%'`    | Width of the input field              |
| `disabled`      | `boolean`                                | `false`     | Whether the input is disabled         |
| `autosave`      | `(value: string) => Promise<void>`       | `undefined` | Autosave callback function            |

## Events

| Event               | Description                          |
| ------------------- | ------------------------------------ |
| `update:modelValue` | Emitted when the input value changes |

## Usage

```vue
<template>
  <TextInput
    v-model="username"
    label="Username"
    type="text"
    icon="user"
    placeholder="Enter your username"
    :required="true"
    :error="usernameError"
    label-position="top"
    label-align="left"
    total-width="100%"
    :autosave="handleAutosave"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TextInput from '@/components/TextInput.vue'

const username = ref('')
const usernameError = ref('')

const handleAutosave = async (value: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  usernameError.value = ''
}
</script>
```

## Styling

The component uses CSS variables for colors and styling. Make sure to import the `colors.css` file in your application:

```css
:root {
  /* Text Colors */
  --text-color: #495057;
  --text-muted: #adb5bd;

  /* Border Colors */
  --border-color: #e9ecef;

  /* Background Colors */
  --input-bg: transparent;
  --input-bg-disabled: #f8f9fa;

  /* Status Colors */
  --primary-color: #3b82f6;
  --primary-color-rgb: 59, 130, 246;
  --danger-color: #dc3545;
  --success-color: #28a745;
  --warning-color: #ffc107;

  /* Shadow Colors */
  --shadow-color: rgba(59, 130, 246, 0.1);
}
```

## Notes

- The component requires Font Awesome for icons
- Error messages appear at the bottom of the input field
