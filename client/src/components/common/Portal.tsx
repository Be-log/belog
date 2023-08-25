import ReactDOM from 'react-dom'
import { PortalProps } from '../../interfaces/portalTypes'
import { SignUp } from '../../pages/modal'

const Portal = ({ type, onclick }: PortalProps) => {
  const portalRoot = document.getElementById('portal')

  let componentToRender = null

  if (type === 'SignUp') {
    componentToRender = <SignUp />
  }

  return portalRoot ? ReactDOM.createPortal(componentToRender, portalRoot) : null
}

export default Portal
