import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  // describe groups multiple test cases together. tests related to the UsersController.
  let controller: UsersController;
  const mockUsersService = {
    createUser: jest.fn(dto => {
      return {
        id: 1,
        ...dto
      };
    })
  };

  beforeEach(async () => {
    //beforeEach runs before each test case. creates an isolated NestJS runtime
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should create a new user', async () => {  //test cases
    const newUser = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password',
    };

    const createdUser = {
      id: 1,
      ...newUser,
    };

    const result = await controller.createNewUser(newUser);
    expect(result).toEqual(createdUser);
  });
});
