# Vue Input Components

A collection of reusable Vue 3 input components with TypeScript support.

## Features

### TextInput Component

- Customizable label position (top, left, right, bottom)
- Label alignment options (left, right, center)
- Icon support with click-to-focus functionality
- Error and success states with messages
- Required field indicator
- Autosave functionality with debounce
- Change indicators (saved, changed)
- Fully responsive
- Accessible
- TypeScript support

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Usage

```vue
<template>
  <TextInput
    v-model="username"
    label="Username"
    type="text"
    icon="user"
    placeholder="Enter your username"
    :error="usernameError"
    :autosave="handleUsernameAutosave"
    label-position="top"
    label-align="left"
    required
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TextInput from '@/components/TextInput.vue'

const username = ref('')
const usernameError = ref('')

const handleUsernameAutosave = async (value: string) => {
  // Your autosave logic here
}
</script>
```

## Props

| Prop          | Type                                   | Default   | Description                                |
| ------------- | -------------------------------------- | --------- | ------------------------------------------ |
| modelValue    | string                                 | required  | The input value (v-model)                  |
| label         | string                                 | undefined | Input label                                |
| type          | string                                 | 'text'    | Input type (text, password, email, etc.)   |
| icon          | string                                 | undefined | Font Awesome icon name                     |
| placeholder   | string                                 | undefined | Input placeholder                          |
| required      | boolean                                | false     | Whether the field is required              |
| disabled      | boolean                                | false     | Whether the field is disabled              |
| error         | string                                 | undefined | Error message                              |
| success       | string                                 | undefined | Success message                            |
| labelPosition | 'top' \| 'left' \| 'right' \| 'bottom' | 'top'     | Label position                             |
| labelAlign    | 'left' \| 'right' \| 'center'          | 'left'    | Label text alignment                       |
| totalWidth    | string                                 | '100%'    | Total width of the component               |
| inputWidth    | string                                 | undefined | Width of the input field                   |
| labelWidth    | string                                 | undefined | Width of the label (when position is left) |
| autosave      | (value: string) => Promise<void>       | undefined | Autosave callback function                 |

## Events

| Event             | Payload | Description                                         |
| ----------------- | ------- | --------------------------------------------------- |
| update:modelValue | string  | Emitted when the input value changes                |
| changed           | void    | Emitted when the value has changed (500ms debounce) |
| saved             | void    | Emitted when autosave completes successfully        |

## License

MIT
