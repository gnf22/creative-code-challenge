import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '../repositories/IUsersRepository';

import { User } from '../infra/typeorm/entities/User';

interface IRequest {
  id: string;
}

@injectable()
export class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {
    /** */
  }

  public async execute({ id }: IRequest): Promise<User[]> {
    const user = this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('You are not authenticated.', 404);
    }

    const users = await this.usersRepository.listAllUsers();

    return users;
  }
}
