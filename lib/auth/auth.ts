import adapter from '@/lib/db/adapter';
import { Lucia } from 'lucia';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { roleEnums } from '../db/schema';

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      role: attributes.role,
      gender: attributes.gender,
      firstName: attributes.firstName,
      lastName: attributes.lastName,
      fullName: attributes.firstName + ' ' + attributes.lastName,
    };
  },
});

export const validateRequest = cache(async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId)
    return {
      user: null,
      session: null,
    };
  const { user, session } = await lucia.validateSession(sessionId);
  try {
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {
    // Next.js throws error when attempting to set cookies when rendering page
  }
  return { user, session };
});

// IMPORTANT!
declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  role: (typeof roleEnums.enumValues)[number];
  gender: boolean;
  firstName: string;
  lastName: string;
}
