'use client';

import { authClient } from '@/lib/auth-client';
import { getFingerprintHash } from '@/lib/fingerprint';
import { loginFormSchema, type LoginFormValues } from '@/lib/schemas/form-schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      const fpHash = await getFingerprintHash();
      await authClient.signIn.email(
        { email: values.email, password: values.password },
        {
          headers: { 'x-fingerprint-hash': fpHash },
          onSuccess: () => {
            reset();
            onClose();
            router.push('/dashboard');
          },
          onError: (ctx) => setError('root', { message: ctx.error.message }),
        }
      );
    } catch {
      setError('root', { message: 'An unexpected error occurred.' });
    }
  }

  function handleOpenChange(open: boolean) {
    if (!open) {
      reset();
      onClose();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold text-center'>
            Welcome Back
          </DialogTitle>
          <DialogDescription className='text-center'>
            Sign in to your portfolio dashboard
          </DialogDescription>
        </DialogHeader>

        {errors.root && (
          <div className='rounded-md bg-destructive/10 p-3 text-sm text-destructive'>
            {errors.root.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='modal-email'>Email</Label>
            <Input
              id='modal-email'
              type='email'
              placeholder='you@example.com'
              {...register('email')}
            />
            {errors.email && (
              <p className='text-xs text-destructive'>{errors.email.message}</p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='modal-password'>Password</Label>
            <Input
              id='modal-password'
              type='password'
              placeholder='Enter your password'
              {...register('password')}
            />
            {errors.password && (
              <p className='text-xs text-destructive'>{errors.password.message}</p>
            )}
          </div>
          <Button type='submit' className='w-full' disabled={isSubmitting}>
            {isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Sign In
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
