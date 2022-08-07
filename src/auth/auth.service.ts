import inMemoryDbService from 'src/in-memory-db/in-memory-db.service'
import { IUser } from './../user/user.interface'
import { CreateUserDto } from './../user/dto/create-user.dto'
import { UserService } from './../user/user.service'
import { Inject, Injectable, forwardRef, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private users: IUser[]
constructor(
  @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ){
  this.users = inMemoryDbService.users
}

async test() {
  return `AuthService worked!!!`
}

async signUp(createUserDto: CreateUserDto) {
  await this.userService.create(createUserDto)
}

async login(createUserDto: CreateUserDto): Promise<string> {
  const { login, password } = createUserDto;
  const user = await this.users.find(((user) => user.login === login))
  console.log(user);

  if (user && (await bcrypt.compare(password, user.password))) {
    return 'success';
  } else {
    throw new UnauthorizedException('Wrong login or password!');
  }
}

}
