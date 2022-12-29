
import { Client } from 'pg';

export async function initDb(): Promise< Client> {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'postgres'
  });

  try {
    await client.connect();
  } catch (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }

  return client;
}

