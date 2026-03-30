'use client';
import { useEffect, useState } from 'react';
import { ShineBorder } from '../ui/shine-border';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { navItems } from '@/constant';
import ThemeToggle from './theme-toggle';

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className='hidden md:block fixed top-4 inset-x-0 z-50 pointer-events-none'>
        <div className='flex justify-center'>
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`transition-all duration-300 pointer-events-auto bg-background/35  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10   ${
              isScrolled ? 'backdrop-blur-md shadow-lg' : 'backdrop-blur-sm '
            } rounded-full px-4 py-2`}
          >
            <ShineBorder
              shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']}
              duration={8}
              borderWidth={1}
            />
            <div className='flex items-center gap-1'>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors  ${
                      isActive
                        ? 'text-primary'
                        : 'text-accent-foreground hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId='navbar-active-desktop'
                        className='absolute inset-0 bg-secondary rounded-full'
                        transition={{ type: 'spring', duration: 0.6 }}
                      />
                    )}
                    <span className='relative flex items-center gap-2'>
                      <Icon className='w-4 h-4' />
                      <span className='text-sm font-medium'>{item.label}</span>
                    </span>
                  </Link>
                );
              })}
              <div className='ml-2'>
                <ThemeToggle />
              </div>
            </div>
          </motion.nav>
        </div>
      </div>
      <div className='md:hidden fixed bottom-4 inset-x-0 z-50 pointer-events-none'>
        <div className='flex justify-center'>
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-background backdrop-blur-md border shadow-lg rounded-full px-4 py-2 pointer-events-auto'
          >
            <div className='flex items-center gap-1'>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center justify-center p-2.5 rounded-full transition-colors ${
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId='navbar-active-mobile'
                        className='absolute inset-0 bg-secondary rounded-full'
                        transition={{ type: 'spring', duration: 0.6 }}
                      />
                    )}
                    <Icon className='w-5 h-5 relative z-10' />
                  </Link>
                );
              })}
              <div className='ml-1'>
                <ThemeToggle />
              </div>
            </div>
          </motion.nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
