import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import db from '@/lib/db';
import { eq } from 'drizzle-orm';
import { passwordResetTable } from '@/lib/db/schema';
import { lucia } from '@/lib/auth/auth';
import { cookies } from 'next/headers';

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      console.error('ERROR: Token does not exist!');
      return { status: 400 };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string;
      code: string;
      id: string;
    };

    const passwordResetQueryResult =
      await db.query.passwordResetTable.findFirst({
        where:
          eq(passwordResetTable.email, decoded.email) &&
          eq(passwordResetTable.code, decoded.code),
      });
    if (!passwordResetQueryResult) {
      return Response.json({ error: 'Invalid token' }, { status: 400 });
    }
    const session = await lucia.createSession(decoded.id, {
      expiresIn: 60 * 60 * 24 * 30,
    });
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return Response.redirect(
      new URL(process.env.NEXT_PUBLIC_BASE_URL! + '/auth/new-password'),
      302
    );
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
};
