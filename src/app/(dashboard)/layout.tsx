import { getAuth } from '@/utils/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import DashboardSidebar from '@/components/dashboard/sidebar';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getAuth();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/');

  return (
    <div className='flex max-h-screen'>
      <DashboardSidebar user={session.user} />
      <main className='flex-1 overflow-y-auto px-4 pt-4'>{children}</main>
    </div>
  );
}
