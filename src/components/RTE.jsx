import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import conf from '../conf/conf.js';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="inline-block text-xs font-semibold uppercase tracking-wider text-slate-300 pl-1">
          {label}
        </label>
      )}

      <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-xl">
        <Controller
          name={name || "content"}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { onChange, value } }) => (
            <Editor
              apiKey={conf.tinymceAPI && conf.tinymceAPI !== "" ? conf.tinymceAPI : "no-api-key"}
              onInit={(evt, editor) => {
                if (value) editor.setContent(value);
              }}
              onEditorChange={onChange}
              init={{
                height: 480,
                menubar: true,
                promotion: false,
                branding: false,
                skin: "oxide-dark",
                content_css: "dark",
                plugins: [
                  "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
                  "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                  "insertdatetime", "media", "table", "wordcount"
                ],
                toolbar:
                  "undo redo | blocks | bold italic forecolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | link image media | removeformat | code fullscreen",
                content_style: "body { font-family: Inter, system-ui, Helvetica, Arial, sans-serif; font-size: 14px; color: #f8fafc; background-color: #0f172a; }"
              }}
              value={value}
            />
          )}
        />
      </div>
    </div>
  );
}
