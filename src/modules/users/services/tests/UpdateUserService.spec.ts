import { EthnicityRole } from '@modules/users/infra/typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';
import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository';
import { UpdateUserService } from '../UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let updateUser: UpdateUserService;

describe('RemoveUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    updateUser = new UpdateUserService(fakeUsersRepository);
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

    const newUser = await updateUser.execute({
      name: 'Henrique',
      age: 20,
      email: 'test@test.com',
      telephone: '123123',
      ethnicity: EthnicityRole.BRANCO,
      weight: 1.7,
      id: user.id,
    });

    expect(newUser.name).toBe('Henrique');
  });

  it('should not be able to update a user from a non-existing user', async () => {
    await expect(
      updateUser.execute({
        name: 'Henrique',
        age: 20,
        email: 'test@test.com',
        telephone: '123123',
        ethnicity: EthnicityRole.BRANCO,
        weight: 1.7,
        id: 'ok1ko12-ik21i',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a user using a email already in use.', async () => {
    await fakeUsersRepository.create({
      name: 'Henrique',
      age: 20,
      email: 'test@test.com',
      telephone: '123123',
      ethnicity: EthnicityRole.BRANCO,
      weight: 1.7,
    });

    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      age: 20,
      email: 'gust@test.com',
      telephone: '123123',
      ethnicity: EthnicityRole.BRANCO,
      weight: 1.7,
    });

    await expect(
      updateUser.execute({
        name: 'Gustavo',
        age: 20,
        email: 'test@test.com',
        telephone: '123123',
        ethnicity: EthnicityRole.BRANCO,
        weight: 1.7,
        id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
