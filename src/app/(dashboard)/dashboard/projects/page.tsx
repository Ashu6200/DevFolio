'use client';

import { trpc } from '@/utils/trpc';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProjectForm from '@/components/dashboard/project-form';
import React, { useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  FolderKanban,
  ExternalLink,
  Github,
  Star,
} from 'lucide-react';

export default function ProjectsPage() {
  const { data: items, isLoading } = trpc.project.list.useQuery();
  const utils = trpc.useUtils();
  const deleteMutation = trpc.project.delete.useMutation({
    onSuccess: () => utils.project.list.invalidate(),
  });

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<NonNullable<typeof items>[number] | null>(null);

  function handleEdit(item: NonNullable<typeof items>[number]) {
    setEditItem(item);
    setShowForm(true);
  }

  function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this project?')) {
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
          <h1 className='text-3xl font-bold'>Projects</h1>
          <p className='text-muted-foreground mt-1'>
            Manage your portfolio projects
          </p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className='mr-2 h-4 w-4' />
            Add Project
          </Button>
        )}
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editItem ? 'Edit Project' : 'Add Project'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectForm
              initialData={
                editItem
                  ? {
                      _id: (editItem as Record<string, unknown>)._id as string,
                      title: editItem.title,
                      description: editItem.description as Record<string, unknown>,
                      techStack: editItem.techStack,
                      githubLink: editItem.githubLink,
                      liveUrl: editItem.liveUrl,
                      coverImage: editItem.coverImage,
                      featured: editItem.featured,
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
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardContent className='p-6'>
                <div className='animate-pulse space-y-3'>
                  <div className='h-5 bg-muted rounded w-1/2' />
                  <div className='h-4 bg-muted rounded w-3/4' />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {items && items.length === 0 && !showForm && (
        <Card>
          <CardContent className='flex flex-col items-center justify-center py-12'>
            <FolderKanban className='h-12 w-12 text-muted-foreground mb-4' />
            <p className='text-muted-foreground'>No projects yet.</p>
            <Button
              variant='outline'
              className='mt-4'
              onClick={() => setShowForm(true)}
            >
              Add your first project
            </Button>
          </CardContent>
        </Card>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {items?.map((item) => {
          const id = (item as Record<string, unknown>)._id as string;
          return (
            <Card key={id} className='relative'>
              {item.featured && (
                <div className='absolute top-3 right-3'>
                  <Badge variant='default' className='gap-1'>
                    <Star className='h-3 w-3' />
                    Featured
                  </Badge>
                </div>
              )}
              {item.coverImage && (
                <div className='h-40 overflow-hidden rounded-t-lg'>
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className='w-full h-full object-cover'
                  />
                </div>
              )}
              <CardContent className='p-6'>
                <div className='space-y-3'>
                  <h3 className='text-lg font-semibold pr-20'>{item.title}</h3>

                  {item.techStack?.length > 0 && (
                    <div className='flex flex-wrap gap-1'>
                      {item.techStack.map((t: string) => (
                        <Badge key={t} variant='secondary' className='text-xs'>
                          {t}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className='flex items-center gap-2'>
                    {item.githubLink && (
                      <a
                        href={item.githubLink}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-muted-foreground hover:text-foreground'
                      >
                        <Github className='h-4 w-4' />
                      </a>
                    )}
                    {item.liveUrl && (
                      <a
                        href={item.liveUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-muted-foreground hover:text-foreground'
                      >
                        <ExternalLink className='h-4 w-4' />
                      </a>
                    )}
                  </div>

                  <div className='flex gap-1 pt-2 border-t'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className='h-4 w-4 mr-1' />
                      Edit
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleDelete(id)}
                    >
                      <Trash2 className='h-4 w-4 mr-1 text-destructive' />
                      Delete
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
