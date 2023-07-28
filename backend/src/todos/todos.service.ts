import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    private userService: UsersService,
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number): Promise<Todo> {
    let todo: Todo = new Todo();
    todo.user = await this.userService.findUserById(userId);
    todo.title = createTodoDto.title;
    todo.completed = false;
    return this.todoRepository.save(todo);
  }

  findAll(userId: number) {
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId } },
    });
  }

  findAllNotCompleted(userId: number) {
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });
  }

  findAllCompleted(userId: number) {
    return this.todoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
  }

  remove(id: number) {
    return this.todoRepository.delete(id);
  }

  complete(id: number) {
    return this.todoRepository.update(id, {
      completed: true,
    });
  }
}
