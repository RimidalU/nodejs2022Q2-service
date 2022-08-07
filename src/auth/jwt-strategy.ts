import {  Injectable, UnauthorizedException, forwardRef } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { IUser } from './../user/user.interface'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './jwt-payload.interface'
import inMemoryDbService from 'src/in-memory-db/in-memory-db.service'
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly users: IUser[]
  constructor() {
    super(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_KEY || 'secret123123',
        ignoreExpiration: false,
      })
    this.users = inMemoryDbService.users
  }

  async validate(payload: JwtPayload): Promise<IUser> {
    const { login } = payload
    const currentUser = await this.users.find((user) => user.id === login)

    if (!currentUser) {
      throw new UnauthorizedException()
    }
    return currentUser
  }
}