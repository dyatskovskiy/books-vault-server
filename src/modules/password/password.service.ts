import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
    console.log(salt);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);

    return hash;
  }

  async validatePassword(candidate: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(candidate, hash);

    return isValid;
  }
}
