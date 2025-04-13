declare module '@a-vision-software/vue-input-components' {
  import { DefineComponent } from 'vue'

  export const TextInput: DefineComponent<{
    modelValue?: string
    label?: string
    placeholder?: string
    required?: boolean
    disabled?: boolean
    error?: string
  }>

  export const FileUpload: DefineComponent<{
    modelValue?: File[]
    maxFiles?: number
    maxFileSize?: number
    accept?: string
    uploadUrl?: string
    required?: boolean
    disabled?: boolean
    error?: string
  }>
}
