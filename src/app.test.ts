import chai from 'chai';
import chaiHttp from 'chai-http';
import { createServer } from 'http';
import {app,start_application} from './app';

chai.use(chaiHttp);
const expect = chai.expect;


const request = chai.request(app).keepOpen();


describe('API', () => {
  
  let server:any;

  before(() => {
  });

  after(() => {
    server.close();
  });


  it('should get a list of posts', async () => {
    server = await start_application();
    const res = await request.get('/test');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('value').to.equal('test');
  });

  it('should get a list of posts', async () => {
    server = await start_application();
    const res = await request.get('/posts/1');
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('value').to.equal('test');
  });

});



