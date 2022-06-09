import * as sinon from 'sinon';
import * as chai from 'chai';
import 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';
import Matche from '../database/models/matche';

import { Response } from 'superagent';
import { mockTeam, mockTeams } from './mocks/teamsMock';
import { matchesMock } from './mocks/matcheMock';
import { leaderboardMock } from './mocks/mockLeaderbord';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderbord Rota', () => {
  describe('teste da rota /leaderboard/home', () => {
    let chaiHttpResponse: Response;
    describe('testa se retorna os dados da classificação', () => {
      before(async () => {
        sinon.stub(Team, 'findAll').resolves(mockTeams as Team[]);
        sinon.stub(Matche, 'findAll').resolves(matchesMock as unknown as Matche[]);
      });

      after(() => {
        (Team.findAll as sinon.SinonStub).restore();
        (Matche.findAll as sinon.SinonStub).restore();
      });

      it('retorna um array com obejotos com todas as prorpiedades', async () => {
        chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
        
        expect(chaiHttpResponse.status).to.be.equal(200);
        for (let index = 0; index < leaderboardMock.length; index += 1) {
          expect(chaiHttpResponse.body[index]).to.have.property('name');
          expect(chaiHttpResponse.body[index]).to.have.property('totalPoints');
          expect(chaiHttpResponse.body[index]).to.have.property('totalGames');
          expect(chaiHttpResponse.body[index]).to.have.property('totalVictories');
          expect(chaiHttpResponse.body[index]).to.have.property('totalDraws');
          expect(chaiHttpResponse.body[index]).to.have.property('totalLosses');
          expect(chaiHttpResponse.body[index]).to.have.property('goalsFavor');
          expect(chaiHttpResponse.body[index]).to.have.property('goalsOwn');
          expect(chaiHttpResponse.body[index]).to.have.property('goalsBalance');
          expect(chaiHttpResponse.body[index]).to.have.property('efficiency');
        }
      });

      it('retorna um array com obejotos com todas as prorpiedades', async () => {
        chaiHttpResponse = await chai.request(app).get('/leaderboard/away');

        expect(chaiHttpResponse.status).to.be.equal(200);
        for (let index = 0; index < leaderboardMock.length; index += 1) {
          expect(chaiHttpResponse.body[index]).to.have.property('name');
          expect(chaiHttpResponse.body[index]).to.have.property('totalPoints');
          expect(chaiHttpResponse.body[index]).to.have.property('totalGames');
          expect(chaiHttpResponse.body[index]).to.have.property('totalVictories');
          expect(chaiHttpResponse.body[index]).to.have.property('totalDraws');
          expect(chaiHttpResponse.body[index]).to.have.property('totalLosses');
          expect(chaiHttpResponse.body[index]).to.have.property('goalsFavor');
          expect(chaiHttpResponse.body[index]).to.have.property('goalsOwn');
          expect(chaiHttpResponse.body[index]).to.have.property('goalsBalance');
          expect(chaiHttpResponse.body[index]).to.have.property('efficiency');
        }
      });

      it('retorna um array com obejotos com todas as prorpiedades', async () => {
        chaiHttpResponse = await chai.request(app).get('/leaderboard');

        expect(chaiHttpResponse.status).to.be.equal(200);
        for (let index = 0; index < leaderboardMock.length; index += 1) {
          expect(chaiHttpResponse.body[index]).to.have.property('name');
          expect(chaiHttpResponse.body[index]).to.have.property('totalPoints');
          expect(chaiHttpResponse.body[index]).to.have.property('totalGames');
          expect(chaiHttpResponse.body[index]).to.have.property('totalVictories');
          expect(chaiHttpResponse.body[index]).to.have.property('totalDraws');
          expect(chaiHttpResponse.body[index]).to.have.property('totalLosses');
          expect(chaiHttpResponse.body[index]).to.have.property('goalsFavor');
          expect(chaiHttpResponse.body[index]).to.have.property('goalsOwn');
          expect(chaiHttpResponse.body[index]).to.have.property('goalsBalance');
          expect(chaiHttpResponse.body[index]).to.have.property('efficiency');
        }
      });
    });
  });
});
