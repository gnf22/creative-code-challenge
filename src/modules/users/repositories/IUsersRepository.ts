import { User } from '../infra/typeorm/entities/User';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

export interface IUsersRepository {
  listAllUsers(): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
}
