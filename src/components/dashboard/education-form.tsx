'use client';

import { trpc } from '@/utils/trpc';
import { educationFormSchema, type EducationFormValues } from '@/lib/schemas/form-schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import TipTapEditor from '@/components/editor/tiptap-editor';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { DateRangePicker } from '@/components/ui/date-range-picker';

interface EducationFormProps {
  initialData?: {
    _id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: Record<string, unknown>;
    highlights: string[];
    order: number;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

export default function EducationForm({
  initialData,
  onSuccess,
  onCancel,
}: EducationFormProps) {
  const utils = trpc.useUtils();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EducationFormValues>({
    resolver: zodResolver(educationFormSchema),
    defaultValues: {
      institution: initialData?.institution ?? '',
      degree: initialData?.degree ?? '',
      field: initialData?.field ?? '',
      startDate: initialData?.startDate
        ? format(new Date(initialData.startDate), 'yyyy-MM-dd')
        : '',
      endDate: initialData?.endDate
        ? format(new Date(initialData.endDate), 'yyyy-MM-dd')
        : '',
      current: initialData?.current ?? false,
      description: initialData?.description ?? { type: 'doc', content: [{ type: 'paragraph' }] },
      highlights: initialData?.highlights?.join(', ') ?? '',
      order: initialData?.order ?? 0,
    },
  });

  const [isCurrent, startDateVal, endDateVal] = useWatch({
    control,
    name: ['current', 'startDate', 'endDate'],
  });

  const createMutation = trpc.education.create.useMutation({
    onSuccess: () => { utils.education.list.invalidate(); onSuccess(); },
  });
  const updateMutation = trpc.education.update.useMutation({
    onSuccess: () => { utils.education.list.invalidate(); onSuccess(); },
  });

  function onSubmit(values: EducationFormValues) {
    const highlights = values.highlights.split(',').map((s) => s.trim()).filter(Boolean);
    const payload = {
      institution: values.institution,
      degree: values.degree,
      field: values.field,
      startDate: new Date(values.startDate).toISOString(),
      endDate: values.current
        ? undefined
        : values.endDate ? new Date(values.endDate).toISOString() : undefined,
      current: values.current,
      description: values.description as { type: 'doc'; content: Record<string, unknown>[] },
      highlights,
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
          <Label htmlFor='institution'>Institution</Label>
          <Input id='institution' {...register('institution')} />
          {errors.institution && <p className='text-xs text-destructive'>{errors.institution.message}</p>}
        </div>
        <div className='space-y-2'>
          <Label htmlFor='degree'>Degree</Label>
          <Input id='degree' {...register('degree')} />
          {errors.degree && <p className='text-xs text-destructive'>{errors.degree.message}</p>}
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='field'>Field of Study</Label>
        <Input id='field' {...register('field')} />
        {errors.field && <p className='text-xs text-destructive'>{errors.field.message}</p>}
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
        <Label htmlFor='current'>Currently studying here</Label>
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
        <Label htmlFor='highlights'>Highlights (comma-separated)</Label>
        <Input id='highlights' placeholder="e.g. Dean's List, Research Award" {...register('highlights')} />
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
