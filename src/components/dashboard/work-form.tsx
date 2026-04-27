'use client';

import { trpc } from '@/utils/trpc';
import { workFormSchema, type WorkFormValues } from '@/lib/schemas/form-schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import TipTapEditor from '@/components/editor/tiptap-editor';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { Loader2, Paperclip, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import { DateRangePicker } from '@/components/ui/date-range-picker';

interface WorkFormProps {
  initialData?: {
    _id: string;
    company: string;
    role: string;
    techStack: string[];
    startDate: string;
    endDate?: string;
    current: boolean;
    description: Record<string, unknown>;
    attachments: string[];
    order: number;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

export default function WorkForm({
  initialData,
  onSuccess,
  onCancel,
}: WorkFormProps) {
  const utils = trpc.useUtils();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<WorkFormValues>({
    resolver: zodResolver(workFormSchema),
    defaultValues: {
      company: initialData?.company ?? '',
      role: initialData?.role ?? '',
      techStack: initialData?.techStack?.join(', ') ?? '',
      startDate: initialData?.startDate
        ? format(new Date(initialData.startDate), 'yyyy-MM-dd')
        : '',
      endDate: initialData?.endDate
        ? format(new Date(initialData.endDate), 'yyyy-MM-dd')
        : '',
      current: initialData?.current ?? false,
      description: initialData?.description ?? { type: 'doc', content: [{ type: 'paragraph' }] },
      attachments: initialData?.attachments ?? [],
      order: initialData?.order ?? 0,
    },
  });

  const [isCurrent, startDateVal, endDateVal, attachments] = useWatch({
    control,
    name: ['current', 'startDate', 'endDate', 'attachments'],
  });

  const createMutation = trpc.work.create.useMutation({
    onSuccess: () => { utils.work.list.invalidate(); onSuccess(); },
  });
  const updateMutation = trpc.work.update.useMutation({
    onSuccess: () => { utils.work.list.invalidate(); onSuccess(); },
  });

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    setPendingFiles((prev) => [...prev, ...selected]);
    e.target.value = '';
  }

  async function handleUpload() {
    if (!pendingFiles.length) return;
    setUploading(true);
    setUploadError('');
    try {
      const formData = new FormData();
      pendingFiles.forEach((file) => formData.append('files', file));
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const { urls } = (await res.json()) as { urls: string[] };
      setValue('attachments', [...attachments, ...urls]);
      setPendingFiles([]);
    } catch {
      setUploadError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  function onSubmit(values: WorkFormValues) {
    const techStack = values.techStack.split(',').map((s) => s.trim()).filter(Boolean);
    const payload = {
      company: values.company,
      role: values.role,
      techStack,
      startDate: new Date(values.startDate).toISOString(),
      endDate: values.current
        ? undefined
        : values.endDate ? new Date(values.endDate).toISOString() : undefined,
      current: values.current,
      description: values.description as { type: 'doc'; content: Record<string, unknown>[] },
      attachments: values.attachments,
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

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='company'>Company</Label>
          <Input id='company' {...register('company')} />
          {errors.company && <p className='text-xs text-destructive'>{errors.company.message}</p>}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='role'>Role</Label>
          <Input id='role' {...register('role')} />
          {errors.role && <p className='text-xs text-destructive'>{errors.role.message}</p>}
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='techStack'>Tech Stack (comma-separated)</Label>
        <Input id='techStack' placeholder='e.g. React, Node.js, TypeScript' {...register('techStack')} />
      </div>

      <div className='space-y-2'>
        <Label>Date Range</Label>
        <DateRangePicker
          from={startDateVal ? new Date(startDateVal) : undefined}
          to={!isCurrent && endDateVal ? new Date(endDateVal) : undefined}
          toDisabled={isCurrent}
          onSelect={(range) => {
            setValue('startDate', range?.from ? format(range.from, 'yyyy-MM-dd') : '', { shouldValidate: true });
            setValue('endDate', range?.to ? format(range.to, 'yyyy-MM-dd') : '', { shouldValidate: true });
          }}
        />
        {errors.startDate && <p className='text-xs text-destructive'>{errors.startDate.message}</p>}
      </div>

      <div className='flex items-center gap-2'>
        <Controller
          name='current'
          control={control}
          render={({ field }) => (
            <Switch id='current' checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        <Label htmlFor='current'>Currently working here</Label>
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
        <Label>Attachments</Label>

        {attachments.length > 0 && (
          <ul className='space-y-1'>
            {attachments.map((url: string) => {
              const name = decodeURIComponent(url.split('/').pop() ?? url);
              return (
                <li key={url} className='flex items-center gap-2 text-sm'>
                  <Paperclip className='h-3 w-3 shrink-0 text-muted-foreground' />
                  <a href={url} target='_blank' rel='noopener noreferrer'
                    className='text-primary underline truncate max-w-xs'>
                    {name}
                  </a>
                  <button type='button'
                    onClick={() => setValue('attachments', attachments.filter((u: string) => u !== url))}
                    className='ml-auto text-muted-foreground hover:text-destructive'>
                    <X className='h-3 w-3' />
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {pendingFiles.length > 0 && (
          <ul className='space-y-1'>
            {pendingFiles.map((file, i) => (
              <li key={i} className='flex items-center gap-2 text-sm text-muted-foreground'>
                <Paperclip className='h-3 w-3 shrink-0' />
                <span className='truncate max-w-xs'>{file.name}</span>
                <button type='button'
                  onClick={() => setPendingFiles((prev) => prev.filter((_, j) => j !== i))}
                  className='ml-auto hover:text-destructive'>
                  <X className='h-3 w-3' />
                </button>
              </li>
            ))}
          </ul>
        )}

        {uploadError && <p className='text-sm text-destructive'>{uploadError}</p>}

        <div className='flex gap-2'>
          <Button type='button' variant='outline' size='sm' onClick={() => fileInputRef.current?.click()}>
            <Paperclip className='mr-2 h-3 w-3' />
            Select Files
          </Button>
          {pendingFiles.length > 0 && (
            <Button type='button' variant='outline' size='sm' onClick={handleUpload} disabled={uploading}>
              {uploading ? <Loader2 className='mr-2 h-3 w-3 animate-spin' /> : <Upload className='mr-2 h-3 w-3' />}
              Upload {pendingFiles.length} file{pendingFiles.length > 1 ? 's' : ''}
            </Button>
          )}
        </div>
        <input ref={fileInputRef} type='file' multiple className='hidden' onChange={handleFileChange} />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='order'>Display Order</Label>
        <Input id='order' type='number' min={0} {...register('order', { valueAsNumber: true })} />
      </div>

      <div className='flex gap-2 justify-end'>
        <Button type='button' variant='outline' onClick={onCancel}>Cancel</Button>
        <Button type='submit' disabled={isSubmitting || uploading}>
          {isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
          {initialData ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
}
