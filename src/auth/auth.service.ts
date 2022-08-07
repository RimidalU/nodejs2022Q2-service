import { RefreshTokenDto } from './dto/refresh-token.dto'
import inMemoryDbService from 'src/in-memory-db/in-memory-db.service'
import { IUser } from './../user/user.interface'
import { CreateUserDto } from './../user/dto/create-user.dto'
import { UserService } from './../user/user.service'
import { Inject, Injectable, forwardRef, ForbiddenException, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import jwt_decode from 'jwt-decode';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  private users: IUser[]
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {
    this.users = inMemoryDbService.users
  }

  async signUp(createUserDto: CreateUserDto) {
    await this.userService.create(createUserDto)
  }

  async login(createUserDto: CreateUserDto): Promise<{ accessToken: string; refreshToken: string }> {
    const { login, password } = createUserDto
    const user = await this.users.find(((user) => user.login === login))

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { login, userId: user.id }
      const accessToken: string = await this.getAccessToken(payload);
      const refreshToken: string = await this.getRefreshToken(payload);

      await this.getUpdateRefreshToken(refreshToken, login);
      return { accessToken, refreshToken  }
    } else {
      throw new ForbiddenException('Wrong login or password!')
    }
  }

  async getAccessToken(payload: JwtPayload) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY || 'secret123123',
      expiresIn: +process.env.TOKEN_EXPIRE_TIME || 3600,
    });

    return accessToken;
  }

  async getRefreshToken(payload: JwtPayload) {
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY || 'refreshSecret123123',
      expiresIn: +process.env.TOKEN_REFRESH_EXPIRE_TIME || 86400,
    });

    return refreshToken;
  }

  async getUpdateRefreshToken(refreshToken: string, login: string) {
    if (refreshToken) {
      const saltForHash = await bcrypt.genSalt();
      refreshToken = await bcrypt.hash(refreshToken, saltForHash);
    }
    const currentUser = await this.users.find(((user) => user.login === login))
    currentUser.hashedRefreshToken = refreshToken;
    console.log(currentUser);

    await this.users.push(currentUser);
  }

  async checkUserToken(token: RefreshTokenDto) {

    const currentUser = await this.getUser(
    token.refreshToken,
  )

  if (currentUser) {
    const payload = {
      login: currentUser.login,
      userId: currentUser.id,
    }
    const refreshToken = await this.getRefreshToken(payload);
    await this.getUpdateRefreshToken(refreshToken, payload.login);
    return {
      accessToken: await this.getAccessToken(payload),
      refreshToken: refreshToken,
    }
  } else {
    return null;
  }
}

  async getUser(refreshToken: string) {
    const jwtDecode: JwtPayload = jwt_decode(refreshToken)
    const currentUser: IUser = await this.users.find(((user) => user.login === jwtDecode.login))

    const checkRefreshToken = await bcrypt.compare(
      refreshToken,
      currentUser.hashedRefreshToken,
    );
console.log(checkRefreshToken);

    if (checkRefreshToken) {
      await this.getUpdateRefreshToken(null, jwtDecode.login);
      return currentUser;
    } else {
      throw new UnauthorizedException('Unauthorized!');
    }
  }

}
