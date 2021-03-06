import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUsersRepository';

import { EthnicityRole, User } from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  telephone: string;
  email: string;
  age: number;
  weight: number;
  ethnicity: EthnicityRole;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {
    /** */
  }

  public async execute({
    name,
    telephone,
    email,
    age,
    weight,
    ethnicity,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.create({
      name,
      telephone,
      email,
      age,
      weight,
      ethnicity,
    });

    return user;
  }
}
