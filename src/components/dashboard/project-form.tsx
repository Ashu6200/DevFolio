'use client';

import { trpc } from '@/utils/trpc';
import { projectFormSchema, type ProjectFormValues } from '@/lib/schemas/form-schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import TipTapEditor from '@/components/editor/tiptap-editor';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      description: initialData?.description ?? { type: 'doc', content: [{ type: 'paragraph' }] },
      techStack: initialData?.techStack?.join(', ') ?? '',
      githubLink: initialData?.githubLink ?? '',
      liveUrl: initialData?.liveUrl ?? '',
      coverImage: initialData?.coverImage ?? '',
      featured: initialData?.featured ?? false,
      order: initialData?.order ?? 0,
    },
  });

  const createMutation = trpc.project.create.useMutation({
    onSuccess: () => { utils.project.list.invalidate(); onSuccess(); },
  });
  const updateMutation = trpc.project.update.useMutation({
    onSuccess: () => { utils.project.list.invalidate(); onSuccess(); },
  });

  function onSubmit(values: ProjectFormValues) {
    const techStack = values.techStack.split(',').map((s) => s.trim()).filter(Boolean);
    const payload = {
      title: values.title,
      description: values.description as { type: 'doc'; content: Record<string, unknown>[] },
      techStack,
      githubLink: values.githubLink || undefined,
      liveUrl: values.liveUrl || undefined,
      coverImage: values.coverImage || undefined,
      featured: values.featured,
      order: values.order,
    };

    const onError = (e: { message: string }) =>
      setError('root', { message: e.message });

    if (initialData?._id) {
      updateMutation.mutate({ id: initialData._id, ...payload }, { onError });
    } else {
      createMutation.mutate(payload, { onError });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      {errors.root && (
        <div className='rounded-md bg-destructive/10 p-3 text-sm text-destructive'>
          {errors.root.message}
        </div>
      )}

      <div className='space-y-2'>
        <Label htmlFor='title'>Title</Label>
        <Input id='title' {...register('title')} />
        {errors.title && <p className='text-xs text-destructive'>{errors.title.message}</p>}
      </div>

      <div className='space-y-2'>
        <Label>Description</Label>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <TipTapEditor content={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='techStack'>Tech Stack (comma-separated)</Label>
        <Input
          id='techStack'
          placeholder='e.g. React, Node.js, MongoDB'
          {...register('techStack')}
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='githubLink'>GitHub Link</Label>
          <Input id='githubLink' type='url' placeholder='https://github.com/...' {...register('githubLink')} />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='liveUrl'>Live URL</Label>
          <Input id='liveUrl' type='url' placeholder='https://...' {...register('liveUrl')} />
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='coverImage'>Cover Image URL</Label>
        <Input
          id='coverImage'
          placeholder='https://res.cloudinary.com/...'
          {...register('coverImage')}
        />
      </div>

      <div className='flex items-center gap-2'>
        <Controller
          name='featured'
          control={control}
          render={({ field }) => (
            <Switch id='featured' checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        <Label htmlFor='featured'>Featured project</Label>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='order'>Display Order</Label>
        <Input id='order' type='number' min={0} {...register('order', { valueAsNumber: true })} />
      </div>

      <div className='flex gap-2 justify-end'>
        <Button type='button' variant='outline' onClick={onCancel}>Cancel</Button>
        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {initialData ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
}
