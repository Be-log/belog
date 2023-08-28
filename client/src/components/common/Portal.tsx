import ReactDOM from 'react-dom'
import { PortalProps } from '../../interfaces/portalTypes'
import { Authentication } from '../../pages/modal'

const Portal = ({ type, onclick }: PortalProps) => {
  const portalRoot = document.getElementById('portal')

  let componentToRender = null

  if (type === 'Authentication') {
    componentToRender = <Authentication onclick={onclick} />
  }

  return portalRoot ? ReactDOM.createPortal(componentToRender, portalRoot) : null
}

export default Portal
