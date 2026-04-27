'use client';

import { useRef, useState, type ChangeEvent } from 'react';
import { useCurrentEditor, useEditorState } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { uploadEditorImages } from './upload-editor-images';
import {
  Bold, Italic, Strikethrough, Code,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, CodeSquare,
  Link, Image, ImagePlus, Loader2, Undo, Redo,
  type LucideIcon,
} from 'lucide-react';

type ToolbarItem =
  | { separator: true }
  | {
    icon: LucideIcon;
    action: () => void;
    active: boolean;
    tooltip: string;
    disabled?: boolean;
    iconClassName?: string;
  };

// ✅ No props needed — editor comes from context
export default function EditorToolbar() {
  const { editor } = useCurrentEditor();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // ✅ useEditorState is the official TipTap way to get reactive isActive() values.
  // It re-renders this component only when the selected state actually changes,
  // which is what makes the toolbar buttons reflect the real editor state.
  const editorState = useEditorState({
    editor,
    selector: ({ editor: e }) => {
      if (!e) return null;
      return {
        isBold: e.isActive('bold'),
        isItalic: e.isActive('italic'),
        isStrike: e.isActive('strike'),
        isCode: e.isActive('code'),
        isH1: e.isActive('heading', { level: 1 }),
        isH2: e.isActive('heading', { level: 2 }),
        isH3: e.isActive('heading', { level: 3 }),
        isBulletList: e.isActive('bulletList'),
        isOrderedList: e.isActive('orderedList'),
        isBlockquote: e.isActive('blockquote'),
        isCodeBlock: e.isActive('codeBlock'),
        isLink: e.isActive('link'),
      };
    },
  });

  if (!editor) return null;

  function addLink() {
    const previousUrl = editor!.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor!.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor!.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }

  function addImageUrl() {
    const url = window.prompt('Image URL');
    if (!url) return;
    editor!.chain().focus().setImage({ src: url }).run();
  }

  async function uploadImages(files: File[]) {
    setIsUploadingImage(true);
    try {
      const images = await uploadEditorImages(files);
      images.forEach((image) => {
        editor!.chain().focus().setImage({ src: image.url, alt: image.name }).run();
      });
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Image upload failed.');
    } finally {
      setIsUploadingImage(false);
    }
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = '';
    if (!files.length) return;
    void uploadImages(files);
  }

  const items: ToolbarItem[] = [
    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editorState?.isBold ?? false, tooltip: 'Bold' },
    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editorState?.isItalic ?? false, tooltip: 'Italic' },
    { icon: Strikethrough, action: () => editor.chain().focus().toggleStrike().run(), active: editorState?.isStrike ?? false, tooltip: 'Strikethrough' },
    { icon: Code, action: () => editor.chain().focus().toggleCode().run(), active: editorState?.isCode ?? false, tooltip: 'Inline Code' },
    { separator: true },
    { icon: Heading1, action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editorState?.isH1 ?? false, tooltip: 'Heading 1' },
    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editorState?.isH2 ?? false, tooltip: 'Heading 2' },
    { icon: Heading3, action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editorState?.isH3 ?? false, tooltip: 'Heading 3' },
    { separator: true },
    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editorState?.isBulletList ?? false, tooltip: 'Bullet List' },
    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editorState?.isOrderedList ?? false, tooltip: 'Ordered List' },
    { icon: Quote, action: () => editor.chain().focus().toggleBlockquote().run(), active: editorState?.isBlockquote ?? false, tooltip: 'Blockquote' },
    { icon: CodeSquare, action: () => editor.chain().focus().toggleCodeBlock().run(), active: editorState?.isCodeBlock ?? false, tooltip: 'Code Block' },
    { separator: true },
    { icon: Link, action: addLink, active: editorState?.isLink ?? false, tooltip: 'Link' },
    { icon: Image, action: addImageUrl, active: false, tooltip: 'Image URL' },
    {
      icon: isUploadingImage ? Loader2 : ImagePlus,
      action: () => fileInputRef.current?.click(),
      active: false,
      tooltip: isUploadingImage ? 'Uploading image' : 'Upload Image',
      disabled: isUploadingImage,
      iconClassName: isUploadingImage ? 'animate-spin' : undefined,
    },
    { separator: true },
    { icon: Undo, action: () => editor.chain().focus().undo().run(), active: false, tooltip: 'Undo' },
    { icon: Redo, action: () => editor.chain().focus().redo().run(), active: false, tooltip: 'Redo' },
  ];

  return (
    <div className='flex flex-wrap items-center gap-0.5 border-b px-2 py-1.5 bg-muted/50'>
      {items.map((item, index) => {
        if ('separator' in item) {
          return <Separator key={index} orientation='vertical' className='mx-1 h-6' />;
        }
        const Icon = item.icon;
        return (
          <Button
            key={index}
            variant='ghost'
            size='sm'
            type='button'
            className={`h-8 w-8 p-0 ${item.active ? 'bg-accent' : ''}`}
            // ✅ onMouseDown fires before the editor loses focus.
            // preventDefault keeps focus in the editor, then action runs — all in one event.
            onMouseDown={(e) => {
              e.preventDefault();
              if (!item.disabled) item.action();
            }}
            title={item.tooltip}
            disabled={item.disabled}
          >
            <Icon className={`h-4 w-4 ${item.iconClassName ?? ''}`} />
          </Button>
        );
      })}
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        multiple
        className='hidden'
        onChange={handleImageChange}
      />
    </div>
  );
}