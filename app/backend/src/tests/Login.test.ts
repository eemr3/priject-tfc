import * as sinon from 'sinon';
import * as chai from 'chai';
import 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota de Login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(User, 'findOne').resolves({
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    } as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('ao efetuar um login com sucesso', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.not.have.property('password');
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body.user).to.have.property('id');
    expect(chaiHttpResponse.body.user).to.have.property('username');
    expect(chaiHttpResponse.body.user).to.have.property('role');
    expect(chaiHttpResponse.body.user).to.have.property('email');
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  // it('ao efetuar um login com o email incorreto', async () => {
  //   chaiHttpResponse = await chai
  //     .request(app)
  //     .post('/login')
  //     .send({ email: 'xablau@teste.com', password: 'secret_admin' });
    
  //   expect(chaiHttpResponse.status).to.be.equal(401);
  //   expect(chaiHttpResponse.body).to.have.property('message');
  //   expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  // });

  it('ao efetuar um login com senha incorreta', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com', password: '123456' });
    
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });

});

describe('Teste da rota de Login/validate', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(User, 'findOne').resolves({
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
    } as User);
  });

  after(() => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('validação com sucesso', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNjU0MTMwMzE2fQ.umKAU56NT5G-GcXtAa2e_eM0P_nsbp5AWURoPFASAXg',
      );
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    
  });
});
