'use client';
import { LogIn } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navItems } from '@/constant';
import LoginModal from './login-modal';
import ThemeToggle from './theme-toggle';

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeHash, setActiveHash] = useState<string>('');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setShowLogin(document.cookie.split(';').some((c) => c.trim() === 'admin_unlocked=true'));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (pathname === '/') {
        const aboutElement = document.getElementById('about');
        if (aboutElement) {
          const rect = aboutElement.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            setActiveHash('/#about');
          } else {
            setActiveHash('/');
          }
        } else {
          setActiveHash('/');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const isItemActive = (href: string) => {
    if (pathname === '/') {
      if (activeHash === '/#about') {
        return href === '/#about';
      }
      return href === '/';
    }
    return pathname === href;
  };

  return (
    <>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Desktop Floating Navbar */}
      <div className="hidden md:block fixed top-5 inset-x-0 z-50 pointer-events-none">
        <div className="flex justify-center">
          <motion.nav
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`transition-all duration-300 pointer-events-auto bg-background/80 dark:bg-background/70 backdrop-blur-xl border border-border/60 ${
              isScrolled ? 'shadow-md shadow-black/5 dark:shadow-black/20' : 'shadow-xs'
            } rounded-full px-3 py-1.5`}
          >
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isItemActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-desktop"
                        className="absolute inset-0 bg-secondary/80 dark:bg-secondary rounded-full border border-border/40"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </span>
                  </Link>
                );
              })}
              <div className="ml-2 pl-2 border-l border-border/50 flex items-center gap-1">
                <ThemeToggle />
                {showLogin && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </button>
                )}
              </div>
            </div>
          </motion.nav>
        </div>
      </div>

      {/* Mobile Bottom Floating Navbar */}
      <div className="md:hidden fixed bottom-5 inset-x-0 z-50 pointer-events-none px-4">
        <div className="flex justify-center">
          <motion.nav
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-background/85 dark:bg-background/75 backdrop-blur-xl border border-border/60 shadow-lg shadow-black/10 rounded-full px-3 py-1.5 pointer-events-auto"
          >
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = isItemActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-label={item.label}
                    className={`relative flex items-center justify-center p-2.5 rounded-full transition-colors ${
                      isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-mobile"
                        className="absolute inset-0 bg-secondary/80 dark:bg-secondary rounded-full border border-border/40"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                  </Link>
                );
              })}
              <div className="ml-1 pl-1 border-l border-border/50 flex items-center gap-1">
                <ThemeToggle />
                {showLogin && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center p-2.5 rounded-full text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    aria-label="Login"
                  >
                    <LogIn className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
