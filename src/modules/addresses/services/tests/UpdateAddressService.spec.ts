import { EthnicityRole } from '@modules/users/infra/typeorm/entities/User';
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { FakeAddressesRepository } from '../../repositories/fakes/FakeAddressesRepository';
import { UpdateAddressService } from '../UpdateAddressService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAddressesRepository: FakeAddressesRepository;
let updateAddress: UpdateAddressService;

describe('UpdateAddress', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAddressesRepository = new FakeAddressesRepository();
    updateAddress = new UpdateAddressService(fakeAddressesRepository);
  });

  it('should be able to update a address', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      age: 20,
      email: 'test@test.com',
      telephone: '123123',
      ethnicity: EthnicityRole.BRANCO,
      weight: 1.7,
    });

    const address = await fakeAddressesRepository.create({
      address: 'Praça da Sé',
      cep: '01001000',
      city: 'São Paulo',
      state: 'SP',
      number: 743,
      complement: 'lado ímpar',
      user_id: user.id,
    });

    const newAddress = await updateAddress.execute({
      cep: '04870060',
      number: 800,
      id: address.id,
    });

    expect(newAddress.number).toBe(800);
  });

  it('should not be able to update a address from a non-existing address', async () => {
    await expect(
      updateAddress.execute({
        cep: '04870060',
        number: 800,
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a address with a cep different than 8', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      age: 20,
      email: 'test@test.com',
      telephone: '123123',
      ethnicity: EthnicityRole.BRANCO,
      weight: 1.7,
    });

    const address = await fakeAddressesRepository.create({
      address: 'Praça da Sé',
      cep: '01001000',
      city: 'São Paulo',
      state: 'SP',
      number: 743,
      complement: 'lado ímpar',
      user_id: user.id,
    });

    await expect(
      updateAddress.execute({
        cep: '400',
        number: 800,
        id: address.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a address with a invalid cep', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      age: 20,
      email: 'test@test.com',
      telephone: '123123',
      ethnicity: EthnicityRole.BRANCO,
      weight: 1.7,
    });

    const address = await fakeAddressesRepository.create({
      address: 'Praça da Sé',
      cep: '01001000',
      city: 'São Paulo',
      state: 'SP',
      number: 743,
      complement: 'lado ímpar',
      user_id: user.id,
    });

    await expect(
      updateAddress.execute({
        cep: '04843431',
        number: 800,
        id: address.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
