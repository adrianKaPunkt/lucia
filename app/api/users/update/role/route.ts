import db from '@/lib/db';
import { userTable } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const id = body.id;
  const role = body.role;

  console.log('ID: ', id);
  /// prüfen, ob es ein role-enum-wert ist

  try {
    await db.update(userTable).set({ role: role }).where(eq(userTable.id, id));
    return new Response('role updated');
  } catch (error) {
    console.log(error);
    return {
      error: 'unable to update role',
    };
  }
}
