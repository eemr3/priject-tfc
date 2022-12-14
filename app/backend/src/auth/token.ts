import { sign, verify } from 'jsonwebtoken';
import { readFileSync } from 'fs';

class Token {
  private secretKey: string;
  private token: string;

  createToken(user: object | null) {
    this.secretKey = readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
    this.token = sign({ user }, this.secretKey, {
      expiresIn: '15d',
      algorithm: 'HS256',
    });
    return this.token;
  }

  decoderToken(token: string) {
    try {
      this.secretKey = readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });
      const decoder = verify(token, this.secretKey);
      return decoder;
    } catch (error) {
      return false;
    }
  }
}

export default Token;
