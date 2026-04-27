'use client';

import { trpc } from '@/utils/trpc';
import { contactFormSchema, type ContactFormValues } from '@/lib/schemas/form-schemas';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MailIcon, MapPinIcon, MessageCircle, PhoneIcon, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      reset();
    },
    onError: (e) => {
      setError('root', { message: e.message });
    },
  });

  function onSubmit(values: ContactFormValues) {
    submitMutation.mutate({
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      subject: values.subject,
      message: values.message,
    });
  }

  return (
    <div className='min-h-screen flex items-center justify-center py-16'>
      <div className='w-full max-w-7xl mx-auto px-6 xl:px-0'>
        <b className='text-muted-foreground'>Contact Us</b>
        <h2 className='mt-3 text-3xl md:text-4xl font-bold tracking-tight'>
          Chat to our friendly team
        </h2>
        <p className='mt-3 text-base sm:text-lg'>
          We&apos;d love to hear from you. Please fill out this form or shoot us
          an email.
        </p>
        <div className='mt-24 grid lg:grid-cols-2 gap-16 md:gap-10'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12'>
            <div>
              <div className='h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full'>
                <MailIcon />
              </div>
              <h3 className='mt-6 font-semibold text-xl'>Email</h3>
              <p className='my-2.5 text-muted-foreground'>
                Our friendly team is here to help.
              </p>
              <Link
                className='font-medium text-primary'
                href='mailto:akashmoradiya3444@gmail.com'
              >
                akashmoradiya3444@gmail.com
              </Link>
            </div>
            <div>
              <div className='h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full'>
                <MessageCircle />
              </div>
              <h3 className='mt-6 font-semibold text-xl'>Live chat</h3>
              <p className='my-2.5 text-muted-foreground'>
                Our friendly team is here to help.
              </p>
              <Link className='font-medium text-primary' href='#'>
                Start new chat
              </Link>
            </div>
            <div>
              <div className='h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full'>
                <MapPinIcon />
              </div>
              <h3 className='mt-6 font-semibold text-xl'>Office</h3>
              <p className='my-2.5 text-muted-foreground'>
                Come say hello at our office HQ.
              </p>
              <Link
                className='font-medium text-primary'
                href='https://map.google.com'
                target='_blank'
              >
                100 Smith Street Collingwood <br /> VIC 3066 AU
              </Link>
            </div>
            <div>
              <div className='h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full'>
                <PhoneIcon />
              </div>
              <h3 className='mt-6 font-semibold text-xl'>Phone</h3>
              <p className='my-2.5 text-muted-foreground'>
                Mon-Fri from 8am to 5pm.
              </p>
              <Link
                className='font-medium text-primary'
                href='tel:+15550000000'
              >
                +1 (555) 000-0000
              </Link>
            </div>
          </div>

          {/* Form */}
          <Card className='bg-background/20 shadow-none'>
            <CardContent className='p-6 md:p-10'>
              {submitted ? (
                <div className='flex flex-col items-center justify-center py-12 text-center gap-4'>
                  <CheckCircle2 className='h-12 w-12 text-green-500' />
                  <h3 className='text-xl font-semibold'>Message sent!</h3>
                  <p className='text-muted-foreground'>
                    Thanks for reaching out. We&apos;ll get back to you soon.
                  </p>
                  <Button variant='outline' onClick={() => setSubmitted(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  {errors.root && (
                    <div className='mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive'>
                      {errors.root.message}
                    </div>
                  )}
                  <div className='grid md:grid-cols-2 gap-x-8 gap-y-5'>
                    <div className='col-span-2 sm:col-span-1 space-y-1.5'>
                      <Label htmlFor='firstName'>First Name</Label>
                      <Input
                        placeholder='First name'
                        id='firstName'
                        className='bg-white h-11 shadow-none'
                        {...register('firstName')}
                      />
                      {errors.firstName && (
                        <p className='text-xs text-destructive'>{errors.firstName.message}</p>
                      )}
                    </div>
                    <div className='col-span-2 sm:col-span-1 space-y-1.5'>
                      <Label htmlFor='lastName'>Last Name</Label>
                      <Input
                        placeholder='Last name'
                        id='lastName'
                        className='bg-white h-11 shadow-none'
                        {...register('lastName')}
                      />
                      {errors.lastName && (
                        <p className='text-xs text-destructive'>{errors.lastName.message}</p>
                      )}
                    </div>
                    <div className='col-span-2 space-y-1.5'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        type='email'
                        placeholder='Email'
                        id='email'
                        className='bg-white h-11 shadow-none'
                        {...register('email')}
                      />
                      {errors.email && (
                        <p className='text-xs text-destructive'>{errors.email.message}</p>
                      )}
                    </div>
                    <div className='col-span-2 space-y-1.5'>
                      <Label htmlFor='subject'>Subject</Label>
                      <Input
                        placeholder='Subject'
                        id='subject'
                        className='bg-white h-11 shadow-none'
                        {...register('subject')}
                      />
                      {errors.subject && (
                        <p className='text-xs text-destructive'>{errors.subject.message}</p>
                      )}
                    </div>
                    <div className='col-span-2 space-y-1.5'>
                      <Label htmlFor='message'>Message</Label>
                      <Textarea
                        id='message'
                        placeholder='Message'
                        className='bg-white shadow-none'
                        rows={6}
                        {...register('message')}
                      />
                      {errors.message && (
                        <p className='text-xs text-destructive'>{errors.message.message}</p>
                      )}
                    </div>
                  </div>
                  <Button className='mt-6 w-full' size='lg' disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                    Submit
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
