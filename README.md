# Vue Input Components

A collection of reusable Vue 3 input components with consistent styling and behavior.

## Features

- 🚀 Built with Vue 3 and TypeScript
- 🎨 Customizable styling with CSS variables
- 📦 Tree-shakeable components
- 🎯 Fully typed with TypeScript
- 🎨 Beautiful and consistent design
- 🔍 Accessible by default
- 📱 Responsive and mobile-friendly

## Components

### Text Input

A versatile text input component that supports:

- Icons (Font Awesome or images)
- Placeholder text
- Disabled state
- Custom styling (colors, border radius, padding)
- Clear button
- Password toggle
- Character counter
- Error messages

### File Upload

A file upload component with:

- Drag and drop support
- Multiple file selection
- File type validation
- File size limits
- Preview support
- Custom styling
- Progress indicator

### Action

A flexible action component that can be used as:

- Button
- Link
- Icon button
- With various styles and states

### Navigation

A navigation component with:

- Multiple styles (tiles, tabs, dropdowns)
- Icons support
- Sub-navigation items
- Custom styling
- Responsive design
- Keyboard navigation

### Dropdown

A dropdown component that supports:

- Single and multiple selection
- Icons (Font Awesome or images)
- Placeholder text
- Filtering of options
- Disabled state
- Custom styling (colors, border radius, padding)
- Clear selection button
- Tags for multiple selection
- Responsive design

## Installation

```bash
npm install vue-input-components
```

## Usage

```vue
<template>
  <TextInput v-model="text" placeholder="Enter text" icon="user" :disabled="false" />

  <FileUpload v-model="files" accept="image/*" :max-size="5 * 1024 * 1024" @upload="handleUpload" />

  <Action type="button" label="Click me" icon="check" @click="handleClick" />

  <Navigation :items="navigationItems" type="tiles" v-model:active-item="activeItem" />

  <Dropdown
    v-model="selected"
    :options="options"
    placeholder="Select an option"
    icon="house"
    :multiple="true"
    :filterable="true"
  />
</template>
```

## Props

### Text Input

- `modelValue`: string - The input value
- `placeholder`: string - Placeholder text
- `icon`: string - Icon name or image URL (prefixed with 'img:')
- `iconSize`: 'normal' | 'large' - Icon size
- `disabled`: boolean - Whether the input is disabled
- `type`: 'text' | 'password' | 'email' | 'number' - Input type
- `showClear`: boolean - Whether to show the clear button
- `showCounter`: boolean - Whether to show the character counter
- `maxLength`: number - Maximum length of the input
- `error`: string - Error message to display
- Custom styling props (color, hoverColor, etc.)

### File Upload

- `modelValue`: File[] - The selected files
- `accept`: string - Accepted file types
- `maxSize`: number - Maximum file size in bytes
- `multiple`: boolean - Whether to allow multiple files
- `disabled`: boolean - Whether the upload is disabled
- Custom styling props

### Action

- `type`: 'button' | 'link' - The type of action
- `label`: string - The action label
- `icon`: string - Icon name
- `to`: string - Route for link type
- `disabled`: boolean - Whether the action is disabled
- Custom styling props

### Navigation

- `items`: NavigationItem[] - The navigation items
- `type`: 'tiles' | 'tabs' | 'dropdowns' - The navigation style
- `orientation`: 'horizontal' | 'vertical' - The navigation orientation
- `activeItem`: string - The active item ID
- `iconSize`: 'normal' | 'large' - Icon size
- Custom styling props

### Dropdown

- `modelValue`: string | string[] - The selected value(s)
- `options`: DropdownOption[] - The available options
- `placeholder`: string - Placeholder text
- `icon`: string - Icon name or image URL (prefixed with 'img:')
- `iconSize`: 'normal' | 'large' - Icon size
- `multiple`: boolean - Whether to allow multiple selection
- `filterable`: boolean - Whether to allow filtering
- `disabled`: boolean - Whether the dropdown is disabled
- Custom styling props

## Styling

All components support custom styling through CSS variables and props:

```css
:root {
  --primary: #4a90e2;
  --text-primary: rgba(0, 0, 0, 0.8);
  --text-secondary: rgba(0, 0, 0, 0.6);
  --text-disabled: rgba(0, 0, 0, 0.4);
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

MIT
