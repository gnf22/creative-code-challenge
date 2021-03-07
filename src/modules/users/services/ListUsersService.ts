import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRepository';

import { User } from '../infra/typeorm/entities/User';

@injectable()
export class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {
    /** */
  }

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.listAllUsers();

    return users;
  }
}
