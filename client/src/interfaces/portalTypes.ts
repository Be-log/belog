// Portal.tsx
export interface PortalProps {
  type?: string
  onclick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void
  afteraction?: () => void
}

// Authentication.tsx
export interface AuthenticationProps {
  onclick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  afteraction?: () => void
}

export interface IptValueStateType {
  value: {
    [key: string]: string
  }
}
