
import { Client } from 'pg';
import { Request, Response, Router } from 'express';
import { getPostsForUser, createPostForUser } from './postService';

export function registerRoutes(app: Router, client:  Client): void {
  app.get('/posts/:userId', async (req: Request, res: Response) => {
    let userId: number | string = req.params.userId;
    
    // Convert userId to a number if it is a string
    if (typeof userId === 'string') {
      userId = Number(userId);
    }
    // Ensure that userId is a number
    if (typeof userId !== 'number') {
      throw new Error('Invalid userId');
    }
    try {
      const posts = await getPostsForUser(userId, client);
      res.status(200).json({ posts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get posts' });
    }
  });

  app.get('/test', async (req: Request, res: Response) => {

    res.status(200).json({ 'value':'test' });
  });

  app.post('/posts/:userId', async (req: Request, res: Response) => {
    let userId :  number | string= req.params.userId;
    // Convert userId to a number if it is a string
    if (typeof userId === 'string') {
      userId = Number(userId);
    }
    // Ensure that userId is a number
    if (typeof userId !== 'number') {
      throw new Error('Invalid userId');
    }
    const type = req.body.type;
    const createddate = req.body.createddate;

    try {
      await createPostForUser(userId, type, createddate, client);
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create post' });
    }

  });
}