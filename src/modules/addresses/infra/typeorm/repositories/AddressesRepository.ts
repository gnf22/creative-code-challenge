import { getRepository, Repository } from 'typeorm';

import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';

import { ICreateAddressDTO } from '@modules/addresses/dtos/ICreateAddressDTO';

import { Address } from '../entities/Address';

export class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = this.ormRepository.findOne({ where: { id } });

    return address;
  }

  public async findByUserId(user_id: string): Promise<Address | undefined> {
    const address = this.ormRepository.findOne({ where: { user_id } });

    return address;
  }

  public async listAllAddresses(): Promise<Address[]> {
    return this.ormRepository.find({ relations: ['user'] });
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

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }

  public async remove(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }
}
