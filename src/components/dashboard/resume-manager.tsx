'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Upload, FileIcon, Trash2, CheckCircle2, Circle } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/utils/trpc';
import { Badge } from '@/components/ui/badge';

export default function ResumeManager() {
  const [isUploading, setIsUploading] = useState(false);
  const utils = trpc.useUtils();
  
  const { data: resumes, isLoading } = trpc.resume.list.useQuery();
  const createMutation = trpc.resume.create.useMutation({
    onSuccess: () => utils.resume.list.invalidate(),
  });
  const deleteMutation = trpc.resume.delete.useMutation({
    onSuccess: () => utils.resume.list.invalidate(),
  });
  const setActiveMutation = trpc.resume.setActive.useMutation({
    onSuccess: () => utils.resume.list.invalidate(),
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('files', file);

    try {
      setIsUploading(true);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await res.json();
      const url = data.urls[0];

      await createMutation.mutateAsync({
        name: file.name,
        url: url,
      });

      toast.success('Resume uploaded successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload resume');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success('Resume deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete resume');
    }
  };

  const handleSetActive = async (id: string) => {
    try {
      await setActiveMutation.mutateAsync({ id });
      toast.success('Resume set as active!');
    } catch (error) {
      toast.error('Failed to set active resume');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume</CardTitle>
        <CardDescription>Manage your downloadable CVs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-3">
            {resumes?.map((resume) => {
              const id = (resume as unknown as Record<string, unknown>)._id as string;
              return (
                <div key={id} className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${resume.isActive ? 'bg-primary/5 border-primary/20' : 'bg-card'}`}>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => !resume.isActive && handleSetActive(id)}
                      disabled={resume.isActive || setActiveMutation.isPending}
                      className="shrink-0 p-1 rounded-full hover:bg-muted transition-colors cursor-pointer disabled:cursor-default"
                    >
                      {resume.isActive ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                    <div className="p-2 bg-primary/10 rounded-full">
                      <FileIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm line-clamp-1">{resume.name}</p>
                        {resume.isActive && <Badge variant="secondary" className="text-[10px] h-4 px-1">Active</Badge>}
                      </div>
                      <a href={resume.url} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:underline">
                        View File
                      </a>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDelete(id)} 
                    disabled={deleteMutation.isPending}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
            
            {resumes?.length === 0 && (
              <div className="text-center p-4 text-sm text-muted-foreground">
                No resumes uploaded yet.
              </div>
            )}
          </div>
        )}

        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 text-center mt-4">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div>
            <p className="font-medium text-sm">Upload new resume</p>
            <p className="text-xs text-muted-foreground">Upload a PDF or document file</p>
          </div>
          <div className="mt-2">
            <Button asChild disabled={isUploading || createMutation.isPending}>
              <label className="cursor-pointer">
                {(isUploading || createMutation.isPending) ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Select File"
                )}
                <Input type="file" className="hidden" accept=".pdf,.doc,.docx,image/*" onChange={handleFileUpload} disabled={isUploading || createMutation.isPending} />
              </label>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
