import { Request, Response } from 'express';
import CustonError from '../utils/errorBase';
import Login from '../services/Login.service';

class LoginController {
  private _service = new Login();
  private _role: object;

  async loginApp(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await this._service.getLogin(email, password);

      return res.status(200).json(user);
    } catch (error) {
      res.status((error as CustonError).status).json({ message: (error as Error).message });
    }
  }

  validateLogin(req: Request, res: Response) {
    try {
      this._role = req.body;
      return res.status(200).send(this._role);
    } catch (error) {
      console.log(error);
    }
  }
}

export default LoginController;
