export interface DropdownOption {
  id: string
  label: string
  disabled?: boolean
}

export interface DropdownProps {
  options: DropdownOption[]
  modelValue: string | string[]
  multiple?: boolean
  placeholder?: string
  filterable?: boolean
  disabled?: boolean
  maxHeight?: string
  width?: string
  color?: string
  hoverColor?: string
  activeColor?: string
  disabledColor?: string
  backgroundColor?: string
  borderRadius?: string
  padding?: string
  icon?: string
  iconSize?: 'normal' | 'large'
  error?: string
  required?: boolean
  autosave?: (value: string | string[]) => Promise<void>
  label?: string
  labelPosition?: 'top' | 'left'
  labelAlign?: 'left' | 'center' | 'right'
  labelWidth?: string
}
