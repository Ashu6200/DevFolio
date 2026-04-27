'use client';

import { trpc } from '@/utils/trpc';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GraduationCap, Briefcase, FolderKanban } from 'lucide-react';
import Link from 'next/link';
import ResumeManager from '@/components/dashboard/resume-manager';

export default function DashboardPage() {
  const { data: education } = trpc.education.list.useQuery();
  const { data: work } = trpc.work.list.useQuery();
  const { data: projects } = trpc.project.list.useQuery();

  const stats = [
    {
      label: 'Education',
      count: education?.length ?? 0,
      icon: GraduationCap,
      href: '/dashboard/education',
    },
    {
      label: 'Work Experience',
      count: work?.length ?? 0,
      icon: Briefcase,
      href: '/dashboard/work',
    },
    {
      label: 'Projects',
      count: projects?.length ?? 0,
      icon: FolderKanban,
      href: '/dashboard/projects',
    },
  ];

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold'>Dashboard</h1>
        <p className='text-muted-foreground mt-1'>
          Manage your portfolio content
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className='hover:border-primary/50 transition-colors'>
                <CardHeader className='flex flex-row items-center justify-between pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    {stat.label}
                  </CardTitle>
                  <Icon className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{stat.count}</div>
                  <CardDescription>
                    {stat.count === 1 ? 'entry' : 'entries'}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className='grid grid-cols-1 gap-4'>
        <ResumeManager />
      </div>
    </div>
  );
}
