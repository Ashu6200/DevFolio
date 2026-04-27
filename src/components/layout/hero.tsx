'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import { ShineBorder } from '../ui/shine-border';
import { Badge } from '../ui/badge';
import { motion } from 'motion/react';
import { trpc } from '@/utils/trpc';

const Hero = () => {
  const { data: profile } = trpc.user.publicProfile.useQuery();
  const { data: activeResume } = trpc.resume.getActive.useQuery();
  const techStack = [
    { name: 'MongoDB', color: 'bg-emerald-500/10 text-emerald-500' },
    { name: 'Express.js', color: 'bg-neutral-500/10 text-neutral-500' },
    { name: 'React', color: 'bg-sky-500/10 text-sky-500' },
    { name: 'Node.js', color: 'bg-emerald-600/10 text-emerald-600' },
    { name: 'TypeScript', color: 'bg-blue-600/10 text-blue-600' },
    {
      name: 'Next.js',
      color:
        'bg-neutral-900/10 text-neutral-900 dark:bg-neutral-100/10 dark:text-neutral-100',
    },
  ];
  return (
    <section className='overflow-hidden relative'>
      <div className='flex py-16 px-6 md:px-8 md:py-32'>
        <motion.div
          className='max-w-4xl mx-auto text-center space-y-10'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge / Tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-sm font-medium backdrop-blur-md shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for new opportunities
          </motion.div>

          <div className='space-y-6'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]'>
              Crafting Scalable Solutions with the{' '}
              <span className='bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent inline-block pb-2'>
                MERN Stack
              </span>
            </h1>
            <p className='text-sm md:text-base  text-primary'>
              I’m a passionate and performance-driven MERN Stack Developer with
              hands-on experience building responsive, secure, and modern web
              applications using MongoDB, Express.js, React, and Node.js.
              <br />
              <br />
              From crafting dynamic frontend with React to building robust APIs
              with Express and managing scalable databases with MongoDB, I bring
              full-stack expertise to every project.
              <br />
              <br />I focus on writing clean code, designing intuitive
              interfaces, and delivering real-world solutions — from single-page
              apps to full-scale SaaS platforms.
            </p>
            <div className='flex items-center justify-center gap-2 my-8'>
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                >
                  <Badge
                    variant='outline'
                    className={`px-4 py-1.5 text-sm font-medium backdrop-blur-md border-white/10 shadow-sm ${tech.color}`}
                  >
                    {tech.name}
                  </Badge>
                </motion.div>
              ))}
            </div>

            <motion.div
              className='flex flex-col sm:flex-row justify-center items-center gap-4 pt-6'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button
                asChild
                size="lg"
                className='w-full sm:w-auto rounded-full px-8 h-12 text-base group relative overflow-hidden shadow-lg shadow-primary/20'
              >
                <Link href='/contact'>
                  <span className="relative z-10 flex items-center gap-2">
                    Let's Talk
                    <ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
                  </span>
                </Link>
              </Button>

              {activeResume?.url ? (
                <Button
                  asChild
                  variant='outline'
                  size="lg"
                  className='w-full sm:w-auto rounded-full px-8 h-12 text-base relative group bg-background/50 backdrop-blur-sm border-border hover:bg-secondary/80'
                >
                  <a href={activeResume.url} target="_blank" rel="noreferrer">
                    <Download className='size-4 mr-2 transition-transform group-hover:-translate-y-1' />
                    Download CV
                    <ShineBorder
                      shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']}
                      duration={8}
                      borderWidth={1}
                    />
                  </a>
                </Button>
              ) : (
                <Button
                  variant='outline'
                  size="lg"
                  className='w-full sm:w-auto rounded-full px-8 h-12 text-base relative group bg-background/50 backdrop-blur-sm border-border hover:bg-secondary/80'
                >
                  <Download className='size-4 mr-2 transition-transform group-hover:-translate-y-1' />
                  Download CV
                  <ShineBorder
                    shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']}
                    duration={8}
                    borderWidth={1}
                  />
                </Button>
              )}
            </motion.div>
          </div>
        </motion.div>
        {/* <motion.div
          className='hidden lg:block w-1/2 ml-auto perspective-[1000px] '
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className='transform rotate-x-5 -rotate-y-30 transition-transform duration-500 ease-in-out hover:scale-105'>
            <Image
              src='/images/darkbg.webp'
              alt='Hero Image'
              className='w-full h-auto object-cover rounded-lg shadow-lg '
              loading='eager'
              width={600}
              height={400}
            />
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default Hero;
