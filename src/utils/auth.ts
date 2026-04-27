import { connectToDatabase } from "@/server/db/mongoose";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export async function getAuth() {
  if (authInstance) return authInstance;

  const mongoose = await connectToDatabase();
  const db = mongoose.connection.getClient().db();

  authInstance = betterAuth({
    database: mongodbAdapter(db),
    secret: process.env.BETTER_AUTH_SECRET as string,
    baseURL: process.env.BETTER_AUTH_URL as string,

    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      requireEmailVerification: false,
      autoSignIn: true,
    },

    session: {
      additionalFields: {
        fingerprintHash: {
          type: "string",
          required: false,
          returned: true,
          input: false,
        },
      },
    },

    user: {
      additionalFields: {
        bio: {
          type: "string",
          required: false,
          returned: true,
          input: true,
          defaultValue: "",
        },
        resumeUrl: {
          type: "string",
          required: false,
          returned: true,
          input: true,
          defaultValue: "",
        },
      },
    },

    rateLimit: {
      enabled: true,
      window: 60,
      max: 100,
      customRules: {
        "/sign-in/email": { window: 60, max: 5 },
        "/sign-up/email": { window: 60, max: 3 },
      },
    },

    databaseHooks: {
      session: {
        create: {
          before: async (session, context) => {
            const fpHash = context?.headers?.get("x-fingerprint-hash");
            if (fpHash) {
              return {
                data: { ...session, fingerprintHash: fpHash },
              };
            }
          },
          after: async (session) => {
            await db
              .collection("session")
              .deleteMany({ userId: session.userId, id: { $ne: session.id } });
          },
        },
      },
    },
  });

  return authInstance;
}
