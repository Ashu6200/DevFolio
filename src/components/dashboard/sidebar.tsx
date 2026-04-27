'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  FolderKanban,
  Shield,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

interface SidebarProps {
  user: { name?: string | null; email?: string | null };
}

const navLinks = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/education', label: 'Education', icon: GraduationCap },
  { href: '/dashboard/work', label: 'Work Experience', icon: Briefcase },
  { href: '/dashboard/projects', label: 'Projects', icon: FolderKanban },
  { href: '/dashboard/session', label: 'Session & Security', icon: Shield },
];

export default function DashboardSidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleSignOut() {
    await authClient.signOut();
    document.cookie =
      'admin_unlocked=; Max-Age=0; path=/; SameSite=Strict';
    window.location.href = '/';
  }

  const sidebarContent = (
    <div className='flex flex-col h-full'>
      <div className='p-4'>
        <div onClick={handleSignOut} className='text-lg font-bold'>
          DevFolio
        </div>
        <p className='text-sm text-muted-foreground mt-1 truncate'>
          {user.name || user.email}
        </p>
      </div>

      <Separator />

      <nav className='flex-1 p-2 space-y-1'>
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href ||
            (link.href !== '/dashboard' && pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
              )}
            >
              <Icon className='h-4 w-4' />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <Separator />

      <div className='p-2'>
        <Button
          variant='ghost'
          className='w-full justify-start gap-3 text-muted-foreground'
          onClick={handleSignOut}
        >
          <LogOut className='h-4 w-4' />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Button
        variant='ghost'
        size='sm'
        className='fixed top-4 left-4 z-50 md:hidden'
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
      </Button>

      {mobileOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/50 md:hidden'
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed z-40 h-screen w-64 border-r bg-background transition-transform md:static md:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
