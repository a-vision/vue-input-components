# Vue Input Components

A collection of reusable Vue 3 input components with TypeScript support, designed for modern web applications.

## Features

- 🚀 Built with Vue 3 and TypeScript
- 🎨 Customizable styling with CSS variables
- 📦 Tree-shakeable components
- 🎯 Fully typed with TypeScript
- 🎨 Beautiful and consistent design
- 🔍 Accessible by default
- 📱 Responsive and mobile-friendly

## Installation

```bash
npm install @a-vision-software/vue-input-components
```

## Usage

### Import Styles

```typescript
import '@a-vision-software/vue-input-components/styles.css'
```

### Import Components

```typescript
import { TextInput, FileUpload, Action } from '@a-vision-software/vue-input-components'
```

## Components

### TextInput

A versatile text input component with validation and error handling.

```vue
<template>
  <TextInput
    v-model="value"
    label="Username"
    placeholder="Enter your username"
    :error="error"
    :disabled="false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TextInput } from '@a-vision-software/vue-input-components'

const value = ref('')
const error = ref('')
</script>
```

#### Props

| Prop          | Type                                                            | Default  | Description                   |
| ------------- | --------------------------------------------------------------- | -------- | ----------------------------- |
| `modelValue`  | `string`                                                        | `''`     | The input value               |
| `label`       | `string`                                                        | `''`     | The input label               |
| `placeholder` | `string`                                                        | `''`     | The input placeholder         |
| `error`       | `string`                                                        | `''`     | Error message to display      |
| `disabled`    | `boolean`                                                       | `false`  | Whether the input is disabled |
| `required`    | `boolean`                                                       | `false`  | Whether the input is required |
| `type`        | `'text' \| 'password' \| 'email' \| 'number' \| 'tel' \| 'url'` | `'text'` | The input type                |

### FileUpload

A file upload component with drag-and-drop support and file type validation.

```vue
<template>
  <FileUpload
    v-model="files"
    accept="image/*"
    :multiple="true"
    :max-size="5 * 1024 * 1024"
    @error="handleError"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FileUpload } from '@a-vision-software/vue-input-components'

const files = ref<File[]>([])

const handleError = (error: string) => {
  console.error(error)
}
</script>
```

#### Props

| Prop         | Type      | Default           | Description                            |
| ------------ | --------- | ----------------- | -------------------------------------- |
| `modelValue` | `File[]`  | `[]`              | The selected files                     |
| `accept`     | `string`  | `'*'`             | Accepted file types                    |
| `multiple`   | `boolean` | `false`           | Whether multiple files can be selected |
| `max-size`   | `number`  | `5 * 1024 * 1024` | Maximum file size in bytes             |
| `disabled`   | `boolean` | `false`           | Whether the upload is disabled         |

### Action

A versatile action component that can be used as a button or link with customizable colors and icons.

```vue
<template>
  <Action icon="save" label="Save Changes" :color="'#4CAF50'" @click="handleSave" />
</template>

<script setup lang="ts">
import { Action } from '@a-vision-software/vue-input-components'

const handleSave = () => {
  console.log('Saving changes...')
}
</script>
```

#### Props

| Prop       | Type                              | Default     | Description                    |
| ---------- | --------------------------------- | ----------- | ------------------------------ |
| `icon`     | `string`                          | `''`        | Font Awesome icon name         |
| `label`    | `string`                          | `''`        | Action label text              |
| `color`    | `string`                          | `'#4CAF50'` | Custom color for the action    |
| `disabled` | `boolean`                         | `false`     | Whether the action is disabled |
| `href`     | `string`                          | `''`        | URL for link actions           |
| `type`     | `'button' \| 'submit' \| 'reset'` | `'button'`  | Button type                    |

## Styling

The components use CSS variables for easy customization. You can override these variables in your application:

```css
:root {
  --primary-color: #4caf50;
  --text-primary: #333;
  --text-secondary: #666;
  --border-color: #ddd;
  --input-bg: #fff;
  --error-color: #f44336;
}
```

## Development

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## License

MIT © [A-Vision Software](https://github.com/a-vision)
