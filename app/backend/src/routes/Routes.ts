import * as express from 'express';
import AuthMiddleware from '../middleware/authMiddleware';
import ValidateJoi from '../middleware/validateJoiSchemas';
import JoiSchemas from '../schemas/joiSchemas';
import LoginController from '../controllers/Login.controller';
import TeamController from '../controllers/Team.controller';

class Routes {
  private _controllerLogin = new LoginController();
  private _controllerTeams = new TeamController();
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
}

export default Routes;
