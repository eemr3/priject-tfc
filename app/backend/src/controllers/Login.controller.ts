import { Request, Response } from 'express';
import CustonError from '../utils/errroF';
import Login from '../services/Login.service';

class LoginController {
  private _service = new Login();

  async loginApp(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await this._service.getLogin(email, password);

      return res.status(200).json(user);
    } catch (error) {
      res.status((error as CustonError).status).json({ message: (error as Error).message });
    }
  }
}

export default LoginController;
