import { RefreshTokenDto } from './dto/refresh-token.dto'
import { CreateUserDto } from './../user/dto/create-user.dto'
import { AuthService } from './auth.service'
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { Public } from './auth.decorators'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto)
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() createUserDto: CreateUserDto): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.login(createUserDto)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Body() token: RefreshTokenDto) {
    return this.authService.checkUserToken(token)
  }
}
