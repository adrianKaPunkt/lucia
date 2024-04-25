import { lucia } from '@/lib/auth/auth';
import db from '@/lib/db';
import { emailVerificationTable, userTable } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const page = async (props: { searchParams: { token: string } }) => {
  if (!props.searchParams.token) {
    return <div>Token not found</div>;
  }

  // try {
  //   const decoded = jwt.verify(
  //     props.searchParams.token,
  //     process.env.JWT_SECRET!
  //   ) as {
  //     email: string;
  //     code: string;
  //     userId: string;
  //   };

  //   const emailVerificationQueryResult =
  //     await db.query.emailVerificationTable.findFirst({
  //       where:
  //         eq(emailVerificationTable.userId, decoded.userId) &&
  //         eq(emailVerificationTable.code, decoded.code),
  //     });

  //   if (!emailVerificationQueryResult) {
  //     return <div>Token is invalid, 1</div>;
  //   }

  //   await db
  //     .delete(emailVerificationTable)
  //     .where(eq(emailVerificationTable.userId, decoded.userId));

  //   await db
  //     .update(userTable)
  //     .set({ isEmailVerified: true })
  //     .where(eq(userTable.email, decoded.email));

  //   const session = await lucia.createSession(decoded.userId, {
  //     expiresIn: 60 * 60 * 24 * 30,
  //   });

  //   const sessionCookie = lucia.createSessionCookie(session.id);

  //   cookies().set(
  //     sessionCookie.name,
  //     sessionCookie.value,
  //     sessionCookie.attributes
  //   );

  //   return <>{JSON.stringify(decoded)}</>;
  // } catch (error) {
  //   return <div>Token is invalid</div>;
  // }
};
export default page;
