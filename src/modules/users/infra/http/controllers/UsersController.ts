import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { CreateUserService } from '@modules/users/services/CreateUserService';
import { ListUsersService } from '@modules/users/services/ListUsersService';
import { RemoveUserService } from '@modules/users/services/RemoveUserService';

export class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, telephone, email, age, weight, ethnicity } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      telephone,
      email,
      age,
      weight,
      ethnicity,
    });

    return response.json(user);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute();

    return response.json(users);
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const removeUser = container.resolve(RemoveUserService);

    await removeUser.execute({
      id,
    });

    return response.send(200);
  }
}
