import { getRepository, Repository } from 'typeorm';

import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';

import { ICreateAddressDTO } from '@modules/addresses/dtos/ICreateAddressDTO';

import { Address } from '../entities/Address';

export class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create({
    address,
    user_id,
    number,
    complement,
    cep,
    city,
    state,
  }: ICreateAddressDTO): Promise<Address> {
    const addressToSave = this.ormRepository.create({
      address,
      user_id,
      number,
      complement,
      cep,
      city,
      state,
    });

    await this.ormRepository.save(addressToSave);

    return addressToSave;
  }
}
