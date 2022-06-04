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
  });
});
