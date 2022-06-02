import * as express from 'express';
import AuthMiddleware from '../middleware/authMiddleware';
import ValidateJoi from '../middleware/validateJoiSchemas';
import JoiSchemas from '../schemas/joiSchemas';
import LoginController from '../controllers/Login.controller';

class Routes {
  private _controller = new LoginController();
  private _joiSchemas = new JoiSchemas();
  private _validate = new ValidateJoi();
  private _auth = new AuthMiddleware();

  login(app: express.Application) {
    app.post(
      '/login',
      (req, res, next) => this._validate.validate(req, res, next, this._joiSchemas.login),
      (req, res) => this._controller.loginApp(req, res),
    );
    app.get(
      '/login/validate',
      (req, res, next) => this._auth.validate(req, res, next),
      (req, res) => this._controller.validateLogin(req, res),
    );
  }
}

export default Routes;
