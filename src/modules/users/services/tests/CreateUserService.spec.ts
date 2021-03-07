import { EthnicityRole } from '@modules/users/infra/typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';
import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository';
import { CreateUserService } from '../CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Gustavo',
      age: 20,
      email: 'test@test.com',
      telephone: '123123',
      ethnicity: EthnicityRole.BRANCO,
      weight: 1.7,
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Gustavo');
  });

  it('should not be able to create a user with a email already in use', async () => {
    await createUser.execute({
      name: 'Gustavo',
      age: 20,
      email: 'test@test.com',
      telephone: '123123',
      ethnicity: EthnicityRole.BRANCO,
      weight: 1.7,
    });

    await expect(
      createUser.execute({
        name: 'Gustavo',
        age: 20,
        email: 'test@test.com',
        telephone: '123123',
        ethnicity: EthnicityRole.BRANCO,
        weight: 1.7,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
