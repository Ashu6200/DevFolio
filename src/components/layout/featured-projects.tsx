'use client';

import { ArrowRight, ExternalLink, FolderGit2, Github, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { TipTapRenderer } from '@/components/editor/tiptap-renderer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { trpc } from '@/utils/trpc';

export const FeaturedProjects = () => {
  const { data: projects, isLoading } = trpc.project.list.useQuery();

  const featuredList = projects?.filter((p) => p.featured) || [];
  const displayProjects =
    featuredList.length > 0 ? featuredList.slice(0, 3) : projects?.slice(0, 3) || [];

  return (
    <section id="projects" className="py-20 md:py-28 px-6 md:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.div
          className="text-center space-y-3 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-mono text-primary border border-primary/20 bg-primary/10 rounded-full">
            <FolderGit2 className="w-3.5 h-3.5" />
            FEATURED WORK
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Featured Projects & Engineering
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            A curated selection of production-ready applications, scalable architectures, and
            interactive experiences.
          </p>
        </motion.div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
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

        {!isLoading && displayProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project, index) => {
              const id = (project as Record<string, unknown>)._id as string;
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  className="h-full"
                >
                  <Card className="overflow-hidden h-full flex flex-col rounded-3xl border border-border/60 bg-card/75 dark:bg-[#0c0c0c]/80 hover:border-primary/50 dark:hover:border-primary/40 shadow-xs hover:shadow-md transition-all duration-300 group">
                    {project.coverImage ? (
                      <div className="relative aspect-16/10 overflow-hidden bg-muted/20">
                        <Image
                          src={project.coverImage}
                          alt={project.title}
                          width={500}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        {project.featured && (
                          <div className="absolute top-3 right-3 z-10">
                            <Badge
                              variant="default"
                              className="gap-1 shadow-xs rounded-full text-xs font-medium"
                            >
                              <Sparkles className="h-3 w-3" />
                              Featured
                            </Badge>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="relative aspect-16/10 overflow-hidden bg-linear-to-br from-primary/15 via-muted/30 to-muted/10 flex items-center justify-center border-b border-border/40">
                        <FolderGit2 className="w-12 h-12 text-primary/40 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                        {project.featured && (
                          <div className="absolute top-3 right-3 z-10">
                            <Badge
                              variant="default"
                              className="gap-1 shadow-xs rounded-full text-xs font-medium"
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
                            <Badge
                              variant="default"
                              className="gap-1 shrink-0 rounded-full text-xs"
                            >
                              <Sparkles className="h-3 w-3" />
                              Featured
                            </Badge>
                          )}
                        </div>

                        <div className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                          {project.description && typeof project.description === 'object' ? (
                            <TipTapRenderer
                              content={project.description as Record<string, unknown>}
                              className="prose-sm max-w-none text-muted-foreground"
                            />
                          ) : null}
                        </div>
                      </div>

                      <div className="space-y-4 pt-2 border-t border-border/40 mt-auto">
                        {project.techStack && project.techStack.length > 0 && (
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

                        <div className="flex items-center gap-2 pt-1">
                          {project.githubLink && (
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="rounded-full h-8 px-3 text-xs gap-1.5 border-border/70 flex-1 hover:border-foreground/30 transition-colors"
                            >
                              <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Github className="h-3.5 w-3.5" />
                                Source
                              </a>
                            </Button>
                          )}
                          {project.liveUrl && (
                            <Button
                              size="sm"
                              asChild
                              className="rounded-full h-8 px-3 text-xs gap-1.5 flex-1 shadow-xs font-medium"
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
        )}

        <div className="flex justify-center pt-4">
          <Button
            asChild
            variant="outline"
            className="rounded-full px-6 h-11 border-border/80 font-medium text-sm gap-2 hover:border-primary/50 hover:bg-secondary/50 transition-all shadow-2xs group"
          >
            <Link href="/projects">
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
