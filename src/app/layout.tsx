import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import GlobalProvider from '@/lib/provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'DevFolio - Developer Portfolio',
  description:
    'A production-grade developer portfolio showcasing projects, education, and work experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <GlobalProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider attribute='class' defaultTheme='light' enableSystem>
            <div className='w-full flex items-center justify-center relative'>
              <div className='blurSpot'></div>
            </div>
            {children}
          </ThemeProvider>
        </body>
      </GlobalProvider>
    </html>
  );
}
