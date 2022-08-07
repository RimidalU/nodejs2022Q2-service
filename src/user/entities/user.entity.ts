import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt'

export class User {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  public hashedRefreshToken?: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

}
