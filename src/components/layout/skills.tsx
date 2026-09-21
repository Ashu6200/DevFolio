import { techSkills } from '@/constant';
import { Marquee } from '../ui/marquee';

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden py-10 md:py-14 border-y border-border/40 bg-muted/15 dark:bg-card/25 backdrop-blur-xs"
    >
      <div className="mb-6 text-center space-y-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono text-primary border border-primary/20 bg-primary/10 rounded-full">
          TECH STACK & TOOLS
        </div>
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
          Core Technologies I Build With
        </h3>
      </div>

      <Marquee pauseOnHover className="[--duration:35s] gap-3.5 py-1">
        {techSkills.map((skill) => (
          <div
            key={skill.text}
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-border/60 bg-background/80 dark:bg-[#0c0c0c]/80 backdrop-blur-sm text-foreground text-xs sm:text-sm font-medium shadow-2xs hover:border-primary/50 hover:bg-background hover:scale-[1.03] transition-all duration-300 shrink-0 cursor-default group"
          >
            <span className="w-5 h-5 flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5 group-hover:scale-110 transition-transform duration-300">
              {skill.icon}
            </span>
            <span className="font-medium tracking-tight text-foreground/90 group-hover:text-foreground">
              {skill.text}
            </span>
          </div>
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-linear-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-linear-to-l from-background to-transparent z-10" />
    </section>
  );
};

export default Skills;
