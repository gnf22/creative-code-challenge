import { EthnicityRole } from '@modules/users/infra/typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';
import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository';
import { RemoveUserService } from '../RemoveUserService';

let fakeUsersRepository: FakeUsersRepository;
let removeUser: RemoveUserService;

describe('RemoveUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    removeUser = new RemoveUserService(fakeUsersRepository);
  });

  it('should be able to remove a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      age: 20,
      email: 'test@test.com',
      telephone: '123123',
      ethnicity: EthnicityRole.BRANCO,
      weight: 1.7,
    });

    await removeUser.execute({
      id: user.id,
    });

    const users = await fakeUsersRepository.listAllUsers();

    expect(users).toEqual([]);
  });

  it('should not be able to remove a user from a non-existing user', async () => {
    await expect(
      removeUser.execute({
        id: 'ok1ko12-ik21i',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
