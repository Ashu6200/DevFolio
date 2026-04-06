'use client';

import { trpc } from '@/utils/trpc';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TipTapRenderer } from '@/components/editor/tiptap-renderer';
import { motion } from 'motion/react';
import { ExternalLink, Github, Star } from 'lucide-react';

const ProjectsPage = () => {
  const { data: projects, isLoading } = trpc.project.list.useQuery();

  return (
    <main className='py-16 px-6 md:px-8 md:py-32'>
      <motion.div
        className='max-w-6xl mx-auto'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold mb-4'>Projects</h1>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            A collection of projects I&apos;ve built, from web applications to
            open-source contributions.
          </p>
        </div>

        {isLoading && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className='p-6'>
                  <div className='animate-pulse space-y-3'>
                    <div className='h-40 bg-muted rounded' />
                    <div className='h-5 bg-muted rounded w-2/3' />
                    <div className='h-4 bg-muted rounded w-full' />
                    <div className='flex gap-2'>
                      <div className='h-5 bg-muted rounded w-16' />
                      <div className='h-5 bg-muted rounded w-16' />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {projects && projects.length === 0 && (
          <div className='text-center py-20'>
            <p className='text-muted-foreground'>No projects yet. Check back soon!</p>
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {projects?.map((project, index) => {
            const id = (project as Record<string, unknown>)._id as string;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className='overflow-hidden h-full flex flex-col hover:border-primary/50 transition-colors'>
                  {project.coverImage && (
                    <div className='h-48 overflow-hidden'>
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className='w-full h-full object-cover'
                      />
                    </div>
                  )}
                  <CardContent className='p-6 flex-1 flex flex-col'>
                    <div className='flex items-start justify-between mb-3'>
                      <h3 className='text-lg font-semibold'>{project.title}</h3>
                      {project.featured && (
                        <Badge variant='default' className='gap-1 shrink-0 ml-2'>
                          <Star className='h-3 w-3' />
                          Featured
                        </Badge>
                      )}
                    </div>

                    <div className='flex-1 mb-4 text-sm line-clamp-4'>
                      {project.description &&
                      typeof project.description === 'object' ? (
                        <TipTapRenderer
                          content={project.description as Record<string, unknown>}
                          className='prose-sm'
                        />
                      ) : null}
                    </div>

                    {project.techStack?.length > 0 && (
                      <div className='flex flex-wrap gap-1.5 mb-4'>
                        {project.techStack.map((tech: string) => (
                          <Badge
                            key={tech}
                            variant='secondary'
                            className='text-xs'
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className='flex items-center gap-3 pt-3 border-t mt-auto'>
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors'
                        >
                          <Github className='h-4 w-4' />
                          Source
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors'
                        >
                          <ExternalLink className='h-4 w-4' />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </main>
  );
};

export default ProjectsPage;
