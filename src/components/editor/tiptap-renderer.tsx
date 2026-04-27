'use client';

import { generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { useMemo } from 'react';

const lowlight = createLowlight(common);

// ✅ Match editor's LinkExtension config so links render with same styles
const extensions = [
  StarterKit.configure({ codeBlock: false }),
  LinkExtension.configure({
    HTMLAttributes: { class: 'text-primary underline cursor-pointer' },
  }),
  ImageExtension.configure({
    HTMLAttributes: { class: 'rounded-lg max-w-full h-auto' },
  }),
  CodeBlockLowlight.configure({ lowlight }),
];

interface TipTapRendererProps {
  content: Record<string, unknown>;
  className?: string;
}

export function TipTapRenderer({ content, className }: TipTapRendererProps) {
  const html = useMemo(() => {
    if (!content || Object.keys(content).length === 0) return '';
    try {
      return generateHTML(content as Parameters<typeof generateHTML>[0], extensions);
    } catch {
      return '<p>Unable to render content.</p>';
    }
  }, [content]);

  if (!html) return null;

  return (
    <div
      className={[
        'prose dark:prose-invert max-w-none',
        // ✅ Force list markers — prose styles get stripped by TipTap/ProseMirror output
        '[&_ul]:list-disc [&_ul]:pl-6',
        '[&_ol]:list-decimal [&_ol]:pl-6',
        '[&_li]:my-0.5',
        // ✅ Nested lists
        '[&_ul_ul]:list-circle [&_ul_ul_ul]:list-square',
        className || '',
      ].join(' ')}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}