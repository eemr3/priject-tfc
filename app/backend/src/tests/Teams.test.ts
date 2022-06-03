import * as sinon from 'sinon';
import * as chai from 'chai';
import 'mocha';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';

import { Response } from 'superagent';
import { mockTeam, mockTeams } from './mocks/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams Rota', () => {
  describe('teste da rota /teams', () => {
    let chaiHttpResponse: Response;
    describe('testa se retorna todos os times', () => {
      before(async () => {
        sinon.stub(Team, 'findAll').resolves(mockTeams as Team[]);
      });

      after(() => {
        (Team.findAll as sinon.SinonStub).restore();
      });

      it('retorna um array com obejotos com propriedades "id" e "teamName"', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams');

        expect(chaiHttpResponse.status).to.be.equal(200);
        for (let index = 0; index < mockTeams.length; index++) {
          expect(chaiHttpResponse.body[index]).to.have.property('id');
          expect(chaiHttpResponse.body[index]).to.have.property('teamName');
        }
      });
    });

    describe('teste da rota /teams/:id', () => {
      before(async () => {
        sinon.stub(Team, 'findOne').resolves(mockTeam as Team);
      });

      after(() => {
        (Team.findOne as sinon.SinonStub).restore();
      });

      it('retorna um objeto com as propriedades "id" e "teamNome"', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams/1');

        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.have.property('id');
        expect(chaiHttpResponse.body).to.have.property('teamName');

      });
    });
  });
});
