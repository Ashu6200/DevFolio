'use client';

import { trpc } from '@/utils/trpc';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Globe,
  Monitor,
  Fingerprint,
  Clock,
  CalendarDays,
  Shield,
} from 'lucide-react';

export default function SessionInfo() {
  const { data, isLoading } = trpc.user.sessionInfo.useQuery();

  if (isLoading) {
    return (
      <Card>
        <CardContent className='p-6'>
          <div className='animate-pulse space-y-4'>
            <div className='h-4 bg-muted rounded w-1/3' />
            <div className='h-4 bg-muted rounded w-1/2' />
            <div className='h-4 bg-muted rounded w-2/3' />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  const infoItems = [
    {
      icon: Shield,
      label: 'Session ID',
      value: data.sessionId,
      mono: true,
    },
    {
      icon: Globe,
      label: 'IP Address',
      value: data.ipAddress || 'Unknown',
    },
    {
      icon: Monitor,
      label: 'User Agent',
      value: data.userAgent || 'Unknown',
      truncate: true,
    },
    {
      icon: Fingerprint,
      label: 'Device Fingerprint',
      value: data.fingerprintHash
        ? `${data.fingerprintHash.slice(0, 16)}...`
        : 'Not captured',
      badge: data.fingerprintHash ? 'Bound' : 'Unbound',
      badgeVariant: data.fingerprintHash
        ? ('default' as const)
        : ('secondary' as const),
    },
    {
      icon: CalendarDays,
      label: 'Created At',
      value: data.createdAt
        ? new Date(data.createdAt).toLocaleString()
        : 'Unknown',
    },
    {
      icon: Clock,
      label: 'Expires At',
      value: data.expiresAt
        ? new Date(data.expiresAt).toLocaleString()
        : 'Unknown',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Session</CardTitle>
        <CardDescription>
          Your active session details and device binding information
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {infoItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className='flex items-start gap-3 py-2 border-b last:border-0'
            >
              <Icon className='h-4 w-4 mt-0.5 text-muted-foreground shrink-0' />
              <div className='min-w-0 flex-1'>
                <p className='text-sm font-medium'>{item.label}</p>
                <p
                  className={`text-sm text-muted-foreground ${
                    item.truncate ? 'truncate' : ''
                  } ${item.mono ? 'font-mono text-xs' : ''}`}
                >
                  {item.value}
                </p>
              </div>
              {'badge' in item && item.badge && (
                <Badge variant={item.badgeVariant}>{item.badge}</Badge>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
