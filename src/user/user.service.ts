import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getOne(
    id: string,
  ): Promise<Omit<UserEntity, 'password' | 'toResponse'>> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (user) {
      const userOutput = {
        id: user.id,
        version: user.version,
        login: user.login,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      return userOutput;
    }
    throw new NotFoundException(`User with id = ${id} was not found`);
  }

  async getAll(): Promise<Omit<UserEntity, 'password' | 'toResponse'>[]> {
    const users = await this.userRepository.find();
    return users.map((user) => user);
  }

  async create(
    userDto: CreateUserDto,
  ): Promise<Omit<UserEntity, 'password' | 'toResponse'>> {
    await this.isLoginExists(userDto.login);

    const version = 1;
    const createdAt = +Date.now();
    const updatedAt = +Date.now();

    const userOutput = {
      version,
      login: userDto.login,
      createdAt,
      updatedAt,
    };
    const createdUser = this.userRepository.create(userOutput);
    return await (await this.userRepository.save(createdUser)).toResponse();
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    }
  }

  async update(
    id: string,
    userDto: UpdatePasswordDto,
  ): Promise<Omit<UserEntity, 'password' | 'toResponse'>> {
    const currentUser = await this.userRepository.findOne({ where: { id } });
    if (!currentUser) {
      throw new NotFoundException(`User with id = ${id} was not found`);
    }
    if (currentUser.password !== userDto.oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }
    const userOutput = {
      id,
      version: currentUser.version + 1,
      login: currentUser.login,
      createdAt: +currentUser.createdAt,
      updatedAt: +Date.now(),
    };
    const udatedUser = { ...userOutput, password: userDto.newPassword };
    return (
      await this.userRepository.save(this.userRepository.create(udatedUser))
    ).toResponse();
  }

  async findbyLogin(login: string) {
    const user = await this.userRepository.findOne({ where: { login } });
    if (user) return user;
  }

  async isLoginExists(login: string) {
    const user = await this.findbyLogin(login);
    if (user)
      throw new BadRequestException(`User with login = ${login} alredy exist`);
  }
}
