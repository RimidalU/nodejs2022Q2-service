import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { IUser } from './user.interface';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4, validate } from 'uuid';
import inMemoryDbService from 'src/in-memory-db/in-memory-db.service';

@Injectable()
export class UserService {
  private readonly users: IUser[];
  constructor() {
    this.users = inMemoryDbService.users;
  }

  async getOne(id: string): Promise<IUser> {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const currentUser = await this.users.find((user) => user.id === id);
    if (!currentUser) {
      throw new NotFoundException();
    }
    const userOutput = {
      id: currentUser.id,
      version: currentUser.version,
      login: currentUser.login,
      createdAt: currentUser.createdAt,
      updatedAt: currentUser.updatedAt,
    };
    return userOutput;
  }

  async getAll(): Promise<IUser[]> {
    return this.users;
  }

  async create(userDto: CreateUserDto): Promise<IUser> {
    const version = 1;
    const createdAt = Number(Date.now());
    const updatedAt = Number(Date.now());

    const userOutput = {
      id: v4(),
      version,
      login: userDto.login,
      createdAt,
      updatedAt,
    };

    await this.users.push({ ...userOutput, password: userDto.password });
    return userOutput;
  }

  async delete(id: string): Promise<void> {
    if (!validate(id)) {
      throw new BadRequestException();
    }
    const currentUser = await this.users.find((user) => user.id === id);
    if (!currentUser) {
      throw new NotFoundException();
    }

    const index = await this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
  }

  async update(id: string, userDto: UpdatePasswordDto): Promise<IUser> {
    if (!validate(id)) {
      throw new BadRequestException();
    }

    const currentUser = await this.users.find((user) => user.id === id);
    if (!currentUser) {
      throw new NotFoundException();
    }

    const index = await this.users.findIndex((user) => user.id === id);

    if (currentUser.password !== userDto.oldPassword) {
      throw new ForbiddenException();
    }

    const userOutput = {
      id,
      version: currentUser.version + 1,
      login: currentUser.login,
      createdAt: currentUser.createdAt,
      updatedAt: Number(Date.now()),
    };

    this.users[index] = { ...userOutput, password: userDto.newPassword };

    return userOutput;
  }
}
