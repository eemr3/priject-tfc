import { Request, Response, NextFunction } from 'express';
import Login from '../services/Login.service';
import Token from '../auth/token';

interface IToken {
  user: {
    id: number;
    username: string;
    role: string;
    email: string;
  };
  iat: number;
}

class AuthMiddleware {
  private _decodedToken = new Token();
  private _service = new Login();

  async validate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const token = authorization;

    if (!token) return res.status(404).json({ message: 'Token not found' });

    const decoded = this._decodedToken.decoderToken(token);

    if (!decoded) res.status(401).json({ message: 'Invalid token' });
    const { user: { id } } = decoded as IToken;

    const loginAuth = await this._service.validateLogin(id);

    if (!loginAuth) return res.status(400).json({ message: 'User not found' });

    req.body = loginAuth;

    next();
  }
}

export default AuthMiddleware;
