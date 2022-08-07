import { UserService } from './../user/user.service'
import { UserModule } from './../user/user.module'
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}
