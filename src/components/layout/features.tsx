'use client';

import { motion } from 'motion/react';
import { Marquee } from '@/components/ui/marquee';
import { skills } from '@/constant';

interface ArchitectureCardProps {
  skill: (typeof skills)[number];
  index: number;
}

const ArchitectureCard = ({ skill, index }: ArchitectureCardProps) => {
  const numStr = String(index + 1).padStart(2, '0');

  return (
    <div className="group/card relative flex flex-col justify-between w-82.5 sm:w-97.5 h-63.75 shrink-0 overflow-hidden rounded-3xl border border-border/80 dark:border-border/60 bg-card/95 dark:bg-[#0c0c0c]/85 backdrop-blur-xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] dark:shadow-none hover:shadow-[0_12px_32px_-6px_rgba(16,185,129,0.14)] hover:border-primary/50 dark:hover:border-primary/40 transition-all duration-300 cursor-default">
      <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-transparent via-primary/35 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-400 pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full gap-3">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
            {skill.category}
          </span>
          <span className="text-xs font-mono text-muted-foreground/60 group-hover/card:text-primary transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/card:bg-primary transition-colors" />
            SYS.{numStr}
          </span>
        </div>

        <div className="space-y-1.5 pt-0.5">
          <h3 className="text-base font-bold tracking-tight text-foreground group-hover/card:text-primary transition-colors line-clamp-1">
            {skill.title}
          </h3>
          <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed font-sans line-clamp-3">
            {skill.text}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-border/50 mt-auto">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-md bg-muted/80 dark:bg-muted/30 border border-border/60 text-muted-foreground group-hover/card:border-primary/25 group-hover/card:text-foreground transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 right-0 p-3 opacity-10 group-hover/card:opacity-25 transition-opacity duration-300 pointer-events-none">
        <svg
          width="32"
          height="32"
          viewBox="0 0 40 40"
          className="stroke-primary fill-none"
          aria-hidden="true"
        >
          <path d="M40 40V20C40 8.954 31.046 0 20 0H0" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>
      </div>
    </div>
  );
};

const Features = () => {
  const firstRow = skills.slice(0, 6);
  const secondRow = skills.slice(6, 12);

  return (
    <section
      id="capabilities"
      className="relative overflow-hidden py-20 md:py-28 border-t border-border/40"
    >
      <div className="absolute top-1/3 right-1/4 w-112.5 h-75 bg-primary/5 dark:bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-60 bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="flex flex-col space-y-12 relative z-10">
        <motion.div
          className="text-center flex flex-col items-center px-6 md:px-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-mono text-primary border border-primary/25 bg-primary/10 rounded-full mb-4 font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            SYSTEM ARCHITECTURE & CAPABILITIES
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Engineered for{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-emerald-500 to-teal-400">
              Performance & Scale
            </span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto text-balance mt-4 leading-relaxed">
            Production-grade distributed services, modern full-stack architectures, and resilient
            cloud pipelines built for high availability and low latency.
          </p>
        </motion.div>

        <div className="relative w-full overflow-hidden space-y-4 py-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 bg-linear-to-r from-background to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 bg-linear-to-l from-background to-transparent z-20" />

          <Marquee pauseOnHover repeat={3} className="[--duration:42s] [--gap:1.25rem] py-1">
            {firstRow.map((skill, index) => (
              <ArchitectureCard key={skill.title} skill={skill} index={index} />
            ))}
          </Marquee>

          <Marquee
            reverse
            pauseOnHover
            repeat={3}
            className="[--duration:42s] [--gap:1.25rem] py-1"
          >
            {secondRow.map((skill, index) => (
              <ArchitectureCard key={skill.title} skill={skill} index={index + 6} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Features;
