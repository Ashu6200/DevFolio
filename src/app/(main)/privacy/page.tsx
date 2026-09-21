'use client';

import {
  CheckCircle2,
  Copy,
  FileText,
  Globe2,
  HelpCircle,
  Lock,
  Scale,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPage() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [selectedRight, setSelectedRight] = useState<
    'access' | 'erasure' | 'correction' | 'withdraw' | 'grievance'
  >('erasure');
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const getDsrSubject = () => {
    switch (selectedRight) {
      case 'access':
        return '[DPDP Act 2023] Request for Access to Personal Data (Section 11)';
      case 'erasure':
        return '[DPDP Act 2023] Request for Erasure / Deletion of Personal Data (Section 12)';
      case 'correction':
        return '[DPDP Act 2023] Request for Rectification of Personal Data (Section 12)';
      case 'withdraw':
        return '[DPDP Act 2023] Notice of Consent Withdrawal (Section 6(4))';
      case 'grievance':
        return '[DPDP Act 2023] Grievance Redressal Filing (Section 13)';
    }
  };

  const getDsrBody = () => {
    return `To: Grievance Redressal Officer (Ashutosh Kewat)
Email: ashutoshkewat1@gmail.com
Subject: ${getDsrSubject()}

Dear Grievance Officer,

I am submitting this request under the Digital Personal Data Protection Act, 2023 (DPDP Act).

1. Identification:
   - Full Name: [Your Full Name]
   - Email Address used in contact submission: [Your Email]
   - Approximate Date of Submission: [Approximate Date]

2. Statutory Request Category:
   [ ] Right to Access (Section 11) - Summary and details of my processed personal data
   [X] Right to Erasure (Section 12) - Complete deletion of all my submitted contact records
   [ ] Right to Correction (Section 12) - Update / rectify inaccurate data
   [ ] Withdrawal of Consent (Section 6(4)) - Cease processing my personal data
   [ ] Grievance Redressal (Section 13) - Resolution of complaint

3. Description / Specific Details:
   [Please add any specific instructions regarding your records]

Please acknowledge receipt within 48 hours and confirm resolution within the statutory 30-day period.

Regards,
[Your Name]
[Your Phone Number, optional]`;
  };

  const copyTemplate = () => {
    navigator.clipboard.writeText(getDsrBody());
    setCopiedTemplate(true);
    toast.success('DSR formal request template copied to clipboard!');
    setTimeout(() => setCopiedTemplate(false), 2200);
  };

  const mailtoUrl = `mailto:ashutoshkewat1@gmail.com?subject=${encodeURIComponent(
    getDsrSubject()
  )}&body=${encodeURIComponent(getDsrBody())}`;

  return (
    <main className="min-h-screen py-20 px-6 md:px-8 md:py-28 flex flex-col items-center justify-center">
      <motion.div
        className="w-full max-w-5xl mx-auto space-y-12"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-mono text-primary border border-primary/20 bg-primary/10 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            DPDP ACT 2023 STATUTORY COMPLIANCE
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Privacy Policy &{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-500 dark:to-emerald-200">
              Statutory Notice
            </span>
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Transparent disclosure on how digital personal data is gathered, processed, and
            safeguarded in strict adherence to India&apos;s{' '}
            <strong className="text-foreground font-medium">
              Digital Personal Data Protection Act, 2023 (DPDP Act)
            </strong>
            .
          </p>

          <div className="flex items-center justify-center pt-2">
            <div className="inline-flex items-center p-1 rounded-full bg-muted/60 border border-border/70 text-xs">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-4 py-1.5 rounded-full font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  lang === 'en'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`px-4 py-1.5 rounded-full font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  lang === 'hi'
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                हिन्दी (Hindi)
              </button>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="rounded-2xl border border-border/60 bg-card/60 dark:bg-[#0d0d0e]/60 backdrop-blur-xs">
            <CardContent className="p-5 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">Data Fiduciary</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ashutosh Kewat, Full-Stack Developer located in Chhattisgarh, India.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border/60 bg-card/60 dark:bg-[#0d0d0e]/60 backdrop-blur-xs">
            <CardContent className="p-5 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">Lawful Grounds</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Explicit consent (Section 6) & legitimate security needs (Section 7).
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border/60 bg-card/60 dark:bg-[#0d0d0e]/60 backdrop-blur-xs">
            <CardContent className="p-5 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">Principal Rights</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Full statutory rights: Access, Rectification, Erasure & Consent Withdrawal.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-border/60 bg-card/60 dark:bg-[#0d0d0e]/60 backdrop-blur-xs">
            <CardContent className="p-5 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">Grievance SLA</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                48hr acknowledgement; formal resolution within statutory 30 days.
              </p>
            </CardContent>
          </Card>
        </div>

        {lang === 'en' ? (
          <div className="space-y-8">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-mono">
                  01
                </span>
                Identity of the Data Fiduciary & Applicability
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Under Section 2(i) of the Digital Personal Data Protection Act, 2023 (the
                &ldquo;DPDP Act&rdquo;), the Data Fiduciary determining the purpose and means of
                personal data processing for this web application is:
              </p>
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 text-xs sm:text-sm space-y-1 font-mono">
                <p>
                  <strong className="text-foreground">Data Fiduciary:</strong> Ashutosh Kewat
                  (DevFolio Portfolio)
                </p>
                <p>
                  <strong className="text-foreground">Official Contact:</strong>{' '}
                  ashutoshkewat1@gmail.com
                </p>
                <p>
                  <strong className="text-foreground">Operating Jurisdiction:</strong>{' '}
                  Janjgir-Champa, Chhattisgarh, India
                </p>
                <p>
                  <strong className="text-foreground">Effective Date:</strong> September 2026
                  (Updated for DPDP Act 2023)
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-mono">
                  02
                </span>
                Categories of Digital Personal Data Collected (Section 5 Notice)
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In strict compliance with Section 5 of the DPDP Act, we only collect digital
                personal data that you voluntarily provide or that is technically essential for site
                security and functionality:
              </p>

              <div className="grid md:grid-cols-2 gap-4 pt-1">
                <div className="rounded-2xl border border-border/60 bg-card dark:bg-[#0c0c0c] p-5 space-y-2.5">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <FileText className="w-4 h-4 text-primary" />
                    Contact & Inquiry Data
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>
                      <strong>Full Name:</strong> First & last name to address your communication.
                    </li>
                    <li>
                      <strong>Email Address:</strong> To deliver reciprocal responses and updates.
                    </li>
                    <li>
                      <strong>Subject & Message:</strong> Project briefs, collaboration details, or
                      inquiries submitted via the contact form.
                    </li>
                  </ul>
                  <Badge variant="secondary" className="text-[10px] font-mono">
                    Basis: Free Affirmative Consent (Sec. 6)
                  </Badge>
                </div>

                <div className="rounded-2xl border border-border/60 bg-card dark:bg-[#0c0c0c] p-5 space-y-2.5">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Lock className="w-4 h-4 text-emerald-500" />
                    Security Telemetry & Essential Cookies
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside leading-relaxed">
                    <li>
                      <strong>Device Fingerprint Hash:</strong> An irreversibly hashed
                      hardware/browser signal (SHA-256) used strictly to bind admin sessions and
                      mitigate automated bots and DDoS tampering.
                    </li>
                    <li>
                      <strong>Essential Cookies:</strong> Secure session tokens (
                      <code>better-auth.session_token</code>) and user theme preferences.
                    </li>
                  </ul>
                  <Badge variant="secondary" className="text-[10px] font-mono">
                    Basis: Legitimate Security Interest (Sec. 7)
                  </Badge>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-mono">
                  03
                </span>
                Purpose Specification & Grounds for Processing
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                In adherence to Section 4 and Section 7 of the Act:
              </p>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 list-disc list-inside leading-relaxed">
                <li>
                  <strong className="text-foreground">Inquiry Response:</strong> Personal data
                  submitted through our contact form is processed exclusively to address, negotiate,
                  or respond to your outreach, freelance inquiries, or employment opportunities.
                </li>
                <li>
                  <strong className="text-foreground">No Commercial Sale or Profiling:</strong> We
                  do{' '}
                  <span className="text-foreground font-semibold">
                    never sell, rent, monetize, or profile
                  </span>{' '}
                  your personal data for advertising or marketing brokers.
                </li>
                <li>
                  <strong className="text-foreground">Security Safeguards:</strong> Under Section
                  8(5), technical safeguards (TLS 1.3 encryption in transit, SHA-256 hashing,
                  rate-limiting) are employed to safeguard personal data against unauthorized
                  disclosure or breach.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-mono">
                  04
                </span>
                Data Processors & Cross-Border Processing (Section 16)
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We engage select, reputable cloud service providers under binding data processing
                agreements that adhere to global encryption standards:
              </p>
              <div className="grid sm:grid-cols-3 gap-3 pt-1">
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-1">
                  <div className="font-semibold text-xs text-foreground">Resend Inc.</div>
                  <p className="text-[11px] text-muted-foreground">
                    Transactional email relay for transmitting contact inquiries.
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-1">
                  <div className="font-semibold text-xs text-foreground">MongoDB Atlas</div>
                  <p className="text-[11px] text-muted-foreground">
                    Encrypted cloud database holding portfolio project & resume models.
                  </p>
                </div>
                <div className="rounded-xl border border-border/60 bg-muted/20 p-3.5 space-y-1">
                  <div className="font-semibold text-xs text-foreground">Vercel Inc.</div>
                  <p className="text-[11px] text-muted-foreground">
                    Global CDN & serverless execution edge with TLS encryption.
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                All data transfers comply with Central Government regulations under Section 16 of
                the DPDP Act. No data is transferred to any restricted or blacklisted territories.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-mono">
                  05
                </span>
                Retention Schedule & Erasure (Section 8(7))
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Under Section 8(7) of the DPDP Act, personal data is retained only for the duration
                required to satisfy the specific purpose for which it was collected. Contact
                inquiries are held for active correspondence and are permanently erased upon:
              </p>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
                <li>
                  Receipt of an erasure request or withdrawal of consent from the Data Principal.
                </li>
                <li>
                  Conclusion of the business or recruitment dialogue, unless required for legal
                  accounting.
                </li>
              </ul>
            </section>

            <section id="rights" className="space-y-4 pt-4 border-t border-border/60">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Scale className="w-6 h-6 text-primary" />
                  Statutory Rights of Data Principals (Chapter III)
                </h2>
                <p className="text-sm text-muted-foreground">
                  As an individual whose digital personal data is processed, you enjoy the following
                  non-derogable rights under Indian law:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/60 bg-card dark:bg-[#0c0c0c] p-5 space-y-2">
                  <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Right to Access Information (Sec. 11)
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    You have the right to request a summary of personal data being processed,
                    identity of processors with whom data is shared, and any other relevant
                    processing details.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-card dark:bg-[#0c0c0c] p-5 space-y-2">
                  <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Right to Correction & Erasure (Sec. 12)
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    You can request correction of inaccurate data, completion of incomplete
                    information, or complete erasure of past messages and personal data records.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-card dark:bg-[#0c0c0c] p-5 space-y-2">
                  <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Right to Withdraw Consent (Sec. 6(4))
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Consent granted can be withdrawn at any time with the same ease as it was
                    provided. Upon withdrawal, further processing is immediately halted.
                  </p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-card dark:bg-[#0c0c0c] p-5 space-y-2">
                  <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    Right to Nominate (Sec. 14)
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    You have the right to nominate an individual who, in the event of death or
                    incapacity, may exercise these statutory rights on your behalf.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-primary/30 bg-primary/5 dark:bg-primary/4 p-6 sm:p-8 space-y-6">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-primary font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    EXERCISE YOUR DPDP STATUTORY RIGHTS
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    Instant Data Subject Request (DSR) Helper
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Select the statutory right you wish to exercise. You can copy the legally
                    structured notice or open it directly in your email client addressed to our
                    Grievance Officer.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { id: 'erasure', label: '1. Request Data Erasure (Sec. 12)' },
                      { id: 'access', label: '2. Request Data Access (Sec. 11)' },
                      { id: 'correction', label: '3. Correct Data (Sec. 12)' },
                      { id: 'withdraw', label: '4. Withdraw Consent (Sec. 6(4))' },
                      { id: 'grievance', label: '5. File Grievance (Sec. 13)' },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedRight(item.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        selectedRight === item.id
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'bg-muted/80 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/80 p-4 font-mono text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-56">
                  {getDsrBody()}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild className="rounded-full gap-2 shadow-xs cursor-pointer">
                    <a href={mailtoUrl}>
                      <Send className="w-4 h-4" />
                      Open in Email Client
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={copyTemplate}
                    className="rounded-full gap-2 cursor-pointer"
                  >
                    {copiedTemplate ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        Copied Notice!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Legal Template
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </section>

            <section className="space-y-4 pt-4 border-t border-border/60">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-primary" />
                Grievance Redressal Mechanism & Data Protection Board of India
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/60 bg-card dark:bg-[#0c0c0c] p-6 space-y-3">
                  <div className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-primary/10 text-primary">
                    SECTION 13 COMPLIANCE
                  </div>
                  <h3 className="font-semibold text-base text-foreground">
                    Designated Grievance Redressal Officer (GRO)
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    In compliance with Section 13 of the DPDP Act, 2023, the designated Grievance
                    Officer for DevFolio is:
                  </p>

                  <div className="rounded-xl bg-muted/40 p-3.5 space-y-1 text-xs font-mono">
                    <p>
                      <strong className="text-foreground">Officer:</strong> Ashutosh Kewat
                    </p>
                    <p>
                      <strong className="text-foreground">Role:</strong> Data Protection & Grievance
                      Redressal Officer
                    </p>
                    <p>
                      <strong className="text-foreground">Email:</strong>{' '}
                      <a
                        href="mailto:ashutoshkewat1@gmail.com"
                        className="text-primary hover:underline"
                      >
                        ashutoshkewat1@gmail.com
                      </a>
                    </p>
                    <p>
                      <strong className="text-foreground">Location:</strong> Janjgir-Champa,
                      Chhattisgarh, India
                    </p>
                    <p>
                      <strong className="text-foreground">Turnaround SLA:</strong> Acknowledged
                      within 48h; resolved within 30 days.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/60 bg-card dark:bg-[#0c0c0c] p-6 space-y-3">
                  <div className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-500">
                    SECTION 13(3) & CHAPTER V
                  </div>
                  <h3 className="font-semibold text-base text-foreground">
                    Data Protection Board of India (DPBI)
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Under Section 13(3) of the Act, if you are not satisfied with the resolution
                    provided by our Grievance Officer, or if you do not receive a response within 30
                    days, you have the statutory right to escalate and lodge a formal complaint with
                    the Data Protection Board of India.
                  </p>

                  <div className="rounded-xl bg-muted/40 p-3.5 space-y-1 text-xs font-mono">
                    <p>
                      <strong className="text-foreground">Appellate Authority:</strong> Data
                      Protection Board of India
                    </p>
                    <p>
                      <strong className="text-foreground">Governing Statute:</strong> DPDP Act, 2023
                      (Chapter V)
                    </p>
                    <p>
                      <strong className="text-foreground">Portal:</strong> Government of India DPBI
                      Grievance Portal
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="space-y-8 text-foreground leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-mono">
                  01
                </span>
                डेटा फिड्यूशियरी (Data Fiduciary) का परिचय एवं वैधानिक सूचना
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम, 2023 (DPDP Act, 2023) की धारा 5 के अंतर्गत, यह
                गोपनीयता सूचना दर्शाती है कि इस वेबसाइट (DevFolio) पर आपके व्यक्तिगत डेटा को किस प्रकार
                सुरक्षित, संसाधित और प्रबंधित किया जाता है:
              </p>
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 text-xs sm:text-sm space-y-1 font-mono">
                <p>
                  <strong className="text-foreground">डेटा फिड्यूशियरी:</strong> आशुतोष केवट (Ashutosh
                  Kewat)
                </p>
                <p>
                  <strong className="text-foreground">आधिकारिक ईमेल:</strong>{' '}
                  ashutoshkewat1@gmail.com
                </p>
                <p>
                  <strong className="text-foreground">कार्यक्षेत्र:</strong> जांजगीर-चांपा, छत्तीसगढ़, भारत
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-mono">
                  02
                </span>
                एकत्रित किए जाने वाले व्यक्तिगत डेटा की श्रेणियां (धारा 5 सूचना)
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border/60 bg-card dark:bg-[#0c0c0c] p-5 space-y-2">
                  <h3 className="font-semibold text-sm text-foreground">
                    संपर्क प्रपत्र डेटा (Contact Data)
                  </h3>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>
                      <strong>नाम:</strong> आपसे संवाद करने हेतु।
                    </li>
                    <li>
                      <strong>ईमेल पता:</strong> आपके संदेश का उत्तर देने हेतु।
                    </li>
                    <li>
                      <strong>संदेश:</strong> आपके द्वारा भेजी गई पूछताछ या परियोजना विवरण।
                    </li>
                  </ul>
                  <Badge variant="secondary" className="text-[10px]">
                    आधार: स्पष्ट सहमति (धारा 6)
                  </Badge>
                </div>

                <div className="rounded-2xl border border-border/60 bg-card dark:bg-[#0c0c0c] p-5 space-y-2">
                  <h3 className="font-semibold text-sm text-foreground">सुरक्षा टेलीमेट्री एवं कुकीज़</h3>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>
                      <strong>डिवाइस फ़िंगरप्रिंट हैश:</strong> प्रशासनिक सुरक्षा एवं DDoS हमलों से रक्षा हेतु
                      एक-तरफ़ा हैश (SHA-256)।
                    </li>
                    <li>
                      <strong>अनिवार्य कुकीज़:</strong> सुरक्षित सत्र प्रबंधन और थीम वरीयता।
                    </li>
                  </ul>
                  <Badge variant="secondary" className="text-[10px]">
                    आधार: वैध सुरक्षा हित (धारा 7)
                  </Badge>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-mono">
                  03
                </span>
                डेटा स्वामी के वैधानिक अधिकार (Data Principal Rights - अध्याय III)
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                DPDP अधिनियम, 2023 के तहत आपको निम्नलिखित अधिकार प्राप्त हैं:
              </p>
              <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>
                  <strong className="text-foreground">सूचना प्राप्त करने का अधिकार (धारा 11):</strong>{' '}
                  अपने डेटा के प्रसंस्करण का सारांश जानने का अधिकार।
                </li>
                <li>
                  <strong className="text-foreground">संशोधन एवं मिटाने का अधिकार (धारा 12):</strong>{' '}
                  अपने डेटा को अद्यतन करने या स्थायी रूप से नष्ट (Erasure) करवाने का अधिकार।
                </li>
                <li>
                  <strong className="text-foreground">सहमति वापस लेने का अधिकार (धारा 6(4)):</strong>{' '}
                  दी गई सहमति को किसी भी समय सरलता से वापस लेना।
                </li>
                <li>
                  <strong className="text-foreground">शिकायत निवारण का अधिकार (धारा 13):</strong>{' '}
                  शिकायत अधिकारी के समक्ष शिकायत दर्ज करना।
                </li>
                <li>
                  <strong className="text-foreground">नामांकन का अधिकार (धारा 14):</strong> अपनी ओर से
                  अधिकारों का प्रयोग करने हेतु व्यक्ति का नामांकन करना।
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-mono">
                  04
                </span>
                शिकायत निवारण अधिकारी एवं भारतीय डेटा संरक्षण बोर्ड
              </h2>
              <div className="rounded-2xl border border-border/60 bg-muted/20 p-5 space-y-2 text-xs sm:text-sm">
                <p>
                  <strong className="text-foreground">नामित शिकायत अधिकारी:</strong> आशुतोष केवट
                  (Ashutosh Kewat)
                </p>
                <p>
                  <strong className="text-foreground">संपर्क ईमेल:</strong> ashutoshkewat1@gmail.com
                </p>
                <p>
                  <strong className="text-foreground">निवारण समयावधि:</strong> 48 घंटों में पावती; 30
                  दिनों के भीतर वैधानिक समाधान।
                </p>
                <p className="text-muted-foreground pt-2 text-xs">
                  यदि आप समाधान से संतुष्ट नहीं हैं, तो अधिनियम की धारा 13(3) के तहत आपको{' '}
                  <strong>भारतीय डेटा संरक्षण बोर्ड (Data Protection Board of India)</strong> के समक्ष
                  शिकायत दर्ज करने का पूर्ण वैधानिक अधिकार है।
                </p>
              </div>
            </section>
          </div>
        )}

        <div className="pt-8 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/">Back to Home</Link>
          </Button>

          <Button asChild className="rounded-full">
            <Link href="/contact">Go to Contact Form</Link>
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
