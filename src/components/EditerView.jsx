import React from 'react'
import { Viewer } from '@toast-ui/react-editor'

function EditerView({ markdown }) {

  // console.log('mark : ', typeof (markdown))
  return (
    <>
      <Viewer
        theme='dark'
        initialValue={markdown}
      />
    </>
  )
}

export default EditerView