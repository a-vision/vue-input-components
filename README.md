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

### TextAreaInput Component

- Multiline text input with adjustable height
- Customizable number of visible rows
- Optional maximum length limit
- All features from TextInput component (label positioning, icons, etc.)
- Vertical resizing support
- Consistent styling with TextInput

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

### TextInput Example

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

### TextAreaInput Example

```vue
<template>
  <TextAreaInput
    v-model="description"
    label="Description"
    icon="pen"
    placeholder="Enter a detailed description"
    :rows="5"
    :maxLength="500"
    :error="descriptionError"
    :autosave="handleDescriptionAutosave"
    label-position="top"
    label-align="left"
    required
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TextAreaInput from '@/components/TextAreaInput.vue'

const description = ref('')
const descriptionError = ref('')

const handleDescriptionAutosave = async (value: string) => {
  // Your autosave logic here
}
</script>
```

## Props

### TextInput Props

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

### TextAreaInput Props

Includes all props from TextInput (except `type`), plus:

| Prop      | Type   | Default   | Description                          |
| --------- | ------ | --------- | ------------------------------------ |
| rows      | number | 3         | Number of visible text rows          |
| maxLength | number | undefined | Maximum number of characters allowed |

## Events

Both components emit the following events:

| Event             | Payload | Description                                         |
| ----------------- | ------- | --------------------------------------------------- |
| update:modelValue | string  | Emitted when the input value changes                |
| changed           | void    | Emitted when the value has changed (500ms debounce) |
| saved             | void    | Emitted when autosave completes successfully        |

## License

MIT

# Vue File Upload Component

A flexible and customizable file upload component for Vue 3 applications.

## Features

- Drag and drop file upload
- File size validation (20MB limit)
- Multiple file selection
- Progress bar for upload status
- Customizable icons
- Automatic or manual upload modes
- File list display with sizes
- Error handling and status messages

## Props

| Prop        | Type   | Required | Default  | Description                                                            |
| ----------- | ------ | -------- | -------- | ---------------------------------------------------------------------- |
| `icon`      | string | No       | 'upload' | Font Awesome icon name to display                                      |
| `uploadUrl` | string | No       | -        | URL to upload files to. If not provided, manual upload mode is enabled |

## Events

| Event             | Parameters      | Description                                         |
| ----------------- | --------------- | --------------------------------------------------- |
| `upload-complete` | `files: File[]` | Emitted when files are successfully uploaded        |
| `upload-error`    | `error: string` | Emitted when an upload error occurs                 |
| `files-selected`  | `files: File[]` | Emitted when files are selected (manual mode)       |
| `start-upload`    | `files: File[]` | Emitted when upload button is clicked (manual mode) |

## Usage Examples

### Basic Usage with Automatic Upload

```vue
<template>
  <FileUpload
    icon="upload"
    upload-url="https://api.example.com/upload"
    @upload-complete="handleUploadComplete"
    @upload-error="handleUploadError"
  />
</template>

<script setup>
import FileUpload from '@/components/FileUpload.vue'

const handleUploadComplete = (files) => {
  console.log('Uploaded files:', files)
}

const handleUploadError = (error) => {
  console.error('Upload error:', error)
}
</script>
```

### Manual Upload Mode

```vue
<template>
  <FileUpload
    icon="image"
    @files-selected="handleFilesSelected"
    @start-upload="handleStartUpload"
  />
</template>

<script setup>
import FileUpload from '@/components/FileUpload.vue'

const handleFilesSelected = (files) => {
  console.log('Selected files:', files)
}

const handleStartUpload = (files) => {
  // Implement your custom upload logic here
  console.log('Starting upload for:', files)
}
</script>
```

## Styling

The component uses CSS variables for theming. You can customize the colors by overriding these variables in your application's CSS:

```css
:root {
  --upload-border-color: #dee2e6;
  --upload-bg-color: #f8f9fa;
  --upload-dragging-border-color: #0d6efd;
  --upload-dragging-bg-color: #e7f1ff;
  --upload-has-files-border-color: #198754;
  --upload-has-files-bg-color: #d1e7dd;
  --upload-icon-color: #6c757d;
  --upload-text-color: #6c757d;
  --progress-bg-color: #e9ecef;
  --progress-color: #0d6efd;
  --success-bg-color: #d1e7dd;
  --success-text-color: #0f5132;
  --error-bg-color: #f8d7da;
  --error-text-color: #842029;
}
```

## File Size Limit

The component enforces a 20MB file size limit. Files larger than this will trigger an error message.

## Browser Support

The component uses modern browser features including:

- File API
- Drag and Drop API
- FormData
- XMLHttpRequest

It should work in all modern browsers that support these features.
