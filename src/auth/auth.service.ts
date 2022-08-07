import inMemoryDbService from 'src/in-memory-db/in-memory-db.service'
import { IUser } from './../user/user.interface'
import { CreateUserDto } from './../user/dto/create-user.dto'
import { UserService } from './../user/user.service'
import { Inject, Injectable, forwardRef, ForbiddenException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

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

  async login(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const { login, password } = createUserDto
    const user = await this.users.find(((user) => user.login === login))

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { login, userId: user.id }
      const accessToken: string = await this.jwtService.signAsync(payload)

      return { accessToken }
    } else {
      throw new ForbiddenException('Wrong login or password!')
    }
  }

}
