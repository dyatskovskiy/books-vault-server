import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(+process.env.BCRYPT_SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  async validatePassword(candidate: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(candidate, hash);

    return isValid;
  }
}
