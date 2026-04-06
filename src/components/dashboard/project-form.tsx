'use client';

import { trpc } from '@/utils/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import TipTapEditor from '@/components/editor/tiptap-editor';
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface ProjectFormProps {
  initialData?: {
    _id: string;
    title: string;
    description: Record<string, unknown>;
    techStack: string[];
    githubLink?: string;
    liveUrl?: string;
    coverImage?: string;
    featured: boolean;
    order: number;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProjectForm({
  initialData,
  onSuccess,
  onCancel,
}: ProjectFormProps) {
  const utils = trpc.useUtils();
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState<Record<string, unknown>>(
    initialData?.description ?? { type: 'doc', content: [{ type: 'paragraph' }] }
  );
  const [techStackStr, setTechStackStr] = useState(
    initialData?.techStack?.join(', ') ?? ''
  );
  const [githubLink, setGithubLink] = useState(initialData?.githubLink ?? '');
  const [liveUrl, setLiveUrl] = useState(initialData?.liveUrl ?? '');
  const [coverImage, setCoverImage] = useState(initialData?.coverImage ?? '');
  const [featured, setFeatured] = useState(initialData?.featured ?? false);
  const [order, setOrder] = useState(initialData?.order ?? 0);

  const createMutation = trpc.project.create.useMutation({
    onSuccess: () => {
      utils.project.list.invalidate();
      onSuccess();
    },
  });

  const updateMutation = trpc.project.update.useMutation({
    onSuccess: () => {
      utils.project.list.invalidate();
      onSuccess();
    },
  });

  const loading = createMutation.isPending || updateMutation.isPending;
  const error = createMutation.error?.message || updateMutation.error?.message;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const techStack = techStackStr
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title,
      description: description as { type: 'doc'; content: Record<string, unknown>[] },
      techStack,
      githubLink: githubLink || undefined,
      liveUrl: liveUrl || undefined,
      coverImage: coverImage || undefined,
      featured,
      order,
    };

    if (initialData?._id) {
      updateMutation.mutate({ id: initialData._id, ...payload });
    } else {
      createMutation.mutate(payload);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {error && (
        <div className='rounded-md bg-destructive/10 p-3 text-sm text-destructive'>
          {error}
        </div>
      )}

      <div className='space-y-2'>
        <Label htmlFor='title'>Title</Label>
        <Input
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className='space-y-2'>
        <Label>Description</Label>
        <TipTapEditor content={description} onChange={setDescription} />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='techStack'>Tech Stack (comma-separated)</Label>
        <Input
          id='techStack'
          value={techStackStr}
          onChange={(e) => setTechStackStr(e.target.value)}
          placeholder='e.g. React, Node.js, MongoDB'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='githubLink'>GitHub Link</Label>
          <Input
            id='githubLink'
            type='url'
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            placeholder='https://github.com/...'
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='liveUrl'>Live URL</Label>
          <Input
            id='liveUrl'
            type='url'
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            placeholder='https://...'
          />
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='coverImage'>Cover Image URL</Label>
        <Input
          id='coverImage'
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder='https://res.cloudinary.com/...'
        />
      </div>

      <div className='flex items-center gap-2'>
        <Switch id='featured' checked={featured} onCheckedChange={setFeatured} />
        <Label htmlFor='featured'>Featured project</Label>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='order'>Display Order</Label>
        <Input
          id='order'
          type='number'
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
          min={0}
        />
      </div>

      <div className='flex gap-2 justify-end'>
        <Button type='button' variant='outline' onClick={onCancel}>
          Cancel
        </Button>
        <Button type='submit' disabled={loading}>
          {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {initialData ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
}
