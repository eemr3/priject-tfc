import CustonError from '../utils/errroF';
import User from '../database/models/user';

class Login {
  private user: object | null;

  async getLogin(email: string, password : string) {
    this.user = await User.findOne({
      where: { email, password },
      attributes: { exclude: ['password'] },
    });
    if (!this.user) {
      throw new CustonError(401, 'Incorrect email or password');
    }
    return this.user;
  }
}

export default Login;
