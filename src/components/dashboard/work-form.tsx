'use client';

import { trpc } from '@/utils/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface WorkFormProps {
  initialData?: {
    _id: string;
    company: string;
    role: string;
    techStack: string[];
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
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
  const [company, setCompany] = useState(initialData?.company ?? '');
  const [role, setRole] = useState(initialData?.role ?? '');
  const [techStackStr, setTechStackStr] = useState(
    initialData?.techStack?.join(', ') ?? ''
  );
  const [startDate, setStartDate] = useState(
    initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : ''
  );
  const [endDate, setEndDate] = useState(
    initialData?.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : ''
  );
  const [current, setCurrent] = useState(initialData?.current ?? false);
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [order, setOrder] = useState(initialData?.order ?? 0);

  const createMutation = trpc.work.create.useMutation({
    onSuccess: () => {
      utils.work.list.invalidate();
      onSuccess();
    },
  });

  const updateMutation = trpc.work.update.useMutation({
    onSuccess: () => {
      utils.work.list.invalidate();
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
      company,
      role,
      techStack,
      startDate: new Date(startDate).toISOString(),
      endDate: current ? undefined : endDate ? new Date(endDate).toISOString() : undefined,
      current,
      description,
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

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='company'>Company</Label>
          <Input
            id='company'
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='role'>Role</Label>
          <Input
            id='role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='techStack'>Tech Stack (comma-separated)</Label>
        <Input
          id='techStack'
          value={techStackStr}
          onChange={(e) => setTechStackStr(e.target.value)}
          placeholder='e.g. React, Node.js, TypeScript'
        />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='space-y-2'>
          <Label htmlFor='startDate'>Start Date</Label>
          <Input
            id='startDate'
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='endDate'>End Date</Label>
          <Input
            id='endDate'
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={current}
          />
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <Switch id='current' checked={current} onCheckedChange={setCurrent} />
        <Label htmlFor='current'>Currently working here</Label>
      </div>

      <div className='space-y-2'>
        <Label htmlFor='description'>Description</Label>
        <Textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
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
