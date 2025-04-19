export interface TextInputProps {
  modelValue: string
  type?: 'text' | 'textarea' | 'password' | 'email' | 'tel' | 'url' | 'date' | 'number'
  placeholder?: string
  label?: string
  icon?: string
  disabled?: boolean
  readonly?: boolean
  maxlength?: number
  error?: string
  min?: Date | string
  max?: Date | string
  autosave?: (value: string) => Promise<void>
  labelPosition?: 'top' | 'left'
  labelAlign?: 'left' | 'center' | 'right'
  labelWidth?: string
  height?: string
  maxHeight?: string
  bgColor?: string
  width?: string
  required?: boolean
}

export interface TextInputEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'changed'): void
  (e: 'saved'): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'keydown', event: KeyboardEvent): void
}

export interface TextInputComponent {
  focus: () => void
  blur: () => void
}
