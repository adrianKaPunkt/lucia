import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

const db = drizzle(pool);

async function main() {
  console.log('migration started...');
  await migrate(db, { migrationsFolder: './lib/db/migrations' });
  console.log('migration ended!');
  process.exit(0);
}

main().catch((error) => {
  console.log(error);
  process.exit(0);
});
