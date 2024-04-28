import db from '@/lib/db';
import { profileTable, userTable } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id') || '';
  console.log('ID', id);

  try {
    const user = await db
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
      .leftJoin(profileTable, eq(userTable.id, profileTable.id))
      .where(eq(userTable.id, id));
    return new Response(JSON.stringify(user));
  } catch (error) {
    console.error(error);
    return new Response('ERROR');
  }
}
