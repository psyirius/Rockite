import React from 'react';
import Editor, { EditorProps } from './Editor';

export * from './Editor';

export default React.forwardRef<HTMLTextAreaElement, EditorProps>((props, ref) => {
  return <Editor {...props} ref={ref} />;
});
