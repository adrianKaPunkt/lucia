import db from '@/lib/db';
import { profileTable, userTable } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  const result = await db
    .select({
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
    .leftJoin(profileTable, eq(userTable.id, profileTable.id));

  return new Response(JSON.stringify(result));
}
