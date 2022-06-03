import { compare } from 'bcryptjs';
import Token from '../auth/token';
import BaseError from '../utils/errorBase';
import User from '../database/models/user';
import TUser from './types/type.login';

class Login {
  private user: TUser | null;
  private _token = new Token();

  async getLogin(userEmail: string, password: string) {
    this.user = await User.findOne({ where: { email: userEmail } });

    if (!this.user) throw new BaseError(401, 'Incorrect email or password');

    const psdCompare = await compare(password, this.user.password);

    if (!psdCompare) {
      throw new BaseError(401, 'Incorrect email or password');
    }

    const { id, username, email, role } = this.user;

    const token = this._token.createToken({ id, username, role, email });
    return { user: {
      id,
      username,
      role,
      email,
    },
    token,
    };
  }

  async validateLogin(id:number) {
    this.user = await User.findOne({ where: { id } });
    if (!this.user) throw new BaseError(400, 'User not found');

    return this.user.role;
  }
}

export default Login;
