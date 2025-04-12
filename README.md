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
- Multiline text input support (textarea)
- Adjustable number of visible rows
- Optional maximum length limit
- Vertical resizing support

### FileUpload Component

- Drag and drop file upload
- File size validation (20MB limit)
- Multiple file selection
- Progress bar for upload status
- Customizable icons
- Automatic or manual upload modes
- File list display with sizes
- Error handling and status messages

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

## Components

### TextInput

Basic text input component with advanced features, including textarea support.

#### Props

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
| isTextarea    | boolean                                | false     | Whether to render as a textarea            |
| maxHeight     | string                                 | '14rem'   | Maximum height for textarea                |
| height        | string                                 | '5.5rem'  | Initial height for textarea                |

#### Events

| Event             | Payload | Description                                         |
| ----------------- | ------- | --------------------------------------------------- |
| update:modelValue | string  | Emitted when the input value changes                |
| changed           | void    | Emitted when the value has changed (500ms debounce) |
| saved             | void    | Emitted when autosave completes successfully        |

#### Examples

##### Basic Text Input

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

##### Textarea Input

```vue
<template>
  <TextInput
    v-model="description"
    label="Description"
    type="textarea"
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
import TextInput from '@/components/TextInput.vue'

const description = ref('')
const descriptionError = ref('')

const handleDescriptionAutosave = async (value: string) => {
  // Your autosave logic here
}
</script>
```

### FileUpload

Flexible file upload component with drag and drop support.

#### Props

| Prop        | Type   | Required | Default  | Description                                                            |
| ----------- | ------ | -------- | -------- | ---------------------------------------------------------------------- |
| `icon`      | string | No       | 'upload' | Font Awesome icon name to display                                      |
| `uploadUrl` | string | No       | -        | URL to upload files to. If not provided, manual upload mode is enabled |

#### Events

| Event             | Parameters      | Description                                         |
| ----------------- | --------------- | --------------------------------------------------- |
| `upload-complete` | `files: File[]` | Emitted when files are successfully uploaded        |
| `upload-error`    | `error: string` | Emitted when an upload error occurs                 |
| `files-selected`  | `files: File[]` | Emitted when files are selected (manual mode)       |
| `start-upload`    | `files: File[]` | Emitted when upload button is clicked (manual mode) |

#### Examples

##### Automatic Upload Mode

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

##### Manual Upload Mode

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

All components use CSS variables for theming. You can customize the colors by overriding these variables in your application's CSS:

```css
:root {
  /* Base colors */
  --primary-color: #3498db;
  --primary-color-light: rgba(52, 152, 219, 0.2);
  --secondary-color: #2ecc71;

  /* Text colors */
  --text-color: #2c3e50;
  --text-color-light: #7f8c8d;

  /* UI colors */
  --border-color: #dcdfe6;
  --icon-color: #95a5a6;

  /* State colors */
  --error-color: #e74c3c;
  --error-color-light: rgba(231, 76, 60, 0.2);
  --success-color: #2ecc71;
  --success-color-light: rgba(46, 204, 113, 0.2);
  --warning-color: #f1c40f;
  --warning-color-light: rgba(241, 196, 15, 0.2);

  /* Background colors */
  --disabled-color: #bdc3c7;
  --disabled-background: #f5f7fa;
  --card-bg: #ffffff;
  --background-color: #f8f9fa;

  /* File Upload specific colors */
  --upload-border-color: var(--border-color);
  --upload-bg-color: var(--background-color);
  --upload-dragging-border-color: var(--primary-color);
  --upload-dragging-bg-color: var(--primary-color-light);
  --upload-has-files-border-color: var(--success-color);
  --upload-has-files-bg-color: var(--success-color-light);
  --upload-icon-color: var(--icon-color);
  --upload-text-color: var(--text-color-light);
  --progress-bg-color: var(--disabled-background);
  --progress-color: var(--primary-color);
}
```

## Browser Support

All components use modern browser features and should work in all modern browsers that support:

- CSS Variables
- Flexbox
- File API (for FileUpload)
- Drag and Drop API (for FileUpload)
- FormData (for FileUpload)
- XMLHttpRequest (for FileUpload)

## License

MIT
