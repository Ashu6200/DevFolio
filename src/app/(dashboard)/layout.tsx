import { auth } from '@/utils/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardSidebar from '@/components/dashboard/sidebar';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/sign-in');

  return (
    <div className='flex min-h-screen'>
      <DashboardSidebar user={session.user} />
      <main className='flex-1 overflow-y-auto p-4 md:p-8'>{children}</main>
    </div>
  );
}
