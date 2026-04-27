'use client';
import React from 'react';
import { ShineBorder } from '../ui/shine-border';
import { skills } from '@/constant';
import { motion } from 'motion/react';

const Features = () => {
  return (
    <section className='relative overflow-hidden py-24'>
      <div className='absolute top-0 right-0 -translate-y-12 translate-x-1/3 blurSpot opacity-40 dark:opacity-20' />
      <div className='absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 blurSpot opacity-30 dark:opacity-10' />

      <div className='mx-auto px-6 md:px-8 max-w-7xl flex flex-col space-y-16 relative z-10'>
        <motion.div
          className='text-center space-y-6 max-w-4xl mx-auto'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-2 rounded-full bg-secondary/50 border border-border/50 text-sm font-medium backdrop-blur-md shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-violet-500 animate-pulse" />
            My Expertise
          </div>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]'>
            Crafting{' '}
            <span className='bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent pb-2 inline-block'>
              End-to-End
            </span>{' '}
            Web Solutions
          </h1>
          <p className='text-base md:text-lg text-muted-foreground'>
            From building performant UIs to deploying secure and scalable
            applications, I specialize in delivering full-stack solutions using
            the MERN stack and the latest industry standards.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative pt-4"
        >
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center'>
            💻 What I Do Best
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6'>
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.08, duration: 0.5, type: "spring", bounce: 0.4 }}
                className='group relative overflow-hidden flex items-start gap-5 p-6 rounded-3xl bg-background/50 border border-border/50 hover:bg-secondary/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5'
              >
                <ShineBorder
                  shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']}
                  duration={14}
                  borderWidth={1.5}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                <div className='flex-shrink-0 relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-background border border-border shadow-sm text-2xl group-hover:scale-110 transition-transform duration-300'>
                  {typeof skill.icon === 'string' ? (
                    skill.icon
                  ) : (
                    <skill.icon />
                  )}
                </div>
                <div className='flex flex-col justify-center pt-1 relative z-10'>
                  <p className='text-sm sm:text-base text-primary leading-relaxed'>
                    {skill.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
