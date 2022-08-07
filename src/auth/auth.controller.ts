import { CreateUserDto } from './../user/dto/create-user.dto'
import { AuthService } from './auth.service'
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService){}

@Get ()
async test() {
return this.authService.test()
}

@Post ('signup')
async signUp(@Body() createUserDto: CreateUserDto) {
return this.authService.signUp(createUserDto)
}

@Post('login')
async login(@Body() createUserDto: CreateUserDto): Promise<string> {
  return this.authService.login(createUserDto);
}


// @Post('refresh')
// async refresh()

}
