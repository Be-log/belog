import { ReactNode } from 'react'

// Image.tsx
export interface ImgProps {
  $width?: number
  $height?: number
  $border?: number
  src: string
  alt?: string
}

// Button.tsx
export interface BtnProps {
  children: string
  $color?: 'white' | 'mint' | 'transparent'
  $shape?: 'circle'
  onclick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
}

// SignLayout.tsx
export interface SignLayoutProps {
  children: ReactNode
}

// Input.tsx
export interface IptProps {
  type: string
  id: string
  $label: string
  placeholder?: string
}
