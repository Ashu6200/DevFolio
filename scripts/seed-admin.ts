/**
 * Admin seeder script — run once to create the admin user.
 *
 * Usage:
 *   npx tsx scripts/seed-admin.ts
 *
 * Required env vars (set in .env.local):
 *   ADMIN_NAME=Your Name
 *   ADMIN_EMAIL=admin@example.com
 *   ADMIN_PASSWORD=your-strong-password
 */

import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

import { getAuth } from '../src/utils/auth';

async function main() {
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password) {
    console.error(
      'Missing required env vars: ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD'
    );
    process.exit(1);
  }

  console.log(`Seeding admin user: ${email}`);

  try {
    const auth = await getAuth();
    const result = await auth.api.signUpEmail({
      body: { name, email, password },
    });

    if (result && 'user' in result && result.user) {
      console.log(`✓ Admin created successfully (id: ${result.user.id})`);
    } else {
      console.log('✓ Admin created successfully');
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (
      message.toLowerCase().includes('already exists') ||
      message.toLowerCase().includes('duplicate') ||
      message.toLowerCase().includes('user already')
    ) {
      console.log('Admin user already exists — skipping.');
    } else {
      console.error('Failed to create admin:', message);
      process.exit(1);
    }
  }

  process.exit(0);
}

main();
