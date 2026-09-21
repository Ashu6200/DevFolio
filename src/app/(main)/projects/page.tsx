'use client';

import { ExternalLink, FolderGit2, Github, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { TipTapRenderer } from '@/components/editor/tiptap-renderer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { trpc } from '@/utils/trpc';

const ProjectsPage = () => {
  const { data: projects, isLoading } = trpc.project.list.useQuery();

  return (
    <main className="py-20 px-6 md:px-8 md:py-28 min-h-screen">
      <motion.div
        className="max-w-6xl mx-auto space-y-12"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-mono text-primary border border-primary/20 bg-primary/10 rounded-full">
            <FolderGit2 className="w-3.5 h-3.5" />
            PORTFOLIO
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Featured{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-500 dark:to-emerald-200">
              Projects
            </span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            A curated collection of full-stack web applications, scalable APIs, and open-source
            software built with modern technologies.
          </p>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="overflow-hidden rounded-3xl border border-border/60 bg-card/50"
              >
                <div className="h-48 bg-muted/60 animate-pulse" />
                <CardContent className="p-6 space-y-4">
                  <div className="h-6 bg-muted/70 rounded-md w-2/3 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 bg-muted/50 rounded w-full animate-pulse" />
                    <div className="h-4 bg-muted/50 rounded w-4/5 animate-pulse" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <div className="h-6 bg-muted/50 rounded-full w-16 animate-pulse" />
                    <div className="h-6 bg-muted/50 rounded-full w-20 animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && projects && projects.length === 0 && (
          <div className="text-center py-24 border border-dashed border-border/60 rounded-3xl bg-muted/10 max-w-xl mx-auto">
            <FolderGit2 className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-60" />
            <h3 className="text-lg font-semibold text-foreground">No projects found</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Check back soon for upcoming project releases.
            </p>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {projects?.map((project, index) => {
            const id = (project as Record<string, unknown>)._id as string;
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="h-full"
              >
                <Card className="overflow-hidden h-full flex flex-col rounded-3xl border border-border/60 bg-card dark:bg-[#0c0c0c] hover:border-primary/50 dark:hover:border-primary/40 shadow-xs hover:shadow-md transition-all duration-300 group">
                  {project.coverImage && (
                    <div className="relative aspect-16/10 overflow-hidden bg-muted/20">
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      {project.featured && (
                        <div className="absolute top-3 right-3 z-10">
                          <Badge
                            variant="default"
                            className="gap-1 shadow-sm rounded-full text-xs font-medium"
                          >
                            <Sparkles className="h-3 w-3" />
                            Featured
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}

                  <CardContent className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        {!project.coverImage && project.featured && (
                          <Badge variant="default" className="gap-1 shrink-0 rounded-full text-xs">
                            <Sparkles className="h-3 w-3" />
                            Featured
                          </Badge>
                        )}
                      </div>

                      {/* Description */}
                      <div className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {project.description && typeof project.description === 'object' ? (
                          <TipTapRenderer
                            content={project.description as Record<string, unknown>}
                            className="prose-sm max-w-none"
                          />
                        ) : null}
                      </div>
                    </div>

                    <div className="space-y-4 pt-2 border-t border-border/40 mt-auto">
                      {/* Tech Stack */}
                      {project.techStack?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {project.techStack.map((tech: string) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="text-xs font-normal rounded-full px-2.5 py-0.5"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Action Links */}
                      <div className="flex items-center gap-2 pt-1">
                        {project.githubLink && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="rounded-full h-8 px-3 text-xs gap-1.5 border-border/70 flex-1"
                          >
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                              <Github className="h-3.5 w-3.5" />
                              Source
                            </a>
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button
                            size="sm"
                            asChild
                            className="rounded-full h-8 px-3 text-xs gap-1.5 flex-1 shadow-xs"
                          >
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3.5 w-3.5" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                      </div>
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
