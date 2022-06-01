import { Request, Response } from 'express';
import CustonError from '../utils/errroF';
import Token from '../auth/token';
import Login from '../services/Login.service';

class LoginController {
  private _service = new Login();
  private _token = new Token();

  async loginApp(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await this._service.getLogin(email, password);
      const token = this._token.createToken(user);

      return res.status(200).json({ user, token });
    } catch (error) {
      res.status((error as CustonError).status).json({ message: error });
    }
  }
}

export default LoginController;
