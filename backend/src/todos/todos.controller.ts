import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post(':userId')
  create(
    @Body() createTodoDto: CreateTodoDto,
    @Param('userId') userId: number,
  ) {
    return this.todosService.create(createTodoDto, userId);
  }

  @Get('/all/:userId')
  findAll(@Param('userId') userId: number) {
    return this.todosService.findAll(userId);
  }

  @Get('/notcompleted/:userId')
  findAllNotCompleted(@Param('userId') userId: number) {
    return this.todosService.findAllNotCompleted(userId);
  }

  @Get('/completed/:userId')
  findAllCompleted(@Param('userId') userId: number) {
    return this.todosService.findAllCompleted(userId);
  }

  @Patch('/markcomplete/:id')
  complete(@Param('id') id: number) {
    return this.todosService.complete(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todosService.remove(+id);
  }
}
