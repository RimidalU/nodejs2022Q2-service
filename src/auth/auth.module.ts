import { UserService } from './../user/user.service'
import { UserModule } from './../user/user.module'
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt-strategy'
import { JwtRefreshStrategy } from './jwt-refresh.strategy'

@Module({
  imports: [UserModule,
    PassportModule.register({}),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy, JwtRefreshStrategy]
})
export class AuthModule {}
