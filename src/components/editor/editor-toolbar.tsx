'use client';

import { type Editor } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  CodeSquare,
  Link,
  Image,
  Undo,
  Redo,
} from 'lucide-react';

interface EditorToolbarProps {
  editor: Editor | null;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) return null;

  function addLink() {
    const previousUrl = editor!.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor!.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor!
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  }

  function addImage() {
    const url = window.prompt('Image URL');
    if (!url) return;
    editor!.chain().focus().setImage({ src: url }).run();
  }

  const items = [
    {
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive('bold'),
      tooltip: 'Bold',
    },
    {
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive('italic'),
      tooltip: 'Italic',
    },
    {
      icon: Strikethrough,
      action: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive('strike'),
      tooltip: 'Strikethrough',
    },
    {
      icon: Code,
      action: () => editor.chain().focus().toggleCode().run(),
      active: editor.isActive('code'),
      tooltip: 'Inline Code',
    },
    { separator: true },
    {
      icon: Heading1,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editor.isActive('heading', { level: 1 }),
      tooltip: 'Heading 1',
    },
    {
      icon: Heading2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive('heading', { level: 2 }),
      tooltip: 'Heading 2',
    },
    {
      icon: Heading3,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: editor.isActive('heading', { level: 3 }),
      tooltip: 'Heading 3',
    },
    { separator: true },
    {
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive('bulletList'),
      tooltip: 'Bullet List',
    },
    {
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive('orderedList'),
      tooltip: 'Ordered List',
    },
    {
      icon: Quote,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      active: editor.isActive('blockquote'),
      tooltip: 'Blockquote',
    },
    {
      icon: CodeSquare,
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      active: editor.isActive('codeBlock'),
      tooltip: 'Code Block',
    },
    { separator: true },
    {
      icon: Link,
      action: addLink,
      active: editor.isActive('link'),
      tooltip: 'Link',
    },
    {
      icon: Image,
      action: addImage,
      active: false,
      tooltip: 'Image',
    },
    { separator: true },
    {
      icon: Undo,
      action: () => editor.chain().focus().undo().run(),
      active: false,
      tooltip: 'Undo',
    },
    {
      icon: Redo,
      action: () => editor.chain().focus().redo().run(),
      active: false,
      tooltip: 'Redo',
    },
  ];

  return (
    <div className='flex flex-wrap items-center gap-0.5 border-b px-2 py-1.5 bg-muted/50'>
      {items.map((item, index) => {
        if ('separator' in item) {
          return (
            <Separator key={index} orientation='vertical' className='mx-1 h-6' />
          );
        }
        const Icon = item.icon;
        return (
          <Button
            key={index}
            variant='ghost'
            size='sm'
            type='button'
            className={`h-8 w-8 p-0 ${item.active ? 'bg-accent' : ''}`}
            onClick={item.action}
            title={item.tooltip}
          >
            <Icon className='h-4 w-4' />
          </Button>
        );
      })}
    </div>
  );
}
