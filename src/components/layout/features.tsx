'use client';
import React from 'react';
import { skills } from '@/constant';
import { motion } from 'motion/react';

const Features = () => {
  return (
    <section className='relative overflow-hidden py-16 md:py-32'>

      <div className='mx-auto px-6 md:px-8 max-w-6xl flex flex-col space-y-16 relative z-10'>

        <motion.div
          className='text-center flex flex-col items-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono text-primary border border-primary/20 bg-primary/10 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            SYSTEM.CAPABILITIES
          </div>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground'>
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-500 dark:to-emerald-200">Scale</span>
          </h2>
          <p className='text-base md:text-lg text-muted-foreground max-w-4xl mx-auto text-balance mt-4'>
            Robust architecture, performant interfaces, and secure infrastructure. Built with modern tools for the modern web.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pt-4'>
          {skills.map((skill, index) => {
            const isLarge = index === 0 || index === 5 || index === 8;
            const spanClass = isLarge ? "md:col-span-2 lg:col-span-2" : "col-span-1";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (index % 3) * 0.1, duration: 0.5 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-card dark:bg-[#0a0a0a] border border-border/50 hover:border-primary/50 dark:hover:border-primary/30 shadow-sm dark:shadow-none transition-all duration-500 p-6 md:p-8 ${spanClass}`}
              >
                {/* Subtle hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top Section */}
                <div className="relative z-10 flex flex-col gap-2 h-full">
                  <div className="flex items-center justify-between">
                    <div className='flex items-center justify-center w-12 h-12 rounded-xl bg-background border border-border/50 text-xl shadow-[0_0_15px_rgba(52,211,153,0.1)] dark:shadow-[0_0_15px_rgba(52,211,153,0.05)] group-hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] dark:group-hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] transition-all duration-300 group-hover:scale-110'>
                      {typeof skill.icon === 'string' ? skill.icon : <skill.icon />}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="mt-auto">
                    <p className={`text-muted-foreground leading-relaxed font-sans ${isLarge ? 'text-base md:text-sm' : 'text-sm'}`}>
                      <span className="text-primary font-mono font-bold mr-2">{'>'}</span>
                      {skill.text}
                    </p>
                  </div>
                </div>

                {/* Decorative Tech Lines */}
                <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
                  <svg width="40" height="40" viewBox="0 0 40 40" className="stroke-primary fill-none">
                    <path d="M40 40V20C40 8.954 31.046 0 20 0H0" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Features;
