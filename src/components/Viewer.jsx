import React from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

const EditorViewer = ({ initialValue }) => {
  console.log('initialValue', initialValue);
  return (
    <div>
      {initialValue}
      <Viewer initialValue={initialValue} />
    </div>
  );
};

export default EditorViewer;
