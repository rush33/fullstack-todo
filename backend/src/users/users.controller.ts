import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto'; 

@Controller('register')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Post()
  createNewUser(@Body() createUserDto: CreateUserDto) {
    const user = this.UsersService.createUser(createUserDto);
    return user
  }
}