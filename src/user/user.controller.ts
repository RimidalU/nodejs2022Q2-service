import { UserEntity } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getaAll(): Promise<Omit<UserEntity, 'password' | 'toResponse'>[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getaOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Omit<UserEntity, 'password' | 'toResponse'>> {
    return await this.userService.getOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<UserEntity, 'password' | 'toResponse'>> {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ): Promise<Omit<UserEntity, 'password' | 'toResponse'>> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return await this.userService.delete(id);
  }
}
