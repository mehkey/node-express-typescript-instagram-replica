import express from 'express';
import { registerRoutes } from './routes';
import { Client } from 'pg';
import { readFileSync } from 'fs';
import { join } from 'path';

import { initDb } from './database';

export const app = express();

let started = false

export async function start_application(): Promise<any> {
  
  console.log("STARTING THE APPLICATION");
  
  if (started){
    return;
  }
  started = true;

  const client = await initDb();

  // Read the tables.sql file and execute the SQL commands
  console.log("CREATING THE DB TABLES");
  const sql = readFileSync(join(__dirname, '../src/tables.sql'), 'utf8');
  console.log(sql)
  console.log(process.env.PORT)
  
  await client.query(sql);

  registerRoutes(app, client);
  
  const port = process.env.PORT || 3000;
  const res= app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  return res;
}

