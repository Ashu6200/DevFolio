import { FolderOpen, Home, Mail, User } from 'lucide-react';
import React from 'react';

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};
export const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: User },
  { href: '/projects', label: 'Projects', icon: FolderOpen },
  { href: '/contact', label: 'Contact', icon: Mail },
];

type Skill = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | string;
  text: string;
};
export const skills: Skill[] = [
  {
    icon: '⚙️',
    text: 'Build RESTful and GraphQL APIs using Node.js & Express',
  },
  {
    icon: '🧠',
    text: 'Create high-performance UI with React + Redux Toolkit',
  },
  {
    icon: '🔒',
    text: 'Implement secure authentication using JWT, OAuth, and 2FA',
  },
  {
    icon: '📦',
    text: 'Integrate third-party services and external APIs seamlessly',
  },
  {
    icon: '🚀',
    text: 'Deploy applications on Vercel, Render, and Heroku',
  },
  {
    icon: '📊',
    text: 'Work with both SQL and NoSQL databases',
  },
  {
    icon: '⚡',
    text: 'Follow clean code practices, Git workflows, and CI/CD pipelines',
  },
];

type TechSkill = {
  icon: React.ReactNode;
  text: string;
};
export const techSkills: TechSkill[] = [
  {
    text: 'MongoDB',
    icon: (
      <svg viewBox='0 0 32 32' width='32' height='32' fill='none'>
        <path
          d='M16 2c-1.3 6-0.2 7.4 0.9 10.3 0.6 2.6-0.2 5.3-0.9 7.6-0.7-2.3-1.9-4.9-1.7-7.6 0.2-2.9 1.5-4.3 1.7-10.3z'
          fill='#4DB33D'
        />
        <circle cx='16' cy='26' r='2' fill='#4DB33D' />
      </svg>
    ),
  },
  {
    text: 'Express.js',
    icon: (
      <svg viewBox='0 0 32 32' width='32' height='32' fill='none'>
        <rect width='32' height='32' rx='4' fill='#000000' />
        <path
          d='M6 12h20M6 20h20'
          stroke='#FFFFFF'
          strokeWidth='2'
          strokeLinecap='round'
        />
      </svg>
    ),
  },
  {
    text: 'React',
    icon: (
      <svg viewBox='0 0 32 32' width='32' height='32' fill='none'>
        <circle cx='16' cy='16' r='3' fill='#61DAFB' />
        <ellipse
          cx='16'
          cy='16'
          rx='12'
          ry='5'
          fill='none'
          stroke='#61DAFB'
          strokeWidth='2'
        />
        <ellipse
          cx='16'
          cy='16'
          rx='12'
          ry='5'
          fill='none'
          stroke='#61DAFB'
          strokeWidth='2'
          transform='rotate(60 16 16)'
        />
        <ellipse
          cx='16'
          cy='16'
          rx='12'
          ry='5'
          fill='none'
          stroke='#61DAFB'
          strokeWidth='2'
          transform='rotate(120 16 16)'
        />
      </svg>
    ),
  },
  {
    text: 'Node.js',
    icon: (
      <svg viewBox='0 0 32 32' width='32' height='32' fill='none'>
        <path d='M16 2L28 9v14L16 30L4 23V9z' fill='#3C873A' />
        <path d='M16 6L24 10v12L16 26L8 22V10z' fill='#68A063' />
      </svg>
    ),
  },
  {
    text: 'HTML',
    icon: (
      <svg viewBox='0 0 32 32' width='32' height='32' fill='none'>
        <path d='M4 4h24l-2 20-10 4-10-4z' fill='#E34F26' />
        <path d='M16 6v20l8-3 1.5-15z' fill='#F16529' />
      </svg>
    ),
  },
  {
    text: 'CSS',
    icon: (
      <svg viewBox='0 0 32 32' width='32' height='32' fill='none'>
        <path d='M4 4h24l-2 20-10 4-10-4z' fill='#1572B6' />
        <path d='M16 6v20l8-3 1.5-15z' fill='#33A9DC' />
      </svg>
    ),
  },
  {
    text: 'JavaScript',
    icon: (
      <svg viewBox='0 0 32 32' width='32' height='32' fill='none'>
        <rect width='32' height='32' rx='4' fill='#F7DF1E' />
        <path
          d='M18 20c0 2-1 3-3 3s-3-1-3-3h2c0 1 0.5 1 1 1s1 0 1-1v-6h2v6zM24 20c0 2-1 3-3 3-2 0-3-1-3-3h2c0 1 0.5 1 1 1s1 0 1-1c0-1-0.5-1-1-2l-1-1c-1-1-1-2-1-3 0-2 1-3 3-3 2 0 3 1 3 3h-2c0-1-0.5-1-1-1s-1 0-1 1c0 1 0.5 1 1 2l1 1c1 1 1 2 1 3z'
          fill='#000000'
        />
      </svg>
    ),
  },
  {
    text: 'TailwindCSS',
    icon: (
      <svg viewBox='0 0 32 32' width='32' height='32' fill='none'>
        <path
          d='M16 6c-4 0-6 2-6 6 0-2 1-3 3-3 2 0 3 1 3 3 0-4 2-6 6-6z'
          fill='#06B6D4'
        />
        <path
          d='M22 12c-4 0-6 2-6 6 0-2 1-3 3-3 2 0 3 1 3 3 0-4 2-6 6-6z'
          fill='#38BDF8'
        />
      </svg>
    ),
  },
  {
    text: 'Redux',
    icon: (
      <svg viewBox='0 0 32 32' width='32' height='32' fill='none'>
        <circle cx='16' cy='16' r='12' fill='#764ABC' />
        <circle cx='16' cy='16' r='4' fill='#FFFFFF' />
        <circle cx='24' cy='12' r='3' fill='#FFFFFF' />
        <circle cx='8' cy='20' r='3' fill='#FFFFFF' />
      </svg>
    ),
  },
  {
    text: 'Next.js',
    icon: (
      <svg viewBox='0 0 32 32' width='32' height='32' fill='none'>
        <circle cx='16' cy='16' r='14' fill='#000000' />
        <path d='M12 10h8v2h-6v4h5v2h-5v4h6v2h-8z' fill='#FFFFFF' />
        <path d='M20 10l4 11h-2l-4-11z' fill='#FFFFFF' />
      </svg>
    ),
  },
  {
    text: 'Spring Boot',
    icon: (
      <svg viewBox='0 0 32 32' width='32' height='32' fill='none'>
        <circle cx='16' cy='16' r='14' fill='#6DB33F' />
        <path d='M10 16c0-3 3-6 6-6s6 3 6 6-3 6-6 6-6-3-6-6z' fill='#FFFFFF' />
        <circle cx='16' cy='16' r='2' fill='#6DB33F' />
      </svg>
    ),
  },
  {
    text: 'Java',
    icon: (
      <svg viewBox='0 0 32 32' width='32' height='32' fill='none'>
        <rect width='32' height='32' rx='4' fill='#007396' />
        <path
          d='M8 20c0 2 2 4 8 4s8-2 8-4M8 16c0 2 2 4 8 4s8-2 8-4M12 12c2-2 2-4 4-4s2 2 4 4'
          stroke='#FFFFFF'
          strokeWidth='2'
          fill='none'
          strokeLinecap='round'
        />
      </svg>
    ),
  },
  {
    text: 'Docker',
    icon: (
      <svg viewBox='0 0 32 32' width='32' height='32' fill='none'>
        <rect x='6' y='14' width='4' height='4' fill='#0DB7ED' />
        <rect x='11' y='14' width='4' height='4' fill='#0DB7ED' />
        <rect x='16' y='14' width='4' height='4' fill='#0DB7ED' />
        <rect x='21' y='14' width='4' height='4' fill='#0DB7ED' />
        <rect x='11' y='10' width='4' height='4' fill='#0DB7ED' />
        <rect x='16' y='10' width='4' height='4' fill='#0DB7ED' />
        <path
          d='M26 16c2 0 4 2 4 4s-2 4-4 4H6c-2 0-4-2-4-4s2-4 4-4'
          stroke='#0DB7ED'
          strokeWidth='2'
          fill='none'
        />
      </svg>
    ),
  },
  {
    text: 'AWS',
    icon: (
      <svg viewBox='0 0 32 32' width='32' height='32' fill='none'>
        <path
          d='M6 20c2 2 6 4 10 4s8-2 10-4'
          stroke='#FF9900'
          strokeWidth='2'
          fill='none'
          strokeLinecap='round'
        />
        <path d='M8 16l8-4 8 4-8 4z' fill='#FF9900' />
        <path d='M16 12v8' stroke='#FF9900' strokeWidth='2' />
      </svg>
    ),
  },
  {
    text: 'Vercel',
    icon: (
      <svg viewBox='0 0 32 32' width='32' height='32' fill='#000000'>
        <path d='M16 6L26 24H6z' />
      </svg>
    ),
  },
  {
    text: 'Firebase',
    icon: (
      <svg viewBox='0 0 32 32' width='32' height='32' fill='none'>
        <path d='M16 4l6 12-6 12-6-12z' fill='#FFCA28' />
        <path d='M16 8l4 8-4 8-4-8z' fill='#FFA000' />
        <circle cx='16' cy='24' r='2' fill='#FF6F00' />
      </svg>
    ),
  },
  {
    text: 'Kubernetes',
    icon: (
      <svg viewBox='0 0 32 32' width='32' height='32' fill='none'>
        <path
          d='M16 4l10 6v12l-10 6-10-6V10z'
          fill='none'
          stroke='#326CE5'
          strokeWidth='2'
        />
        <circle cx='16' cy='16' r='3' fill='#326CE5' />
        <path
          d='M16 8v6M24 12l-5 3M24 20l-5-3M16 24v-6M8 20l5-3M8 12l5 3'
          stroke='#326CE5'
          strokeWidth='1'
        />
      </svg>
    ),
  },
  {
    text: 'GitHub',
    icon: (
      <svg viewBox='0 0 32 32' width='32' height='32' fill='none'>
        <circle cx='16' cy='16' r='14' fill='#000000' />
        <path
          d='M16 6c-5.5 0-10 4.5-10 10 0 4.4 2.9 8.2 6.9 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.7-1.3-2.2-.3-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.5 4.9.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5 4-1.3 6.9-5.1 6.9-9.5 0-5.5-4.5-10-10-10z'
          fill='#FFFFFF'
        />
      </svg>
    ),
  },
] as const;

// Education and work experience data is now managed via the dashboard
// and stored in MongoDB. See /dashboard/education and /dashboard/work.
