import db from '@/lib/db';
import { dayTable, profileTable, userTable } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const result = await db
    .select({
      //date: dayTable.date,
      id: userTable.id,
      email: userTable.email,
      role: userTable.role,
      gender: profileTable.gender,
      firstName: profileTable.firstName,
      lastName: profileTable.lastName,
      zip: profileTable.zip,
      address: profileTable.address,
      city: profileTable.city,
      country: profileTable.country,
      birthday: profileTable.birthday,
    })
    .from(userTable)
    .rightJoin(profileTable, eq(userTable.id, profileTable.id))
    .rightJoin(dayTable, eq(dayTable.userId, userTable.id));

  return new Response(JSON.stringify(result));
}
