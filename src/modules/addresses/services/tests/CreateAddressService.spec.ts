import { EthnicityRole } from '@modules/users/infra/typeorm/entities/User';
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { FakeAddressesRepository } from '../../repositories/fakes/FakeAddressesRepository';
import { CreateAddressService } from '../CreateAddressService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAddressesRepository: FakeAddressesRepository;
let createAddress: CreateAddressService;

describe('CreateAddress', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAddressesRepository = new FakeAddressesRepository();
    createAddress = new CreateAddressService(
      fakeAddressesRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create a new address', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      age: 20,
      email: 'test@test.com',
      telephone: '123123',
      ethnicity: EthnicityRole.BRANCO,
      weight: 1.7,
    });

    const address = await createAddress.execute({
      cep: '04870060',
      number: 777,
      id: user.id,
    });

    expect(address).toHaveProperty('id');
    expect(address.number).toBe(777);
  });

  it('should not be able to create a new address with a cep different than 8', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      age: 20,
      email: 'test@test.com',
      telephone: '123123',
      ethnicity: EthnicityRole.BRANCO,
      weight: 1.7,
    });

    await expect(
      createAddress.execute({
        cep: '123',
        number: 777,
        id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new address with a invalid cep', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      age: 20,
      email: 'test@test.com',
      telephone: '123123',
      ethnicity: EthnicityRole.BRANCO,
      weight: 1.7,
    });

    await expect(
      createAddress.execute({
        cep: '04843431',
        number: 777,
        id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new address from a non existing user.', async () => {
    await expect(
      createAddress.execute({
        cep: '04870060',
        number: 777,
        id: 'non-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
