'use client';

import SessionInfo from '@/components/dashboard/session-info';

export default function SessionPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>Session & Security</h1>
        <p className='text-muted-foreground mt-1'>
          View your current session details and device binding status
        </p>
      </div>

      <SessionInfo />

      <div className='rounded-lg border p-4 bg-muted/30'>
        <h3 className='font-medium mb-2'>Security Information</h3>
        <ul className='text-sm text-muted-foreground space-y-1.5'>
          <li>
            Only one active session is allowed per account at any time.
          </li>
          <li>
            Sessions are bound to your device fingerprint for added security.
          </li>
          <li>
            Signing in from a new device will automatically terminate your previous session.
          </li>
          <li>
            A major IP address change (different region) will require re-authentication.
          </li>
        </ul>
      </div>
    </div>
  );
}
