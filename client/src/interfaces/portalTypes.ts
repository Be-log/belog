// Portal.tsx
export interface PortalProps {
  type?: string
  onclick?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void
}

// Authentication.tsx
export interface AuthenticationProps {
  onclick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
