import AboutSection from '@/components/layout/about';
import ContactCTA from '@/components/layout/contact-cta';
import FeaturedProjects from '@/components/layout/featured-projects';
import Features from '@/components/layout/features';
import Skills from '@/components/layout/skills';

const HomePage = () => {
  return (
    <main className="h-full w-full">
      <AboutSection />
      <Skills />
      <FeaturedProjects />
      <Features />
      <ContactCTA />
    </main>
  );
};

export default HomePage;
