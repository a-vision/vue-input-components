export interface ActionProps {
  icon?: string
  label?: string
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  color?: string
  size?: 'small' | 'regular' | 'large'
  variant?: 'solid' | 'transparent'
}

export interface ActionEmits {
  (e: 'click', event: MouseEvent): void
}

export interface ActionComponent {
  focus: () => void
  blur: () => void
}
