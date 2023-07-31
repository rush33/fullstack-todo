import { Test } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

describe('TodosController', () => {
    let Controller: TodosController;
    let Service: TodosService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [TodosController],
            providers: [TodosService],
        }).compile();

        Service = module.get<TodosService>(TodosService);
        Controller = module.get<TodosController>(TodosController);
    });

    it('should create a new todo', async () => {
        const newTodo = {
            title: 'write testcases'
        }

        const createdTodo = {
            id: 1,
            completed: false,

        }
        const result = await Controller.create(newTodo);
    })
});