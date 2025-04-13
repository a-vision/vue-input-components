import type { Component } from 'vue'

export interface TextInputProps {
  modelValue: string
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'date'
  label?: string
  placeholder?: string
  icon?: string
  disabled?: boolean
  readonly?: boolean
  maxlength?: number
  error?: string
  min?: string
  max?: string
  required?: boolean
  success?: string
  labelPosition?: 'top' | 'left'
  labelAlign?: 'left' | 'right' | 'center'
  totalWidth?: string
  inputWidth?: string
  labelWidth?: string
  autosave?: (value: string) => Promise<void>
  isTextarea?: boolean
  maxHeight?: string
  height?: string
}

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

export type TextInputComponent = {
  focus: () => void
  blur: () => void
}

export type FileUploadComponent = Component<FileUploadProps>

export interface ActionProps {
  icon?: string
  label?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  color?: string
  size?: 'small' | 'regular' | 'large'
}

export type ActionComponent = {
  focus: () => void
  blur: () => void
}
