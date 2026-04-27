'use client';

import { useEffect, useRef } from 'react';
import { useEditor, EditorContent, EditorContext, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import { common, createLowlight } from 'lowlight';
import { useMemo } from 'react';
import EditorToolbar from './editor-toolbar';
import { uploadEditorImages } from './upload-editor-images';

const lowlight = createLowlight(common);

interface TipTapEditorProps {
  content: Record<string, unknown> | null;
  onChange: (json: Record<string, unknown>) => void;
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const editorRef = useRef<Editor | null>(null);

  async function uploadAndInsertImages(files: File[]) {
    try {
      const images = await uploadEditorImages(files);
      images.forEach((image) => {
        editorRef.current
          ?.chain()
          .focus()
          .setImage({ src: image.url, alt: image.name })
          .run();
      });
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Image upload failed.');
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-primary underline cursor-pointer' },
      }),
      ImageExtension.configure({
        HTMLAttributes: { class: 'rounded-lg max-w-full h-auto' },
      }),
      CodeBlockLowlight.configure({ lowlight }),
      Placeholder.configure({ placeholder: 'Write your project description...' }),
    ],
    content: content || { type: 'doc', content: [{ type: 'paragraph' }] },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON() as Record<string, unknown>);
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-sm sm:prose-base max-w-none p-4 min-h-[200px] focus:outline-none ' +
          '[&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1',
      },
      handlePaste: (_view, event) => {
        const files = Array.from(event.clipboardData?.files ?? []).filter(
          (file) => file.type.startsWith('image/')
        );
        if (!files.length) return false;
        event.preventDefault();
        void uploadAndInsertImages(files);
        return true;
      },
      handleDrop: (_view, event) => {
        const files = Array.from(event.dataTransfer?.files ?? []).filter(
          (file) => file.type.startsWith('image/')
        );
        if (!files.length) return false;
        event.preventDefault();
        void uploadAndInsertImages(files);
        return true;
      },
    },
  });

  useEffect(() => {
    editorRef.current = editor;
  }, [editor]);

  // ✅ Memoize context value per TipTap docs to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({ editor }), [editor]);

  return (
    // ✅ Provide editor via context — toolbar reads it with useCurrentEditor
    <EditorContext.Provider value={contextValue}>
      <div className='border rounded-lg overflow-hidden bg-background'>
        <EditorToolbar />
        <EditorContent editor={editor} />
      </div>
    </EditorContext.Provider>
  );
}