export interface FileUploadProps {
  modelValue: File[]
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  required?: boolean
  multiple?: boolean
  accept?: string
  maxSize?: number
  uploadUrl?: string
}

export interface FileUploadEmits {
  (e: 'update:modelValue', files: File[]): void
  (e: 'files-selected', files: File[]): void
  (e: 'start-upload', files: File[]): void
  (e: 'upload-progress', progress: number): void
  (e: 'upload-success', response: any): void
  (e: 'upload-error', error: Error): void
}

export interface FileUploadComponent {
  focus: () => void
  blur: () => void
}
