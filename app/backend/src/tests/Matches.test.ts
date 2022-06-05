import * as sinon from 'sinon';
import * as chai from 'chai';
import 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matche from '../database/models/matche';

import { Response } from 'superagent';

import {
  matchesMock,
  matcheMockQueryTrue,
  matcheMockQueryFalse,
  createMock,
} from './mocks/matcheMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matche Rota', () => {
  describe('teste da rota /matches', () => {
    let chaiHttpResponse: Response;
    describe('testa se retorna todos os jogos', () => {
      before(async () => {
        sinon.stub(Matche, 'findAll').resolves(matchesMock as unknown as Matche[]);
      });

      after(() => {
        (Matche.findAll as sinon.SinonStub).restore();
      });

      it('retorna um array com obejotos com propriedades', async () => {
        chaiHttpResponse = await chai.request(app).get('/matches');

        expect(chaiHttpResponse.status).to.be.equal(200);
        for (let index = 0; index < matchesMock.length; index++) {
          expect(chaiHttpResponse.body[index]).to.have.property('id');
          expect(chaiHttpResponse.body[index]).to.have.property('homeTeam');
          expect(chaiHttpResponse.body[index]).to.have.property('homeTeamGoals');
          expect(chaiHttpResponse.body[index]).to.have.property('awayTeam');
          expect(chaiHttpResponse.body[index]).to.have.property('awayTeamGoals');
          expect(chaiHttpResponse.body[index]).to.have.property('inProgress');
          expect(chaiHttpResponse.body[index]).to.have.property('teamHome');
          expect(chaiHttpResponse.body[index].teamHome).to.not.have.property('id');
          expect(chaiHttpResponse.body[index].teamHome).to.have.property('teamName');
          expect(chaiHttpResponse.body[index]).to.have.property('teamAway');
          expect(chaiHttpResponse.body[index].teamAway).to.not.have.property('id');
          expect(chaiHttpResponse.body[index].teamAway).to.have.property('teamName');
        }
      });
    });

    describe('teste da rota /matches?inProgress=true', () => {
      before(async () => {
        sinon
          .stub(Matche, 'findAll')
          .resolves(matcheMockQueryTrue as unknown as Matche[]);
      });

      after(() => {
        (Matche.findAll as sinon.SinonStub).restore();
      });

      it('retorna todos os jogos em andamento"', async () => {
        chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
        expect(chaiHttpResponse.status).to.be.equal(200);
        for (let index = 0; index < matcheMockQueryTrue.length; index++) {
          expect(chaiHttpResponse.body[index].inProgress).to.deep.equal(true);
        }
      });
    });

    describe('teste da rota /matches?inProgress=false', () => {
      before(async () => {
        sinon
          .stub(Matche, 'findAll')
          .resolves(matcheMockQueryFalse as unknown as Matche[]);
      });

      after(() => {
        (Matche.findAll as sinon.SinonStub).restore();
      });

      it('retorna todos os jogos finalizados "false"', async () => {
        chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
        expect(chaiHttpResponse.status).to.be.equal(200);
        for (let index = 0; index < matcheMockQueryTrue.length; index++) {
          expect(chaiHttpResponse.body[index].inProgress).to.deep.equal(false);
        }
      });
    });

    describe('cadastrando um novo jogo', () => {
      before(async () => {
        sinon.stub(Matche, 'create').resolves(createMock as Matche);
      });

      after(() => {
        (Matche.create as sinon.SinonStub).restore();
      });

      it('cadastrando um novo jogo com sucesso', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/matches')
          .set(
            'authorization',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20ifSwiaWF0IjoxNjU0MzY5NzIyLCJleHAiOjE2NTU2NjU3MjJ9.QQ1ZObLEaElPxuF9cHPn_t0vXb_VyKFyBwo29lRVIGw',
          )
          .send({
            homeTeam: 16,
            awayTeam: 8,
            homeTeamGoals: 2,
            awayTeamGoals: 2,
            inProgress: true,
          });

        expect(chaiHttpResponse.status).to.be.equal(201);
        expect(chaiHttpResponse.body).to.have.property('id');
        expect(chaiHttpResponse.body).to.have.property('homeTeam');
        expect(chaiHttpResponse.body).to.have.property('awayTeam');
        expect(chaiHttpResponse.body).to.have.property('homeTeamGoals');
        expect(chaiHttpResponse.body).to.have.property('awayTeamGoals');
        expect(chaiHttpResponse.body).to.have.property('inProgress');
      });
    });

    describe('atualiza partidas', () => {
      before(async () => {
        sinon.stub(Matche, 'update').resolves();
      });

      after(() => {
        (Matche.update as sinon.SinonStub).restore();
      });

      it('testa rota update de inProgress /matches/:id/finish', async () => {
        chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');

        expect(chaiHttpResponse.status).to.be.equal(200);
      });

      it('resta rota update de match /matches/:id', async () => {
        chaiHttpResponse = await chai.request(app).patch('/matches/1').send({
          homeTeamGoals: 3,
          awayTeamGoals: 1,
        });
        
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body.message).to.be.equal('Match auterated successfully');
      });
    });
  });
});
