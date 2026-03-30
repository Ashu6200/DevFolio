import { Marquee } from '../ui/marquee';
import { techSkills } from '@/constant';

const Skills = () => {
  return (
    <section className='relative flex w-full flex-col items-center justify-center overflow-hidden'>
      <Marquee pauseOnHover className='[--duration:20s]'>
        {techSkills.map((review) => (
          <div key={review.text} className='flex flex-col items-center gap-2 '>
            <p>{review.icon}</p>
            <p className='hidden md:block text-xs md:text-sm font-medium'>
              {review.text}
            </p>
          </div>
        ))}
      </Marquee>
      <div className='pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background'></div>
      <div className='pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background'></div>
    </section>
  );
};

export default Skills;
