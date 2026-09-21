'use client';

import { ChevronDown, ChevronUp, Lock, ShieldCheck, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'dpdp_consent_acknowledged_v1';

export default function PrivacyBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setMounted(true);
    const acknowledged = localStorage.getItem(STORAGE_KEY);
    if (!acknowledged) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <AnimatePresence>
      <motion.aside
        aria-label="Privacy and DPDP Notice"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:max-w-md z-40"
      >
        <div className="relative rounded-2xl border border-border/80 bg-background/90 dark:bg-[#0e0e10]/95 backdrop-blur-xl p-5 shadow-xl shadow-black/10 dark:shadow-black/40 space-y-3.5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center border border-primary/20 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-primary">
                  DPDP Act 2023 Notice
                </span>
                <h3 className="text-sm font-semibold text-foreground leading-tight">
                  Privacy & Data Telemetry
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors cursor-pointer"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            In compliance with India&apos;s{' '}
            <strong className="text-foreground font-medium">
              Digital Personal Data Protection Act, 2023
            </strong>
            , this portfolio uses essential session cookies and security device telemetry (SHA-256
            session hash) solely to prevent tampering and safeguard system integrity. No advertising
            cookies or third-party trackers are used.
          </p>

          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-xl bg-muted/40 border border-border/50 p-3 text-[11px] text-muted-foreground space-y-1.5"
            >
              <div className="flex items-center gap-1.5 font-semibold text-foreground">
                <Lock className="w-3 h-3 text-primary" />
                Technical Summary:
              </div>
              <ul className="list-disc list-inside space-y-1 pl-1">
                <li>
                  <strong className="text-foreground/90">Essential Cookies:</strong> Session tokens
                  (<code>better-auth.session_token</code>) for authentication & theme storage.
                </li>
                <li>
                  <strong className="text-foreground/90">Security Telemetry:</strong> An
                  irreversible client-side hash used to bind admin sessions and mitigate automated
                  abuse.
                </li>
              </ul>
            </motion.div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/50">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="text-[11px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors cursor-pointer"
            >
              {showDetails ? (
                <>
                  <span>Less details</span>
                  <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  <span>View telemetry details</span>
                  <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>

            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="h-8 px-3 text-xs rounded-full">
                <Link href="/privacy">Policy & Rights</Link>
              </Button>

              <Button
                size="sm"
                onClick={handleAccept}
                className="h-8 px-3.5 text-xs rounded-full shadow-xs cursor-pointer"
              >
                Accept & Continue
              </Button>
            </div>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
