import { EthnicityRole } from '@modules/users/infra/typeorm/entities/User';
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { FakeAddressesRepository } from '../../repositories/fakes/FakeAddressesRepository';
import { RemoveAddressService } from '../RemoveAddressService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAddressesRepository: FakeAddressesRepository;
let removeAddress: RemoveAddressService;

describe('RemoveAddress', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAddressesRepository = new FakeAddressesRepository();
    removeAddress = new RemoveAddressService(fakeAddressesRepository);
  });

  it('should be able to remove a address', async () => {
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

    await removeAddress.execute({
      id: address.id,
    });

    const addresses = await fakeAddressesRepository.listAllAddresses();

    expect(addresses).toEqual([]);
  });

  it('should not be able to remove a address from a non-existing address', async () => {
    await expect(
      removeAddress.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
