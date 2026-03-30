'use client';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';
import { ShineBorder } from '../ui/shine-border';
import { Badge } from '../ui/badge';
import { motion } from 'motion/react';

const Hero = () => {
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
          className='max-w-2xl mx-auto text-start space-y-8'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className='space-y-6'>
            <h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
              A <span className='gradient-text font-normal'>Developer</span>{' '}
              Crafting Scalable Web Solutions with the MERN Stack
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
            <div className='flex flex-wrap  gap-2 my-8'>
              {techStack.map((tech) => (
                <Badge
                  key={tech.name}
                  variant='outline'
                  className={`px-3 py-1 ${tech.color}`}
                >
                  {tech.name}
                </Badge>
              ))}
            </div>
            <p className='text-sm md:text-base text-primary'>
              {` 👉 Let's build something impactful together.`}
            </p>
            <div className='flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start'>
              <Button
                variant='outline'
                className='w-full sm:w-auto rounded-4xl relative'
              >
                <Download className='size-4' />
                Download CV
                <ShineBorder
                  shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']}
                  duration={8}
                  borderWidth={1}
                />
              </Button>

              <Button
                asChild
                variant='outline'
                className='w-full sm:w-auto rounded-4xl'
              >
                <Link href='/contact'>
                  Contact Me
                  <ArrowRight className='size-4' />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
        <motion.div
          className='hidden lg:block w-1/2 ml-auto perspective-[1000px] '
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className='transform rotate-x-5 -rotate-y-30 transition-transform duration-500 ease-in-out hover:scale-105'>
            <Image
              src='/images/hero.webp'
              alt='Hero Image'
              className='w-full h-auto object-cover rounded-lg shadow-lg '
              loading='eager'
              width={600}
              height={400}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
