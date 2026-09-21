'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  CheckCircle2,
  FileCheck2,
  Github,
  Info,
  Linkedin,
  Loader2,
  MailIcon,
  MapPinIcon,
  MessageSquare,
  Scale,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { type ContactFormValues, contactFormSchema } from '@/lib/schemas/form-schemas';
import { trpc } from '@/utils/trpc';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [noticeLang, setNoticeLang] = useState<'en' | 'hi'>('en');

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
      consent: false,
    },
  });

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      reset();
    },
    onError: (e) => {
      setError('root', { message: e.message });
    },
  });

  function onSubmit(values: ContactFormValues) {
    submitMutation.mutate({
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      subject: values.subject,
      message: values.message,
      consent: values.consent,
    });
  }

  return (
    <main className="min-h-screen py-20 px-6 md:px-8 md:py-28 flex items-center justify-center">
      <motion.div
        className="w-full max-w-6xl mx-auto space-y-12"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-mono text-primary border border-primary/20 bg-primary/10 rounded-full">
            <MessageSquare className="w-3.5 h-3.5" />
            LET&apos;S CONNECT
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Get In{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-500 dark:to-emerald-200">
              Touch
            </span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Have an exciting project, full-time role, or collaboration in mind? Feel free to drop a
            message or reach out directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card dark:bg-[#0c0c0c] border border-border/60 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
              <div>
                <h3 className="text-xl font-bold text-foreground">Contact Channels</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  I usually respond within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 shrink-0 flex items-center justify-center bg-primary/10 border border-primary/20 text-primary rounded-2xl">
                    <MapPinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Location</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Janjgir-Champa, Chhattisgarh, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 shrink-0 flex items-center justify-center bg-primary/10 border border-primary/20 text-primary rounded-2xl">
                    <MailIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">Email</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Direct inquiries & opportunities
                    </p>
                    <Link
                      className="inline-block text-sm font-medium text-primary hover:underline mt-1"
                      href="mailto:ashutoshkewat1@gmail.com"
                    >
                      ashutoshkewat1@gmail.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 shrink-0 flex items-center justify-center bg-muted/60 border border-border/60 text-foreground rounded-2xl">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">GitHub</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Open-source projects & code
                    </p>
                    <Link
                      className="inline-block text-sm font-medium text-primary hover:underline mt-1"
                      href="https://github.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View GitHub Profile
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 shrink-0 flex items-center justify-center bg-muted/60 border border-border/60 text-foreground rounded-2xl">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">LinkedIn</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Professional networking & updates
                    </p>
                    <Link
                      className="inline-block text-sm font-medium text-primary hover:underline mt-1"
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Connect on LinkedIn
                    </Link>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/60">
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 dark:bg-primary/4 p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-xs font-semibold text-foreground">
                        DPDP Act, 2023 Compliance
                      </span>
                      s
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Grievance Officer:</strong> Ashutosh Kewat
                      <br />
                      <strong className="text-foreground">SLA Turnaround:</strong> 30 days
                    </p>
                    <Link
                      href="/privacy#rights"
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline pt-1"
                    >
                      <FileCheck2 className="w-3.5 h-3.5" />
                      Exercise Data Principal Rights (Access / Erasure) &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Card className="rounded-3xl border border-border/60 bg-card dark:bg-[#0c0c0c] shadow-xs">
              <CardContent className="p-6 sm:p-8 md:p-10">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Message Received!</h3>
                    <p className="text-muted-foreground text-sm max-w-md">
                      Thank you for reaching out. I review inquiries daily and will reply within 24
                      hours.
                    </p>

                    <div className="rounded-2xl border border-border/60 bg-muted/40 p-4 text-xs text-muted-foreground max-w-md text-left space-y-1.5 leading-relaxed">
                      <div className="flex items-center gap-1.5 font-semibold text-foreground">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Consent Recorded (DPDP Act, 2023)</span>
                      </div>
                      <p>
                        Your contact submission was recorded under informed consent. Under Section
                        6(4) and Section 12 of the DPDP Act, you retain full rights to{' '}
                        <strong>withdraw consent</strong> or request{' '}
                        <strong>complete erasure</strong> of this message at any time.
                      </p>
                      <div className="pt-1">
                        <Link
                          href="/privacy#rights"
                          className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                        >
                          Visit Data Principal Rights Portal &rarr;
                        </Link>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => setSubmitted(false)}
                      className="mt-2 rounded-full cursor-pointer"
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {errors.root && (
                      <div className="rounded-2xl bg-destructive/10 border border-destructive/20 p-3.5 text-sm text-destructive">
                        {errors.root.message}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName" className="text-xs font-semibold">
                          First Name
                        </Label>
                        <Input
                          placeholder="e.g. John"
                          id="firstName"
                          className="h-11 rounded-xl bg-muted/30 focus-visible:bg-background border-border/70 text-foreground transition-colors"
                          {...register('firstName')}
                        />
                        {errors.firstName && (
                          <p className="text-xs text-destructive">{errors.firstName.message}</p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="lastName" className="text-xs font-semibold">
                          Last Name
                        </Label>
                        <Input
                          placeholder="e.g. Doe"
                          id="lastName"
                          className="h-11 rounded-xl bg-muted/30 focus-visible:bg-background border-border/70 text-foreground transition-colors"
                          {...register('lastName')}
                        />
                        {errors.lastName && (
                          <p className="text-xs text-destructive">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-semibold">
                        Email
                      </Label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        id="email"
                        className="h-11 rounded-xl bg-muted/30 focus-visible:bg-background border-border/70 text-foreground transition-colors"
                        {...register('email')}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="subject" className="text-xs font-semibold">
                        Subject
                      </Label>
                      <Input
                        placeholder="Project collaboration, inquiry, etc."
                        id="subject"
                        className="h-11 rounded-xl bg-muted/30 focus-visible:bg-background border-border/70 text-foreground transition-colors"
                        {...register('subject')}
                      />
                      {errors.subject && (
                        <p className="text-xs text-destructive">{errors.subject.message}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-xs font-semibold">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Tell me about your project or inquiry..."
                        className="min-h-32 rounded-xl bg-muted/30 focus-visible:bg-background border-border/70 text-foreground transition-colors resize-y"
                        rows={5}
                        {...register('message')}
                      />
                      {errors.message && (
                        <p className="text-xs text-destructive">{errors.message.message}</p>
                      )}
                    </div>

                    <div className="rounded-2xl border border-primary/20 bg-primary/5 dark:bg-primary/4 p-4 space-y-3">
                      <div className="flex items-center justify-between gap-2 border-b border-primary/10 pb-2">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                          <ShieldCheck className="w-4 h-4 text-primary" />
                          <span>DPDP Act, 2023 Statutory Notice</span>
                        </div>

                        <div className="inline-flex items-center p-0.5 rounded-full bg-muted/70 border border-border/60 text-[10px]">
                          <button
                            type="button"
                            onClick={() => setNoticeLang('en')}
                            className={`px-2 py-0.5 rounded-full font-medium transition-colors cursor-pointer ${
                              noticeLang === 'en'
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            English
                          </button>
                          <button
                            type="button"
                            onClick={() => setNoticeLang('hi')}
                            className={`px-2 py-0.5 rounded-full font-medium transition-colors cursor-pointer ${
                              noticeLang === 'hi'
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            हिन्दी
                          </button>
                        </div>
                      </div>

                      {noticeLang === 'en' ? (
                        <ul className="text-[11px] text-muted-foreground space-y-1 leading-relaxed list-disc list-inside">
                          <li>
                            <strong className="text-foreground/90">Data Collected:</strong> First
                            Name, Last Name, Email, Subject, Message content.
                          </li>
                          <li>
                            <strong className="text-foreground/90">Specific Purpose:</strong>{' '}
                            Responding directly to your inquiry and coordinating professional
                            engagements.
                          </li>
                          <li>
                            <strong className="text-foreground/90">Data Principal Rights:</strong>{' '}
                            Right to access, correct, erase data, or withdraw consent at any time
                            under Section 6(4) & Chapter III.
                          </li>
                          <li>
                            <strong className="text-foreground/90">Grievance Redressal:</strong>{' '}
                            Grievance Officer resolution within 30 days. You have the right to lodge
                            a complaint with the <em>Data Protection Board of India (DPBI)</em>{' '}
                            under Section 13(3).
                          </li>
                          <li>
                            <strong className="text-foreground/90">
                              Age Qualification (Sec. 9):
                            </strong>{' '}
                            By submitting, you confirm you are 18 years of age or older, or
                            authorized representative of an enterprise.
                          </li>
                        </ul>
                      ) : (
                        <ul className="text-[11px] text-muted-foreground space-y-1 leading-relaxed list-disc list-inside">
                          <li>
                            <strong className="text-foreground/90">एकत्रित डेटा:</strong> नाम, ईमेल,
                            विषय और संदेश।
                          </li>
                          <li>
                            <strong className="text-foreground/90">उद्देश्य:</strong> आपकी पूछताछ का
                            सीधा उत्तर देना एवं संपर्क साधना।
                          </li>
                          <li>
                            <strong className="text-foreground/90">अधिकार:</strong> डेटा तक पहुंच,
                            सुधार, मिटाने एवं सहमति वापस लेने का पूर्ण वैधानिक अधिकार (धारा 6(4) एवं अध्याय
                            III)।
                          </li>
                          <li>
                            <strong className="text-foreground/90">शिकायत निवारण:</strong> 30 दिनों में
                            समाधान; भारतीय डेटा संरक्षण बोर्ड (DPBI) के समक्ष अपील का अधिकार (धारा 13(3))।
                          </li>
                          <li>
                            <strong className="text-foreground/90">आयु पुष्टि:</strong> आप पुष्टि करते हैं
                            कि आपकी आयु 18 वर्ष या उससे अधिक है।
                          </li>
                        </ul>
                      )}

                      <div className="pt-2 border-t border-primary/10">
                        <div className="flex items-start gap-2.5">
                          <Controller
                            name="consent"
                            control={control}
                            render={({ field }) => (
                              <Checkbox
                                id="dpdp-consent"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="mt-0.5"
                              />
                            )}
                          />
                          <Label
                            htmlFor="dpdp-consent"
                            className="text-xs text-muted-foreground leading-normal cursor-pointer select-none font-normal"
                          >
                            I explicitly consent to the collection and processing of my personal
                            data for the purpose of responding to this inquiry in accordance with
                            India&apos;s Digital Personal Data Protection Act, 2023 and the{' '}
                            <Link
                              href="/privacy"
                              target="_blank"
                              className="text-primary hover:underline font-medium inline-flex items-center gap-0.5"
                            >
                              Privacy Policy
                            </Link>
                            . I confirm I am 18 years of age or older.
                          </Label>
                        </div>
                        {errors.consent && (
                          <p className="text-xs text-destructive mt-1.5 pl-6 font-medium">
                            {errors.consent.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full rounded-full h-11 text-sm font-medium gap-2 shadow-xs cursor-pointer"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>

                    <p className="text-center text-[11px] text-muted-foreground flex items-center justify-center gap-1.5 pt-1">
                      <Info className="w-3.5 h-3.5 text-muted-foreground/80 shrink-0" />
                      <span>
                        Compliant with DPDP Act, 2023 & DPBI rules. Exercising rights? Visit{' '}
                        <Link
                          href="/privacy#rights"
                          className="text-primary hover:underline font-medium"
                        >
                          Data Principal Rights
                        </Link>
                      </span>
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default ContactPage;
