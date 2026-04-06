'use client';

import FingerprintJS from '@fingerprintjs/fingerprintjs';

let fpPromise: ReturnType<typeof FingerprintJS.load> | null = null;

function getAgent() {
  if (!fpPromise) {
    fpPromise = FingerprintJS.load();
  }
  return fpPromise;
}

export async function getFingerprint(): Promise<string> {
  const fp = await getAgent();
  const result = await fp.get();
  return result.visitorId;
}

export async function getFingerprintHash(): Promise<string> {
  const visitorId = await getFingerprint();
  const encoder = new TextEncoder();
  const data = encoder.encode(
    visitorId + (process.env.NEXT_PUBLIC_FP_SALT || '')
  );
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
