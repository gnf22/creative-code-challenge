import { EthnicityRole } from '@modules/users/infra/typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';
import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository';
import { ListUsersService } from '../ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listUsers: ListUsersService;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listUsers = new ListUsersService(fakeUsersRepository);
  });

  it('should be able to list all users', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      age: 20,
      email: 'test@test.com',
      telephone: '123123',
      ethnicity: EthnicityRole.BRANCO,
      weight: 1.7,
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Gustavo2',
      age: 20,
      email: 'test2@test.com',
      telephone: '123123',
      ethnicity: EthnicityRole.BRANCO,
      weight: 1.7,
    });

    const users = await listUsers.execute({
      id: user.id,
    });

    expect(users).toEqual([user, user2]);
  });

  it('should not be able to list all users from a non-existing user', async () => {
    await expect(
      listUsers.execute({
        id: 'test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
