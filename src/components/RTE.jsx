import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import conf from '../conf/conf.js';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <Editor
            apiKey={conf.tinymceAPI} // Replace with your actual TinyMCE API key
            onInit={(evt, editor) => editor.setContent(value || "")}
            onEditorChange={onChange}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image", "advlist", "autolink", "lists", "link", "charmap", "preview",
                "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                "insertdatetime", "media", "table", "help", "wordcount"
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            value={value}
          />
        )}
      />

    </div>
  );
}
