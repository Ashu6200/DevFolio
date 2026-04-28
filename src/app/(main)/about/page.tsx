'use client';

import { trpc } from '@/utils/trpc';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Calendar,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { TipTapRenderer } from '@/components/editor/tiptap-renderer';
import { format } from 'date-fns';
import { motion } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const AboutPage = () => {
  const [activeValue, setActiveValue] = React.useState<string>('education');
  const { data: educationData, isLoading: eduLoading } =
    trpc.education.list.useQuery();
  const { data: workData, isLoading: workLoading } =
    trpc.work.list.useQuery();

  return (
    <main className='py-16 px-6 md:px-8 md:py-32'>
      <motion.section
        className='max-w-5xl mx-auto mb-24'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 items-start'>
          <div className='lg:col-span-1 flex justify-center items-center'>
            <div className='relative w-80 h-80'>
              <div className='w-full h-full relative overflow-hidden rounded-full'>
                <Image
                  src='/images/MY.webp'
                  alt='Profile'
                  width={256}
                  height={256}
                  className='object-cover w-full h-full hover:scale-105 transition-all duration-500'
                />
              </div>
              <div className='z-10 absolute -bottom-3 right-3 bg-background text-foreground px-3 py-1 rounded-full text-sm font-medium border'>
                Available for work
              </div>
            </div>
          </div>

          <div className='lg:col-span-2 space-y-4'>
            <div>
              <h1 className='text-4xl font-bold mb-2'>Ashutosh Kewat</h1>
              <p className='text-sm md:text-base text-primary mb-4'>
                MERN Stack Developer
              </p>
              <div className='flex items-center gap-4 text-muted-foreground mb-6'>
                <div className='flex items-center gap-1'>
                  <MapPin className='w-2 h-2' />
                  <span className='text-sm md:text-base text-primary'>
                    Janjgir-Champa, Chhattisgarh
                  </span>
                </div>
                <div className='flex items-center gap-1'>
                  <Calendar className='w-2 h-2' />
                  <span className='text-sm md:text-base text-primary'>
                    1.5+ years experience
                  </span>
                </div>
              </div>
            </div>
            <div className='flex gap-2'>
              <Button variant='default' asChild className='rounded-full p-2'>
                <Link href='/contact'>
                  <Mail className='w-2 h-2 mr-1' />
                  Get In Touch
                </Link>
              </Button>
              <Button variant='outline' asChild className='rounded-full p-2'>
                <Link href='https://github.com' target='_blank'>
                  <Github className='w-2 h-2 mr-1' />
                  GitHub
                </Link>
              </Button>
              <Button variant='outline' asChild className='rounded-full p-2'>
                <Link href='https://linkedin.com' target='_blank'>
                  <Linkedin className='w-2 h-2 mr-1' />
                  LinkedIn
                </Link>
              </Button>
            </div>

            <p className='text-sm md:text-base text-primary leading-relaxed'>
              {`I'm a passionate full-stack developer with expertise in the MERN
              stack. I love creating scalable web applications that solve
              real-world problems and deliver exceptional user experiences. When
              I'm not coding, you'll find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge through
              technical writing.`}
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        className='max-w-5xl mx-auto'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Tabs
          value={activeValue}
          defaultValue='education'
          onValueChange={setActiveValue}
          className='space-y-8 w-full'
        >
          <TabsList className='w-full bg-transparent p-1 flex items-center justify-center gap-4'>
            <TabsTrigger
              value='education'
              className={cn(
                'data-[state=active]:bg-muted gap-2',
                'data-[state=active]:border-border border border-transparent'
              )}
            >
              <p className='py-2'>Education</p>
            </TabsTrigger>
            <TabsTrigger
              value='career'
              className={cn(
                'data-[state=active]:bg-muted gap-2',
                'data-[state=active]:border-border border border-transparent'
              )}
            >
              <p className='py-2'>Career</p>
            </TabsTrigger>
          </TabsList>

          <TabsContent value='education'>
            <div className='relative ml-3'>
              <div className='absolute left-0 top-4 bottom-0 border-l-2' />
              {eduLoading && (
                <div className='pl-8 space-y-6'>
                  {[1, 2].map((i) => (
                    <div key={i} className='animate-pulse space-y-3'>
                      <div className='h-5 bg-muted rounded w-1/3' />
                      <div className='h-4 bg-muted rounded w-1/2' />
                      <div className='h-4 bg-muted rounded w-2/3' />
                    </div>
                  ))}
                </div>
              )}
              {educationData?.map((item, index) => {
                const startDate = format(new Date(item.startDate as unknown as string), 'MMM yyyy');
                const endDate = item.current
                  ? 'Present'
                  : item.endDate
                    ? format(new Date(item.endDate as unknown as string), 'MMM yyyy')
                    : '';

                return (
                  <div key={index} className='relative pl-8 pb-12 last:pb-0'>
                    <div className='absolute h-3 w-3 -translate-x-1/2 left-px top-3 rounded-full border-2 border-primary bg-background' />
                    <div className='space-y-3'>
                      <div className='flex items-center gap-3'>
                        <div className='shrink-0 h-9 w-9 bg-primary rounded-full flex items-center justify-center'>
                          <Building2 className='h-5 w-5 text-background' />
                        </div>
                        <span className='text-base sm:text-lg font-semibold'>
                          {item.institution}
                        </span>
                      </div>
                      <div>
                        <h3 className='text-lg sm:text-xl font-medium'>
                          {item.degree}
                        </h3>
                        <div className='flex items-center gap-2 mt-1 text-sm'>
                          <Calendar className='h-4 w-4' />
                          <span>
                            {startDate} – {endDate}
                          </span>
                        </div>
                      </div>
                      {item.description && typeof item.description === 'object' && (
                        <TipTapRenderer
                          content={item.description as Record<string, unknown>}
                          className='prose-sm text-primary'
                        />
                      )}
                      {item.highlights?.length > 0 && (
                        <div className='flex flex-wrap gap-2'>
                          {item.highlights.map((tech: string) => (
                            <Badge
                              key={tech}
                              variant='secondary'
                              className='rounded-full'
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {educationData?.length === 0 && (
                <p className='pl-8 text-muted-foreground'>
                  No education entries yet.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value='career'>
            <div className='relative ml-3'>
              <div className='absolute left-0 top-4 bottom-0 border-l-2' />
              {workLoading && (
                <div className='pl-8 space-y-6'>
                  {[1, 2].map((i) => (
                    <div key={i} className='animate-pulse space-y-3'>
                      <div className='h-5 bg-muted rounded w-1/3' />
                      <div className='h-4 bg-muted rounded w-1/2' />
                    </div>
                  ))}
                </div>
              )}
              {workData?.map((item, index) => {
                const startDate = format(new Date(item.startDate as unknown as string), 'MMM yyyy');
                const endDate = item.current
                  ? 'Present'
                  : item.endDate
                    ? format(new Date(item.endDate as unknown as string), 'MMM yyyy')
                    : '';

                return (
                  <div key={index} className='relative pl-8 pb-12 last:pb-0'>
                    <div className='absolute h-3 w-3 -translate-x-1/2 left-px top-3 rounded-full border-2 border-primary bg-background' />
                    <div className='space-y-3'>
                      <div className='flex items-center gap-3'>
                        <div className='shrink-0 h-9 w-9 bg-accent rounded-full flex items-center justify-center'>
                          <Building2 className='h-5 w-5 text-muted-foreground' />
                        </div>
                        <span className='text-base sm:text-lg font-semibold'>
                          {item.company}
                        </span>
                      </div>
                      <div>
                        <h3 className='text-lg sm:text-xl font-medium'>
                          {item.role}
                        </h3>
                        <div className='flex items-center gap-2 mt-1 text-sm'>
                          <Calendar className='h-4 w-4' />
                          <span>
                            {startDate} – {endDate}
                          </span>
                        </div>
                      </div>
                      {item.description && typeof item.description === 'object' && (
                        <TipTapRenderer
                          content={item.description as Record<string, unknown>}
                          className='prose-sm text-primary'
                        />
                      )}
                      {item.techStack?.length > 0 && (
                        <div className='flex flex-wrap gap-2'>
                          {item.techStack.map((tech: string) => (
                            <Badge
                              key={tech}
                              variant='secondary'
                              className='rounded-full'
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {workData?.length === 0 && (
                <p className='pl-8 text-muted-foreground'>
                  No work experience entries yet.
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.section>
    </main>
  );
};

export default AboutPage;
