import { boolean, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const roleEnums = pgEnum('role', ['guest', 'user', 'admin']);

export const userTable = pgTable('user', {
  id: text('id').primaryKey(),
  gender: boolean('gender'),
  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  profilePictureUrl: text('profile_picture_url'),
  hashedPassword: text('hashed_password'),
  isEmailVerified: boolean('is_email_verified').notNull().default(false),
  role: roleEnums('role').notNull().default('guest'),
});

export const emailVerificationTable = pgTable('email_verification', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
  code: text('code').notNull(),
  sentAt: timestamp('sent_at', {
    withTimezone: true,
  }).notNull(),
});

export const passwordResetTable = pgTable('passwort_reset', {
  id: text('password_id').primaryKey(),
  email: text('user_email')
    .notNull()
    .references(() => userTable.email),
  code: text('token').notNull(),
  sentAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export const sessionTable = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});
