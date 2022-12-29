import { Client } from 'pg';

export async function getPostsForUser(userId: number, client:  Client): Promise<Array<Object>> {
  const res = await client.query(
    'SELECT id, type, createddate, userid FROM content WHERE id = $1',
    [userId]
  );
  return res.rows;
}

export async function createPostForUser(
  userId: number,
  type: string,
  createddate: string,
  client:  Client
): Promise<void> {
  await client.query(
    'INSERT INTO content (type, createddate, userid) VALUES ($1, $2, $3)',
    [type, createddate, userId]
  );
}