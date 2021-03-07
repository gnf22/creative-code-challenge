import { FakeMailProvider } from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';

import { EthnicityRole } from '@modules/users/infra/typeorm/entities/User';
import { AppError } from '@shared/errors/AppError';
import { AuthenticateUserService } from '../AuthenticateUserService';

let fakeMailProvider: FakeMailProvider;

let fakeUsersRepository: FakeUsersRepository;

let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();

    fakeUsersRepository = new FakeUsersRepository();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeMailProvider,
    );
  });

  it('should be able to authenticate user', async () => {
    const mail = jest.spyOn(fakeMailProvider, 'sendMail');

    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      age: 20,
      email: 'test@test.com',
      telephone: '123123',
      ethnicity: EthnicityRole.BRANCO,
      weight: 1.7,
    });

    await authenticateUser.execute({
      email: user.email,
    });

    expect(mail).toHaveBeenCalled();
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'gust@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
