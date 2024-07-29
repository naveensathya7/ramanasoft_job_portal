import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorInput = ({ field, form }) => {
  const [editorData, setEditorData] = useState(field.value);

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
    form.setFieldValue(field.name, data);
  };

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CKEditorInput;
