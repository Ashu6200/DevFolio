'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { trpc } from '@/utils/trpc';

const Hero = () => {
  const { data: profile } = trpc.user.publicProfile.useQuery();
  const { data: activeResume } = trpc.resume.getActive.useQuery();

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden py-24'>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className='relative z-10 flex px-6 md:px-8 flex-col items-center justify-center w-full max-w-4xl mx-auto space-y-10'>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/30 text-sm font-medium border border-border/50 text-muted-foreground backdrop-blur-md"
        >
          <span className="font-semibold text-foreground px-1">MERN Stack</span>
          <div className="w-[1px] h-4 bg-border/80" />
          <span className="flex items-center gap-2 pr-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 dark:bg-emerald-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 dark:bg-emerald-700"></span>
            </span>
            Available for work
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className='text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.1] text-foreground text-balance'>
            Crafting scalable solutions with the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-200">
              MERN Stack
            </span>{" "}
          </h1>
        </motion.div>
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className='text-lg md:text-xl text-muted-foreground text-balance'>
            I'm <span className="font-medium text-foreground">{profile?.name || 'Ashutosh'}</span>, a full-stack developer. From crafting dynamic frontends with React to building robust APIs with Express, I bring full-stack expertise to every project.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
          className="pt-6 flex flex-col sm:flex-row items-center gap-4"
        >
          <Button
            asChild
            variant="secondary"
            size="lg"
            className='rounded-full p-1.5 pr-6 h-auto text-base group bg-secondary/50 hover:bg-secondary/80 border border-border/50 transition-all shadow-sm'
          >
            <Link href='/about' className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border/50 bg-background flex-shrink-0">
                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {profile?.name?.charAt(0) || 'A'}
                </div>
              </div>
              <span className="font-medium text-foreground">About – {profile?.name?.split(' ')[0] || 'Ashutosh'}</span>
              <ArrowRight className='size-4 ml-1 transition-transform group-hover:translate-x-1 text-muted-foreground' />
            </Link>
          </Button>

          {activeResume?.url && (
            <Button
              asChild
              variant="ghost"
              size="lg"
              className='rounded-full px-6 h-12 text-base group text-muted-foreground hover:text-foreground transition-all'
            >
              <a href={activeResume.url} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                <Download className='size-4 group-hover:-translate-y-1 transition-transform' />
                Download CV
              </a>
            </Button>
          )}
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
