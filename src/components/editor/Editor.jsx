import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import "highlight.js/styles/atom-one-dark.css";
import { tiptapExtensions as extensions } from "../../constants";
import MenuBar from "./MenuBar";

const Editor = ({ onDataChange, content, editable }) => {
  const editor = useEditor({
    editable,
    extensions: extensions,
    editorProps: {
      attributes: {
        class:
          "prose lg:prose-lg ml-1 prose-h1:my-0 prose-h2:my-0 prose-h3:my-0 prose-p:my-0 prose-ul:my-0 prose-ol:my-0 prose-li:my-0 prose-pre:my-0 prose-blockquote:my-5 focus:outline-none prose-pre:bg-[#282c34] prose-pre:text-[#abb2bf] prose-pre:font-xl",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onDataChange(json);
    },
    content: content,
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <div
      className={`relative w-full ${editable && "min-h-[300px] border-2 p-1"}`}
    >
      {editable && <MenuBar editor={editor} />}
      <EditorContent editor={editor} className="p-3" />
    </div>
  );
};

export default Editor;
