'use server';

import { SignInSchema, SignUpSchema } from '@/lib/db/schemas/auth';
import { z } from 'zod';
import { Argon2id } from 'oslo/password';
import { generateId } from 'lucia';
import db from '@/lib/db';
import {
  emailVerificationTable,
  passwordResetTable,
  userTable,
} from '@/lib/db/schema';
import { lucia, validateRequest } from '@/lib/auth/auth';
import { cookies } from 'next/headers';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { sendEmail } from '@/lib/email';

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  const hashedPassword = await new Argon2id().hash(values.password);
  const userId = generateId(15);

  try {
    await db.insert(userTable).values({
      id: userId,
      email: values.email,
      hashedPassword: hashedPassword,
    });

    const code = Math.random().toString(36).substring(2, 8);
    await db.insert(emailVerificationTable).values({
      code,
      userId,
      id: generateId(15),
      sentAt: new Date(),
    });

    const token = jwt.sign(
      { email: values.email, code },
      process.env.JWT_SECRET!,
      {
        expiresIn: '5m',
      }
    );

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email?token=${token}`;

    await sendEmail(
      values.email,
      'Verify your email',
      `<a href="${url}">Verify your email</a>`
    );

    return {
      success: true,
      message: 'Verification email sent',
      data: {
        userId,
      },
    };
  } catch (error: any) {
    console.log(error);
    return { error: error?.message };
  }
};

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  try {
    SignInSchema.parse(values);
  } catch (error: any) {
    return { error: error.message };
  }

  const existingUser = await db.query.userTable.findFirst({
    where: (table) => eq(table.email, values.email),
  });

  if (!existingUser) {
    return { error: 'User not found' };
  }

  if (!existingUser.hashedPassword) {
    return { error: 'User not found' };
  }

  const isValidPassword = await new Argon2id().verify(
    existingUser.hashedPassword,
    values.password
  );

  if (!isValidPassword) {
    return { error: 'Incorrect username or password' };
  }

  if (existingUser.isEmailVerified === false) {
    return { error: 'Email is not verified', key: 'email_not_verified' };
  }
  const session = await lucia.createSession(existingUser.id, {
    expiresIn: 60 * 60 * 24 * 30,
  });

  const sessionCookie = lucia.createSessionCookie(session.id);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return { success: 'Logged in successfully' };
};

export const signOut = async () => {
  try {
    const { session } = await validateRequest();
    if (!session) {
      return { error: 'Unauthorized' };
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
  } catch (error: any) {
    return { error: error?.message };
  }
};

export const resendVerificationEmail = async (email: string) => {
  try {
    const existingUser = await db.query.userTable.findFirst({
      where: (table) => eq(table.email, email),
    });

    if (!existingUser) {
      return { error: 'User not found' };
    }
    if (existingUser.isEmailVerified === true) {
      return { error: 'Email already verified' };
    }

    // resend email after 1 minute
    const existedCode = await db.query.emailVerificationTable.findFirst({
      where: eq(emailVerificationTable.userId, existingUser.id),
    });
    if (!existedCode) {
      return { error: 'Code not found' };
    }
    const sentAt = new Date(existedCode.sentAt);
    const isThreeMinuteHasPassed =
      new Date().getTime() - sentAt.getTime() > 60000;

    if (!isThreeMinuteHasPassed) {
      return {
        error:
          'Email already sent. The next possible resend is in ' +
          (60 - Math.floor((new Date().getTime() - sentAt.getTime()) / 1000)) +
          'seconds',
      };
    }
    // ---

    const code = Math.random().toString(36).substring(2, 8);

    await db
      .update(emailVerificationTable)
      .set({ code, sentAt: new Date() })
      .where(eq(emailVerificationTable.userId, existingUser.id));

    const token = jwt.sign(
      { email, userId: existingUser.id, code },
      process.env.JWT_SECRET!,
      { expiresIn: '5m' }
    );
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email?token=${token}`;
    await sendEmail(
      email,
      'Verify your email',
      `<a href="${url}">Verify your email</a>`
    );

    return {
      success: 'Email sent',
    };
  } catch (error: any) {
    return { error: error?.message };
  }
};

export const passwordReset = async (email: string) => {
  try {
    const existingUser = await db.query.userTable.findFirst({
      where: (table) => eq(table.email, email),
    });

    if (!existingUser) {
      console.error('ERROR: User not found');
      return;
    }
    // deleting all records with the same email
    try {
      await db
        .delete(passwordResetTable)
        .where(eq(passwordResetTable.email, email));
    } catch (error) {}

    // generate password reset code
    const code = Math.random().toString(36).substring(2, 8);
    // insert values into passwortResetTable
    await db.insert(passwordResetTable).values({
      id: generateId(12),
      email: existingUser.email,
      code: code,
      sentAt: new Date(),
    });
    // generate token
    const token = jwt.sign(
      { email: email, code, id: existingUser.id },
      process.env.JWT_SECRET!,
      {
        expiresIn: '5m',
      }
    );
    // send the reset password email
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/reset-password?token=${token}`;
    await sendEmail(
      email,
      'Reset your password',
      `<a href="${url}">Reset your password</a>`
    );

    return { success: true, message: 'Reset password email sent' };
  } catch (error: any) {
    return { error: error?.message };
  }
};

export const newPassword = async (password: string, userId: string) => {
  const hashedPassword = await new Argon2id().hash(password);
  if (password.length > 1) {
    try {
      await db
        .update(userTable)
        .set({ hashedPassword })
        .where(eq(userTable.id, userId));

      return { success: 'Password updated' };
    } catch (error: any) {
      console.log(error);
      return { error: error?.message };
    }
  } else {
    console.error('ERROR: Invalid password');
    return { error: 'Invalid password' };
  }
};
