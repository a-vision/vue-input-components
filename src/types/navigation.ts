export interface NavigationItem {
  id: string
  label: string
  url?: string
  icon?: string
  disabled?: boolean
  alignment?: 'left' | 'right'
  width?: string
  children?: NavigationItem[]
}

export interface NavigationProps {
  items: NavigationItem[]
  type?: 'tiles' | 'tabs' | 'dropdowns'
  orientation?: 'horizontal' | 'vertical'
  showIcons?: boolean
  activeItem?: string
  activeItemAlignment?: 'start' | 'end'
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
}
