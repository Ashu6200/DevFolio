'use client';

import { generateHTML } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import LinkExtension from '@tiptap/extension-link';
import ImageExtension from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { useMemo } from 'react';

const lowlight = createLowlight(common);

const extensions = [
  StarterKit.configure({ codeBlock: false }),
  LinkExtension,
  ImageExtension,
  CodeBlockLowlight.configure({ lowlight }),
];

interface TipTapRendererProps {
  content: Record<string, unknown>;
  className?: string;
}

export function TipTapRenderer({ content, className }: TipTapRendererProps) {
  const html = useMemo(() => {
    try {
      return generateHTML(content as Parameters<typeof generateHTML>[0], extensions);
    } catch {
      return '<p>Unable to render content.</p>';
    }
  }, [content]);

  return (
    <div
      className={`prose dark:prose-invert max-w-none ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
