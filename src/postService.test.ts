import { Client } from 'pg';
import { getPostsForUser, createPostForUser } from './postService';
import * as chai from 'chai';

import * as sinon from 'sinon';

const expect = chai.expect;

//The following test bock the database
describe('postsService', () => {
    let client: Client =sinon.createStubInstance(Client);
  
    it('should get posts for user', async () => {
      const userId = 1;
      const expectedPosts = [
        { id: 1, type: 'picture', createddate: '2022-01-01T00:00:00.000Z', userid: 1 },
        { id: 2, type: 'video', createddate: '2022-02-01T00:00:00.000Z', userid: 1 }
      ];
      (client.query as sinon.SinonStub).resolves({ rows: expectedPosts });
      const posts = await getPostsForUser(userId, client);
      expect(posts).to.deep.equal(expectedPosts);
    });
  
    it('should create post for user', async () => {
      const userId = 2;
      const type = 'picture';
      const createddate = new Date().toISOString();
      (client.query as sinon.SinonStub).resolves({ rows: [] });
      await createPostForUser(userId, type, createddate, client);
      expect((client.query as sinon.SinonStub).calledWithMatch({
        text: 'INSERT INTO content (type, createddate, userid) VALUES ($1, $2, $3)',
        values: [type, createddate, userId]
      })).to.be.false;
    });
  });
