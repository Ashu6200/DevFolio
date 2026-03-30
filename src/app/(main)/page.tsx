import Features from '@/components/layout/features';
import Hero from '@/components/layout/hero';
import Skills from '@/components/layout/skills';

const page = () => {
  return (
    <main className='h-full w-full'>
      <Hero />
      <Skills />
      <Features />
    </main>
  );
};

export default page;
