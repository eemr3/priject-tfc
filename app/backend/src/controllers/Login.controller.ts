import { Request, Response } from 'express';
import CustonError from '../utils/errorBase';
import Login from '../services/Login.service';

interface RequestWithUserRole extends Request {
  data?: {
    id: number;
    username: string;
    role: string;
    email: string;
  };
}

class LoginController {
  private _service = new Login();
  private _user: string;

  async loginApp(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await this._service.getLogin(email, password);

      return res.status(200).json(user);
    } catch (error) {
      res
        .status((error as CustonError).status)
        .json({ message: (error as Error).message });
    }
  }

  validateLogin(req: RequestWithUserRole, res: Response) {
    try {
      this._user = 'oi';
      const userRole = req.data?.role;
      return res.status(200).send(userRole);
    } catch (error) {
      console.log(error);
    }
  }
}

export default LoginController;
