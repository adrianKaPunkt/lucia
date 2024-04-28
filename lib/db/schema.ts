import { relations } from 'drizzle-orm';
import { primaryKey } from 'drizzle-orm/mysql-core';
import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  time,
  timestamp,
} from 'drizzle-orm/pg-core';

export const roleEnums = pgEnum('role', ['GUEST', 'USER', 'ADMIN']);
export const taskStateEnums = pgEnum('task_state', ['START', 'STOP']);
export const taskTypeEnums = pgEnum('task_type', ['WORK', 'TASK']);
export const countryEnums = pgEnum('country', [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua & Deps',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cape Verde',
  'Central African Rep',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Congo {Democratic Rep}',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'East Timor',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland {Republic}',
  'Israel',
  'Italy',
  'Ivory Coast',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Korea North',
  'Korea South',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macedonia',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar, {Burma}',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russian Federation',
  'Rwanda',
  'St Kitts & Nevis',
  'St Lucia',
  'Saint Vincent & the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome & Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Swaziland',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Togo',
  'Tonga',
  'Trinidad & Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
]);

export const userTable = pgTable('user', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  hashedPassword: text('hashed_password').notNull(),
  role: roleEnums('role').default('GUEST'),
  isEmailVerified: boolean('is_email_verified').notNull().default(false),
  createdAt: timestamp('created_at').default(new Date()),
});

export const profileTable = pgTable('profile', {
  id: text('id')
    .primaryKey()
    .references(() => userTable.id),
  gender: boolean('gender'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  address: text('address'),
  zip: text('zip'),
  city: text('city'),
  country: countryEnums('country'),
  birthday: date('birthday', { mode: 'date' }),
  nationality: countryEnums('nationality'),
});

export const dayTable = pgTable('day', {
  id: serial('id').primaryKey(),
  date: date('date', { mode: 'date' }).notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
});

export const taskTable = pgTable('task', {
  id: serial('id').primaryKey(),
  dayId: integer('day_id')
    .notNull()
    .references(() => dayTable.id),
  description: text('description').notNull(),
  startAt: time('start_at', { precision: 0, withTimezone: true }).default(
    '12:00:00'
  ),
  endAt: time('end_at', { precision: 0, withTimezone: true }).default(
    '18:00:00'
  ),
  state: taskStateEnums('task_state').default('START'),
  type: taskTypeEnums('task_type').default('WORK'),
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

/// Relations

export const userRelations = relations(userTable, ({ one, many }) => ({
  profile: one(profileTable, {
    fields: [userTable.id],
    references: [profileTable.id],
  }),
  days: many(profileTable),
}));

export const dayRelations = relations(dayTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [dayTable.userId],
    references: [userTable.id],
  }),
  tasks: many(taskTable),
}));

export const taskRelations = relations(taskTable, ({ one }) => ({
  dayOnTask: one(dayTable, {
    fields: [taskTable.dayId],
    references: [dayTable.id],
  }),
}));
