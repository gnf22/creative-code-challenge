import { getRepository, Repository } from 'typeorm';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

import { User } from '../entities/User';

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async listAllUsers(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { id } });

    return user;
  }

  public async create({
    name,
    telephone,
    email,
    age,
    weight,
    ethnicity,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      telephone,
      email,
      age,
      weight,
      ethnicity,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async remove(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }
}
