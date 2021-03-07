import { v4 as uuid } from 'uuid';

import { IAddressesRepository } from '@modules/addresses/repositories/IAddressesRepository';
import { ICreateAddressDTO } from '@modules/addresses/dtos/ICreateAddressDTO';

import { Address } from '../../infra/typeorm/entities/Address';

export class FakeAddressesRepository implements IAddressesRepository {
  private addresses: Address[] = [];

  public async listAllAddresses(): Promise<Address[]> {
    return this.addresses;
  }

  public async findById(id: string): Promise<Address | undefined> {
    const findAddress = this.addresses.find(address => address.id === id);

    return findAddress;
  }

  public async findByUserId(user_id: string): Promise<Address | undefined> {
    const findAddress = this.addresses.find(
      address => address.user_id === user_id,
    );

    return findAddress;
  }

  public async create({
    address,
    cep,
    city,
    number,
    state,
    user_id,
    complement,
  }: ICreateAddressDTO): Promise<Address> {
    const newAddress = new Address();

    Object.assign(newAddress, {
      id: uuid(),
      address,
      cep,
      city,
      number,
      state,
      user_id,
      complement,
    });

    this.addresses.push(newAddress);

    return newAddress;
  }

  public async save(address: Address): Promise<Address> {
    const findIndex = this.addresses.findIndex(
      findAddress => findAddress.id === address.id,
    );

    this.addresses[findIndex] = address;

    return address;
  }

  public async remove(id: string): Promise<void> {
    const addressIndex = this.addresses.findIndex(address => address.id === id);

    this.addresses.splice(addressIndex - 1);
  }
}
