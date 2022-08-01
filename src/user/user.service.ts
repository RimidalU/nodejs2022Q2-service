import { CreateUserDto } from './dto/create-user.dto'
import { UpdatePasswordDto } from './dto/update-password.dto'
import { IUser } from './user.interface'
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { v4, validate } from 'uuid'
import inMemoryDbService from 'src/in-memory-db/in-memory-db.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'
import { timeStamp } from 'console'
@Injectable()
export class UserService {
  // private readonly users: IUser[]
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    // this.users = inMemoryDbService.users;
  }

  async getOne(id: string): Promise<Omit<UserEntity, 'password' | 'toResponse'>> {

    const user = await this.userRepository.findOne({ where: { id: id } })
    if (user) return user.toResponse()
    throw new NotFoundException(`User with id = ${id} was not found`)

    // if (!validate(id)) {
    //   throw new BadRequestException();
    // }
    // const currentUser = await this.users.find((user) => user.id === id);
    // if (!currentUser) {
    //   throw new NotFoundException();
    // }
    // const userOutput = {
    //   id: currentUser.id,
    //   version: currentUser.version,
    //   login: currentUser.login,
    //   createdAt: currentUser.createdAt,
    //   updatedAt: currentUser.updatedAt,
    // };
    // return userOutput;
  }

  async getAll(): Promise<Omit<UserEntity, 'password' | 'toResponse'>[]> {
    const users = await this.userRepository.find()
    return users.map((user) => user.toResponse())
  }

  async create(userDto: CreateUserDto): Promise<Omit<UserEntity, 'password' | 'toResponse'>> {

    await this.isLoginExists(userDto.login)

    const version = 1
    const createdAt = Number(Date.now())
    const updatedAt = Number(Date.now())

    const userOutput = {
      // id: v4(),
      version,
      login: userDto.login,
      createdAt,
      updatedAt,
    }
    const createdUser = this.userRepository.create(userOutput)
    return (await (await this.userRepository.save(createdUser)).toResponse())
    // await this.users.push({ ...userOutput, password: userDto.password });
    // return userOutput;
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`User with id = ${id} was not found`)
    }

    // if (!validate(id)) {
    //   throw new BadRequestException();
    // }
    // const currentUser = await this.users.find((user) => user.id === id);
    // if (!currentUser) {
    //   throw new NotFoundException();
    // }

    // const index = await this.users.findIndex((user) => user.id === id);
    // this.users.splice(index, 1);
  }

  async update(id: string, userDto: UpdatePasswordDto): Promise<Omit<UserEntity, 'password' | 'toResponse'>> {
    // if (!validate(id)) {
    //   throw new BadRequestException();
    // }
    const currentUser = await this.userRepository.findOne({ where: { id } })

    // const currentUser = await this.users.find((user) => user.id === id);
    if (!currentUser) {
      throw new NotFoundException(`User with id = ${id} was not found`)
    }

    // const index = await this.users.findIndex((user) => user.id === id)

    if (currentUser.password !== userDto.oldPassword) {
      throw new ForbiddenException('Old password is wrong')
    }

    const userOutput = {
      id,
      version: currentUser.version + 1,
      login: currentUser.login,
      createdAt: currentUser.createdAt,
      updatedAt: Number(Date.now()),
    }

    // this.users[index] = { ...userOutput, password: userDto.newPassword };
    // return userOutput;
    const udatedUser = { ...userOutput, password: userDto.newPassword }

    return (
      await this.userRepository.save(
        this.userRepository.create(udatedUser),
      )
    ).toResponse()
  }
  async findbyLogin(login: string){
    const user = await this.userRepository.findOne({where: {login}})
    if (user) return user
  }

  async isLoginExists(login: string) {
    const user = await this.findbyLogin(login)
    if (user)
      throw new BadRequestException(
        `User with login = ${login} alredy exist`)

  }
}
