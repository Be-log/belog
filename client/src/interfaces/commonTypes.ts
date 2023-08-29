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

// Input.tsx
export interface IptProps {
  type: string
  id: string
  $label: string
  placeholder?: string
}

export interface IptChangeType {
  e: React.ChangeEvent<HTMLInputElement>
  id: string
}

export interface errorMsgType {
  status: boolean
  msg: string
  id: string
}

export interface regexType {
  id: string
  newValue: string
}
