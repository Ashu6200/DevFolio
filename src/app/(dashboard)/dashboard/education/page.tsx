'use client';

import { trpc } from '@/utils/trpc';
import { Button } from '@/components/ui/button';
import { TipTapRenderer } from '@/components/editor/tiptap-renderer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import EducationForm from '@/components/dashboard/education-form';
import React, { useState } from 'react';
import { Plus, Pencil, Trash2, GraduationCap, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function EducationPage() {
  const { data: items, isLoading } = trpc.education.list.useQuery();
  const utils = trpc.useUtils();
  const deleteMutation = trpc.education.delete.useMutation({
    onSuccess: () => utils.education.list.invalidate(),
  });

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<(typeof items extends (infer T)[] | undefined ? T : never) | null>(null);

  function handleEdit(item: NonNullable<typeof items>[number]) {
    setEditItem(item);
    setShowForm(true);
  }

  function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this entry?')) {
      deleteMutation.mutate({ id });
    }
  }

  function handleClose() {
    setShowForm(false);
    setEditItem(null);
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl font-bold'>Education</h1>
          <p className='text-muted-foreground mt-1'>
            Manage your education history
          </p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className='mr-2 h-4 w-4' />
            Add Education
          </Button>
        )}
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editItem ? 'Edit Education' : 'Add Education'}</CardTitle>
          </CardHeader>
          <CardContent>
            <EducationForm
              initialData={
                editItem
                  ? {
                      _id: (editItem as Record<string, unknown>)._id as string,
                      institution: editItem.institution,
                      degree: editItem.degree,
                      field: editItem.field,
                      startDate: editItem.startDate as unknown as string,
                      endDate: editItem.endDate as unknown as string | undefined,
                      current: editItem.current,
                      description: editItem.description,
                      highlights: editItem.highlights,
                      order: editItem.order,
                    }
                  : undefined
              }
              onSuccess={handleClose}
              onCancel={handleClose}
            />
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <div className='space-y-4'>
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardContent className='p-6'>
                <div className='animate-pulse space-y-3'>
                  <div className='h-5 bg-muted rounded w-1/3' />
                  <div className='h-4 bg-muted rounded w-1/2' />
                  <div className='h-4 bg-muted rounded w-2/3' />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {items && items.length === 0 && !showForm && (
        <Card>
          <CardContent className='flex flex-col items-center justify-center py-12'>
            <GraduationCap className='h-12 w-12 text-muted-foreground mb-4' />
            <p className='text-muted-foreground'>No education entries yet.</p>
            <Button
              variant='outline'
              className='mt-4'
              onClick={() => setShowForm(true)}
            >
              Add your first entry
            </Button>
          </CardContent>
        </Card>
      )}

      <div className='space-y-4'>
        {items?.map((item) => {
          const id = (item as Record<string, unknown>)._id as string;
          return (
            <Card key={id}>
              <CardContent className='p-6'>
                <div className='flex items-start justify-between'>
                  <div className='space-y-2'>
                    <h3 className='text-lg font-semibold'>{item.degree}</h3>
                    <p className='text-muted-foreground'>{item.institution}</p>
                    <p className='text-sm text-muted-foreground'>{item.field}</p>
                    <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                      <Calendar className='h-3 w-3' />
                      <span>
                        {format(new Date(item.startDate as unknown as string), 'MMM yyyy')} –{' '}
                        {item.current
                          ? 'Present'
                          : item.endDate
                            ? format(new Date(item.endDate as unknown as string), 'MMM yyyy')
                            : ''}
                      </span>
                    </div>
                    {item.description && typeof item.description === 'object' && (
                      <TipTapRenderer
                        content={item.description as Record<string, unknown>}
                        className='prose-sm mt-2'
                      />
                    )}
                    {item.highlights?.length > 0 && (
                      <div className='flex flex-wrap gap-1 mt-2'>
                        {item.highlights.map((h: string) => (
                          <Badge key={h} variant='secondary' className='text-xs'>
                            {h}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className='flex gap-1 shrink-0'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className='h-4 w-4' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleDelete(id)}
                    >
                      <Trash2 className='h-4 w-4 text-destructive' />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
