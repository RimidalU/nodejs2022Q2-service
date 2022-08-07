import { CreateUserDto } from './../user/dto/create-user.dto'
import { AuthService } from './auth.service'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { Public } from './auth.decorators'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto)
  }

  @Public()
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    return this.authService.login(createUserDto)
  }


  // @Post('refresh')
  // async refresh()

}
