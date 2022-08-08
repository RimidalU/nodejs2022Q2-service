import  inMemoryDbService  from 'src/in-memory-db/in-memory-db.service'
import { IUser } from './../user/user.interface'
import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from "./jwt-payload.interface"
// import { UserRepository } from "./repository/user.repository";
// import { AuthService } from "./auth.service"
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  private readonly users: IUser[]
  constructor(
        // private authService: AuthService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
            secretOrKey: process.env.JWT_SECRET_REFRESH_KEY || 'refreshSecret123123'
        })
        this.users = inMemoryDbService.users
    }

    async validate(payload: JwtPayload) {
        const { login } = payload
        const currentUser = await this.users.find((user) => user.id === login)

        if (!currentUser) {
            throw new UnauthorizedException(`${currentUser} does not exist`)
        }
        return currentUser
    }
}