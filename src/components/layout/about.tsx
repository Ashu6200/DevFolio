'use client';

import { format } from 'date-fns';
import {
  Briefcase,
  Building2,
  Calendar,
  Check,
  Code2,
  Copy,
  Download,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Terminal,
  User,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';
import { useState } from 'react';
import { toast } from 'sonner';
import { TipTapRenderer } from '@/components/editor/tiptap-renderer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { trpc } from '@/utils/trpc';

interface AboutSectionProps {
  id?: string;
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ id = 'about', className }) => {
  const [profileView, setProfileView] = useState<'overview' | 'config' | 'metrics'>('overview');
  const [timelineTab, setTimelineTab] = useState<'education' | 'career'>('career');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const { data: profile } = trpc.user.publicProfile.useQuery();
  const { data: activeResume } = trpc.resume.getActive.useQuery();
  const { data: educationData, isLoading: eduLoading } = trpc.education.list.useQuery();
  const { data: workData, isLoading: workLoading } = trpc.work.list.useQuery();

  const name = profile?.name || 'Ashutosh Kewat';
  const bio =
    profile?.bio ||
    `Passionate full-stack developer specializing in the MERN stack and modern cloud architectures. I love crafting scalable, high-performance web applications that solve real-world problems and deliver seamless user experiences. From intuitive React and Next.js frontends to robust Node.js microservices and database designs, I bring engineering rigor to every project.`;

  const email = 'ashutoshkewat1@gmail.com';

  const configSnippet = `const engineer: FullStackDeveloper = {
  name: "${name}",
  role: "Full-Stack & Distributed Systems Architect",
  location: "Janjgir-Champa, Chhattisgarh, India",
  experience: "1.5+ Years Production Experience",
  specialties: [
    "High-Performance Backend (Node.js, NestJS, Fastify, Express)",
    "Modern Frontends (React 19, Next.js 15, Angular, TanStack Start)",
    "Distributed Messaging & Queues (NATS, Redis, BullMQ, AWS SQS)",
    "Databases & ORMs (PostgreSQL, MongoDB, Prisma, Drizzle, Mongoose)",
    "Containerization & Microservices (Docker, gRPC, API Gateways)"
  ],
  stack: [
    "TypeScript", "Next.js", "React", "Angular", "Node.js", "NestJS", 
    "Fastify", "PostgreSQL", "MongoDB", "Prisma", "Drizzle", "Redis", "Docker"
  ],
  status: "available_for_hire"
};`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(configSnippet);
    setCopiedSnippet(true);
    toast.success('Developer configuration copied!');
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <section
      id={id}
      className={cn(
        'relative pt-24 pb-16 md:pt-32 md:pb-24 px-6 md:px-8 scroll-mt-16 overflow-hidden',
        className
      )}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] bg-size-[20px_20px] opacity-35 mask-[radial-gradient(ellipse_75%_65%_at_50%_35%,#000_65%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-175 h-95 bg-primary/10 dark:bg-primary/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl border border-border/75 bg-card/85 dark:bg-[#0c0c0c]/90 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/30"
        >
          <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

          <div className="flex flex-wrap items-center justify-between gap-3 px-6 sm:px-8 pt-6 sm:pt-7 pb-5 border-b border-border/50 bg-muted/20 dark:bg-muted/10">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono font-medium text-foreground tracking-tight">
                AVAILABLE FOR HIRE & FREELANCE
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-primary" />
                India • IST (UTC+5:30)
              </span>
              <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-border" />
              <span className="hidden sm:flex items-center gap-1 text-primary">
                <Zap className="w-3.5 h-3.5" />
                Open to Relocate / Remote
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10 space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
              <div className="relative shrink-0 group">
                <div className="w-28 h-28 sm:w-32 sm:h-32 relative rounded-3xl p-1 bg-linear-to-br from-primary/40 via-border to-primary/20 shadow-lg">
                  <div className="w-full h-full relative overflow-hidden rounded-[22px] bg-muted/30">
                    <Image
                      src="/images/MY.webp"
                      alt={name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                      priority
                    />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-background/95 backdrop-blur-md text-foreground px-2.5 py-1 rounded-full text-xs font-semibold border border-border shadow-xs flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span>Full-Stack</span>
                </div>
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                    {name}
                  </h1>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium">
                    PRO
                  </span>
                </div>

                <p className="text-base sm:text-lg font-semibold text-primary">
                  MERN Stack Developer & Systems Architect
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-1 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>Janjgir-Champa, Chhattisgarh</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>1.5+ Years Experience</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-1 bg-muted/50 dark:bg-muted/20 border border-border/60 rounded-2xl max-w-md">
              <button
                onClick={() => setProfileView('overview')}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer',
                  profileView === 'overview'
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <User className="w-3.5 h-3.5" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setProfileView('config')}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer',
                  profileView === 'config'
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Terminal className="w-3.5 h-3.5 text-primary" />
                <span>Config</span>
              </button>

              <button
                onClick={() => setProfileView('metrics')}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer',
                  profileView === 'metrics'
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Capabilities</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {profileView === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {bio}
                  </p>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      Core Technologies & Focus Areas:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'React 19 & Next.js 15',
                        'Angular & TanStack Start',
                        'Node.js, Express & Fastify',
                        'NestJS Architecture',
                        'PostgreSQL (Prisma & Drizzle)',
                        'MongoDB & Mongoose',
                        'TanStack Query & Redux',
                        'Redis, BullMQ & NATS',
                        'Docker & Microservices',
                        'AWS SQS & Event-Driven',
                      ].map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 rounded-xl bg-muted/60 dark:bg-muted/30 border border-border/50 text-xs font-mono text-foreground/90 hover:border-primary/40 transition-colors"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {profileView === 'config' && (
                <motion.div
                  key="config"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-zinc-800 bg-[#0d1117] p-4 sm:p-5 font-mono text-xs text-zinc-200 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      <span className="text-[11px] text-zinc-400 ml-2">engineer.config.ts</span>
                    </div>

                    <button
                      onClick={handleCopySnippet}
                      className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded bg-zinc-800/70 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                      {copiedSnippet ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Config</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="overflow-x-auto leading-relaxed text-zinc-300 text-[11px] sm:text-xs">
                    <code>
                      <span className="text-purple-400">const</span>{' '}
                      <span className="text-blue-300">engineer</span>:{' '}
                      <span className="text-emerald-300">FullStackDeveloper</span> = &#123;{'\n'}
                      {'  '}
                      <span className="text-zinc-400">name:</span>{' '}
                      <span className="text-amber-200">&quot;{name}&quot;</span>,{'\n'}
                      {'  '}
                      <span className="text-zinc-400">role:</span>{' '}
                      <span className="text-amber-200">
                        &quot;MERN Stack & Systems Developer&quot;
                      </span>
                      ,{'\n'}
                      {'  '}
                      <span className="text-zinc-400">coreStack:</span> [
                      <span className="text-amber-200">&quot;React 19&quot;</span>,{' '}
                      <span className="text-amber-200">&quot;Next.js 15&quot;</span>,{' '}
                      <span className="text-amber-200">&quot;Node.js&quot;</span>,{' '}
                      <span className="text-amber-200">&quot;MongoDB&quot;</span>],{'\n'}
                      {'  '}
                      <span className="text-zinc-400">architecture:</span> [
                      <span className="text-amber-200">&quot;tRPC&quot;</span>,{' '}
                      <span className="text-amber-200">&quot;REST APIs&quot;</span>,{' '}
                      <span className="text-amber-200">&quot;Microservices&quot;</span>],{'\n'}
                      {'  '}
                      <span className="text-zinc-400">openForOpportunities:</span>{' '}
                      <span className="text-emerald-400">true</span>
                      {'\n'}
                      &#125;;
                    </code>
                  </pre>
                </motion.div>
              )}

              {profileView === 'metrics' && (
                <motion.div
                  key="metrics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  <div className="p-4 rounded-2xl bg-muted/40 dark:bg-muted/20 border border-border/60 space-y-1">
                    <div className="text-xs font-mono text-primary font-semibold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      1.5+ Years Exp
                    </div>
                    <div className="text-base font-bold text-foreground">Production Systems</div>
                    <p className="text-xs text-muted-foreground">
                      Hands-on engineering across full-stack web applications and backend services.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/40 dark:bg-muted/20 border border-border/60 space-y-1">
                    <div className="text-xs font-mono text-primary font-semibold flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5" />
                      End-to-End MERN
                    </div>
                    <div className="text-base font-bold text-foreground">Clean Architecture</div>
                    <p className="text-xs text-muted-foreground">
                      Type-safe frontends with Next.js & React paired with modular Node.js backends.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-muted/40 dark:bg-muted/20 border border-border/60 space-y-1">
                    <div className="text-xs font-mono text-primary font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      100% Type-Safe
                    </div>
                    <div className="text-base font-bold text-foreground">Modern Tooling</div>
                    <p className="text-xs text-muted-foreground">
                      TypeScript, tRPC, Zod schema validation, and Biome linting/formatting.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-6 border-t border-border/50 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="default"
                  asChild
                  className="rounded-full px-5 h-10 shadow-xs font-medium"
                >
                  <Link href="/contact" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Get In Touch
                  </Link>
                </Button>

                {activeResume?.url && (
                  <Button
                    variant="secondary"
                    asChild
                    className="rounded-full px-5 h-10 border border-border/70 font-medium hover:bg-secondary/80 transition-colors"
                  >
                    <a
                      href={activeResume.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download CV
                    </a>
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyEmail}
                  className="rounded-full px-4 h-10 border-border/70 text-xs font-medium hover:border-foreground/30 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>Copy Email</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="rounded-full h-10 w-10 border-border/70 hover:border-foreground/30 transition-colors"
                >
                  <Link
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="rounded-full h-10 w-10 border-border/70 hover:border-foreground/30 transition-colors"
                >
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-10 pt-6"
        >
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-mono text-primary border border-primary/25 bg-primary/10 rounded-full">
              <GraduationCap className="w-3.5 h-3.5" />
              EXPERIENCE & MILESTONES
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
              Career & Academic Journey
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              A chronological roadmap of professional engineering roles, production systems, and
              academic foundation.
            </p>
          </div>

          <Tabs
            value={timelineTab}
            defaultValue="career"
            onValueChange={(val) => setTimelineTab(val as 'education' | 'career')}
            className="space-y-8 w-full max-w-4xl mx-auto"
          >
            <div className="flex justify-center">
              <div className="relative p-1 rounded-full bg-muted/60 dark:bg-zinc-900/90 border border-border/70 dark:border-zinc-800 backdrop-blur-md max-w-xs sm:max-w-sm w-full shadow-inner">
                <TabsList className="relative w-full h-auto p-0 bg-transparent grid grid-cols-2 border-0 shadow-none">
                  <TabsTrigger
                    value="career"
                    className={cn(
                      'relative z-10 h-10 rounded-full border-0 px-4 text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 select-none',
                      'bg-transparent dark:data-[state=active]:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:border-transparent',
                      timelineTab === 'career'
                        ? 'text-foreground font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {timelineTab === 'career' && (
                      <motion.div
                        layoutId="activeTimelineTab"
                        className="absolute inset-0 rounded-full bg-background dark:bg-zinc-800/95 border border-border/60 dark:border-zinc-700/60 shadow-xs -z-10"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <Briefcase
                      className={cn(
                        'w-3.5 h-3.5 transition-colors',
                        timelineTab === 'career' ? 'text-primary' : 'text-muted-foreground/70'
                      )}
                    />
                    <span>Experience</span>
                    {workData && workData.length > 0 && (
                      <span
                        className={cn(
                          'text-[10px] px-2 py-0.5 rounded-full font-mono transition-colors',
                          timelineTab === 'career'
                            ? 'bg-primary/15 text-primary font-bold'
                            : 'bg-muted dark:bg-zinc-800 text-muted-foreground'
                        )}
                      >
                        {workData.length}
                      </span>
                    )}
                  </TabsTrigger>

                  <TabsTrigger
                    value="education"
                    className={cn(
                      'relative z-10 h-10 rounded-full border-0 px-4 text-xs sm:text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 select-none',
                      'bg-transparent dark:data-[state=active]:bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:border-transparent',
                      timelineTab === 'education'
                        ? 'text-foreground font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {timelineTab === 'education' && (
                      <motion.div
                        layoutId="activeTimelineTab"
                        className="absolute inset-0 rounded-full bg-background dark:bg-zinc-800/95 border border-border/60 dark:border-zinc-700/60 shadow-xs -z-10"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <GraduationCap
                      className={cn(
                        'w-3.5 h-3.5 transition-colors',
                        timelineTab === 'education' ? 'text-primary' : 'text-muted-foreground/70'
                      )}
                    />
                    <span>Education</span>
                    {educationData && educationData.length > 0 && (
                      <span
                        className={cn(
                          'text-[10px] px-2 py-0.5 rounded-full font-mono transition-colors',
                          timelineTab === 'education'
                            ? 'bg-primary/15 text-primary font-bold'
                            : 'bg-muted dark:bg-zinc-800 text-muted-foreground'
                        )}
                      >
                        {educationData.length}
                      </span>
                    )}
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="career" className="focus-visible:outline-none">
              <div className="relative pl-6 sm:pl-10 space-y-8">
                <div className="absolute left-2.5 sm:left-4 top-4 bottom-4 w-0.5 bg-linear-to-b from-primary via-primary/40 to-transparent" />

                {workLoading && (
                  <div className="space-y-6">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="animate-pulse p-6 rounded-3xl border border-border/50 bg-card/40 space-y-4"
                      >
                        <div className="h-5 bg-muted rounded w-1/3" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                        <div className="h-4 bg-muted rounded w-3/4" />
                      </div>
                    ))}
                  </div>
                )}

                {workData?.map((item) => {
                  const startDate = format(
                    new Date(item.startDate as unknown as string),
                    'MMM yyyy'
                  );
                  const endDate = item.current
                    ? 'Present'
                    : item.endDate
                      ? format(new Date(item.endDate as unknown as string), 'MMM yyyy')
                      : '';
                  const itemId = (item as { _id?: string })._id?.toString() || item.company;

                  return (
                    <div key={itemId} className="relative group">
                      <div className="absolute -left-6.75 sm:-left-9.75 top-6 flex items-center justify-center">
                        <div
                          className={cn(
                            'w-6 h-6 rounded-full bg-background dark:bg-[#0c0c0c] border-2 flex items-center justify-center transition-all duration-300',
                            item.current
                              ? 'border-primary shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                              : 'border-border/80 group-hover:border-primary/60'
                          )}
                        >
                          <div
                            className={cn(
                              'w-2 h-2 rounded-full',
                              item.current
                                ? 'bg-primary animate-pulse'
                                : 'bg-muted-foreground/60 group-hover:bg-primary'
                            )}
                          />
                        </div>
                      </div>

                      <div className="relative overflow-hidden rounded-3xl border border-border/80 dark:border-border/60 bg-card/95 dark:bg-[#0c0c0c]/85 backdrop-blur-xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] dark:shadow-none hover:shadow-[0_12px_32px_-6px_rgba(16,185,129,0.14)] hover:border-primary/50 dark:hover:border-primary/40 transition-all duration-300 space-y-5">
                        <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-primary/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3.5">
                            <div className="shrink-0 h-12 w-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                              <Briefcase className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                                  {item.company}
                                </h3>
                                {item.current && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-primary/15 text-primary border border-primary/30">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                    CURRENT
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                                {item.location && <span>{item.location}</span>}
                              </div>
                            </div>
                          </div>

                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/80 dark:bg-muted/30 border border-border/60 text-xs font-mono text-foreground/80 self-start sm:self-auto">
                            <Calendar className="h-3.5 w-3.5 text-primary" />
                            <span>
                              {startDate} – {endDate}
                            </span>
                          </div>
                        </div>

                        <div className="pt-1">
                          <h4 className="text-base sm:text-lg font-semibold text-primary flex items-center gap-2">
                            {item.role}
                          </h4>
                        </div>

                        {item.description && typeof item.description === 'object' && (
                          <TipTapRenderer
                            content={item.description as Record<string, unknown>}
                            className="prose-sm max-w-none text-muted-foreground leading-relaxed pt-1"
                          />
                        )}

                        {item.techStack && item.techStack.length > 0 && (
                          <div className="pt-3 border-t border-border/50 space-y-2.5">
                            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                              Technologies & Tools:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {item.techStack.map((tech: string) => (
                                <Badge
                                  key={tech}
                                  variant="secondary"
                                  className="rounded-full text-xs font-medium px-2.5 py-0.5 bg-primary/10 dark:bg-primary/15 text-primary border border-primary/25 hover:bg-primary/20 transition-colors"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {!workLoading && workData?.length === 0 && (
                  <div className="text-center py-12 border border-dashed border-border/60 rounded-3xl bg-muted/10">
                    <Briefcase className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                    <p className="text-muted-foreground text-sm">
                      No work experience entries added yet.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="education" className="focus-visible:outline-none">
              <div className="relative pl-6 sm:pl-10 space-y-8">
                <div className="absolute left-2.5 sm:left-4 top-4 bottom-4 w-0.5 bg-linear-to-b from-primary via-primary/40 to-transparent" />

                {eduLoading && (
                  <div className="space-y-6">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="animate-pulse p-6 rounded-3xl border border-border/50 bg-card/40 space-y-4"
                      >
                        <div className="h-5 bg-muted rounded w-1/3" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                        <div className="h-4 bg-muted rounded w-3/4" />
                      </div>
                    ))}
                  </div>
                )}

                {educationData?.map((item) => {
                  const startDate = format(
                    new Date(item.startDate as unknown as string),
                    'MMM yyyy'
                  );
                  const endDate = item.current
                    ? 'Present'
                    : item.endDate
                      ? format(new Date(item.endDate as unknown as string), 'MMM yyyy')
                      : '';
                  const itemId = (item as { _id?: string })._id?.toString() || item.institution;

                  return (
                    <div key={itemId} className="relative group">
                      <div className="absolute -left-6.75 sm:-left-9.75 top-6 flex items-center justify-center">
                        <div
                          className={cn(
                            'w-6 h-6 rounded-full bg-background dark:bg-[#0c0c0c] border-2 flex items-center justify-center transition-all duration-300',
                            item.current
                              ? 'border-primary shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                              : 'border-border/80 group-hover:border-primary/60'
                          )}
                        >
                          <div
                            className={cn(
                              'w-2 h-2 rounded-full',
                              item.current
                                ? 'bg-primary animate-pulse'
                                : 'bg-muted-foreground/60 group-hover:bg-primary'
                            )}
                          />
                        </div>
                      </div>

                      <div className="relative overflow-hidden rounded-3xl border border-border/80 dark:border-border/60 bg-card/95 dark:bg-[#0c0c0c]/85 backdrop-blur-xl p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] dark:shadow-none hover:shadow-[0_12px_32px_-6px_rgba(16,185,129,0.14)] hover:border-primary/50 dark:hover:border-primary/40 transition-all duration-300 space-y-5">
                        <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-primary/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3.5">
                            <div className="shrink-0 h-12 w-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                              <Building2 className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                                  {item.institution}
                                </h3>
                                {item.current && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-primary/15 text-primary border border-primary/30">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                    ENROLLED
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {item.field}
                              </div>
                            </div>
                          </div>

                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/80 dark:bg-muted/30 border border-border/60 text-xs font-mono text-foreground/80 self-start sm:self-auto">
                            <Calendar className="h-3.5 w-3.5 text-primary" />
                            <span>
                              {startDate} – {endDate}
                            </span>
                          </div>
                        </div>

                        <div className="pt-1">
                          <h4 className="text-base sm:text-lg font-semibold text-primary flex items-center gap-2">
                            {item.degree}
                          </h4>
                        </div>

                        {item.description && typeof item.description === 'object' && (
                          <TipTapRenderer
                            content={item.description as Record<string, unknown>}
                            className="prose-sm max-w-none text-muted-foreground leading-relaxed pt-1"
                          />
                        )}

                        {item.highlights && item.highlights.length > 0 && (
                          <div className="pt-3 border-t border-border/50 space-y-2.5">
                            <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
                              Coursework & Highlights:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {item.highlights.map((tech: string) => (
                                <Badge
                                  key={tech}
                                  variant="secondary"
                                  className="rounded-full text-xs font-medium px-2.5 py-0.5 bg-primary/10 dark:bg-primary/15 text-primary border border-primary/25 hover:bg-primary/20 transition-colors"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {!eduLoading && educationData?.length === 0 && (
                  <div className="text-center py-12 border border-dashed border-border/60 rounded-3xl bg-muted/10">
                    <Building2 className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                    <p className="text-muted-foreground text-sm">No education entries added yet.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
