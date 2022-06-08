import * as express from 'express';
import AuthMiddleware from '../middleware/authMiddleware';
import ValidateJoi from '../middleware/validateJoiSchemas';
import JoiSchemas from '../schemas/joiSchemas';
import LoginController from '../controllers/Login.controller';
import TeamController from '../controllers/Team.controller';
import MatcheController from '../controllers/Matche.controller';
import MatchesMeddleware from '../middleware/matchesMeddleware';
import Leaderboard from '../controllers/Leaderboard.controller';

class Routes {
  private _controllerLogin = new LoginController();
  private _controllerTeams = new TeamController();
  private _controllerMatches = new MatcheController();
  private _matchesEqualTeams = new MatchesMeddleware();
  private _controllerLeaderboard = new Leaderboard();
  private _joiSchemas = new JoiSchemas();
  private _validate = new ValidateJoi();
  private _auth = new AuthMiddleware();

  login(app: express.Application) {
    app.post(
      '/login',
      (req, res, next) => this._validate.validate(req, res, next, this._joiSchemas.login),
      (req, res) => this._controllerLogin.loginApp(req, res),
    );

    app.get(
      '/login/validate',
      (req, res, next) => this._auth.validate(req, res, next),
      (req, res) => this._controllerLogin.validateLogin(req, res),
    );
  }

  teams(app: express.Application) {
    app.get('/teams/:id', (req, res) => this._controllerTeams.getById(req, res));
    app.get('/teams', (req, res) => this._controllerTeams.getAll(req, res));
  }

  matches(app: express.Application) {
    app.patch(
      '/matches/:id/finish',
      (req, res) => this._controllerMatches.updateInProgress(req, res),
    );
    app.patch('/matches/:id', (req, res) => this._controllerMatches.updateMathce(req, res));
    app.get('/matches', (req, res) => this._controllerMatches.getAll(req, res));
    app.post(
      '/matches',
      (req, res, next) => this._auth.validate(req, res, next),
      (req, res, next) => this._matchesEqualTeams.validateEqualTeams(req, res, next),
      (req, res) => this._controllerMatches.createMatche(req, res),
    );
  }

  leaderboard(app: express.Application) {
    app.get('/leaderboard/home', (req, res) => this._controllerLeaderboard.getAllHome(req, res));
    app.get('/leaderboard/away', (req, res) => this._controllerLeaderboard.getAllAway(req, res));
  }
}

export default Routes;
