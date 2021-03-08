import { EthnicityRole } from '@modules/users/infra/typeorm/entities/User';
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { FakeAddressesRepository } from '../../repositories/fakes/FakeAddressesRepository';
import { ListAddressesService } from '../ListAddressesService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAddressesRepository: FakeAddressesRepository;
let listAddresses: ListAddressesService;

describe('ListAddresses', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAddressesRepository = new FakeAddressesRepository();
    listAddresses = new ListAddressesService(fakeAddressesRepository);
  });

  it('should be able to list all addresses', async () => {
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

    const address1 = await fakeAddressesRepository.create({
      address: 'Praça da Sé',
      cep: '01001000',
      city: 'São Paulo',
      state: 'SP',
      number: 743,
      complement: 'lado ímpar',
      user_id: user.id,
    });

    const address2 = await fakeAddressesRepository.create({
      address: 'Avenida Vinte e Três de Maio',
      cep: '01316060',
      city: 'São Paulo',
      state: 'SP',
      number: 2499,
      complement: 'Até 22499/2500',
      user_id: user2.id,
    });

    const addresses = await listAddresses.execute();

    expect(addresses).toEqual([address1, address2]);
  });
});
