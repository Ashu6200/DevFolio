import { Github, Linkedin, ShieldCheck, Twitter } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  copyright?: string;
}

const Footer = ({
  copyright = `© ${new Date().getFullYear()} Ashutosh Kewat. All rights reserved.`,
}: FooterProps) => {
  return (
    <footer className="border-t border-border/40 bg-background/50 backdrop-blur-xs">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
          <p>{copyright}</p>
          <span className="hidden sm:inline text-border">&bull;</span>
          <div className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-3 h-3" />
            <span>DPDP Act 2023 Compliant</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <Link href="/privacy" className="hover:text-foreground transition-colors hover:underline">
            Privacy Policy
          </Link>
          <span className="text-border">&bull;</span>
          <Link
            href="/privacy#rights"
            className="hover:text-foreground transition-colors hover:underline"
          >
            Data Principal Rights
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-muted/80 hover:text-foreground transition-all duration-200"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-muted/80 hover:text-foreground transition-all duration-200"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-muted/80 hover:text-foreground transition-all duration-200"
            aria-label="Twitter / X Profile"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
