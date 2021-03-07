import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { EthnicityRole, User } from '../infra/typeorm/entities/User';

import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
  name: string;
  telephone: string;
  email: string;
  age: number;
  weight: number;
  ethnicity: EthnicityRole;
}

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {
    /** */
  }

  public async execute({
    id,
    name,
    telephone,
    email,
    age,
    weight,
    ethnicity,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User does not exists.', 404);
    }

    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists && emailExists.id !== user.id) {
      throw new AppError('Email already in use. Choose another!', 409);
    }

    Object.assign(user, { name, telephone, email, age, weight, ethnicity });

    return this.usersRepository.save(user);
  }
}
