export interface NavigationItem {
  id: string
  label: string
  url?: string
  icon?: string
  disabled?: boolean
  alignment?: 'left' | 'right' | 'start' | 'end'
  width?: string
  children?: NavigationItem[]
  hideExternalOpen?: boolean
  labelSize?: 'small' | 'normal' | 'large'
}

export interface NavigationProps {
  items: NavigationItem[]
  type?: 'tiles' | 'dropdowns'
  orientation?: 'horizontal' | 'vertical'
  activeItem?: string
  color?: string
  hoverColor?: string
  activeColor?: string
  disabledColor?: string
  gap?: string
  padding?: string
  borderRadius?: string
  height?: string
  width?: string
  backgroundColor?: string
  activeBackgroundColor?: string
  activeItemAlignment?: 'left' | 'right' | 'top' | 'bottom'
  showBottomBorder?: boolean
  bottomBorderColor?: string
  iconSize?: 'normal' | 'large'
}
