'use client';

import { ArrowRight, Check, Copy, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export const ContactCTA = () => {
  const [copied, setCopied] = useState(false);
  const email = 'ashutoshkewat1@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success('Email copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 md:py-28 px-6 md:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/80 dark:bg-[#0c0c0c]/85 p-8 sm:p-12 md:p-16 text-center space-y-8 shadow-sm backdrop-blur-md"
        >
          {/* Ambient Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-112.5 h-62.5 bg-primary/15 dark:bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] bg-size-[16px_16px] opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-mono text-primary border border-primary/25 bg-primary/10 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              LET&apos;S COLLABORATE
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Ready to build something{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-500 dark:to-emerald-200">
                exceptional?
              </span>
            </h2>

            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              I&apos;m currently open to full-time engineering roles, high-impact freelance
              projects, and technical collaborations.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              asChild
              size="lg"
              className="rounded-full px-6 h-12 text-sm font-medium shadow-xs group"
            >
              <Link href="/contact" className="flex items-center gap-2">
                <span>Start a Conversation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={copyEmail}
              className="rounded-full px-6 h-12 text-sm font-medium border-border/80 hover:border-foreground/30 transition-all cursor-pointer flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-muted-foreground" />
                  <span>Copy Email</span>
                </>
              )}
            </Button>
          </div>

          {/* Social Links Bar */}
          <div className="relative z-10 pt-4 border-t border-border/40 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <a
              href="mailto:ashutoshkewat1@gmail.com"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-primary" />
              <span>{email}</span>
            </a>
            <span className="w-1 h-1 rounded-full bg-border" />
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-primary" />
              <span>GitHub</span>
            </a>
            <span className="w-1 h-1 rounded-full bg-border" />
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-primary" />
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
