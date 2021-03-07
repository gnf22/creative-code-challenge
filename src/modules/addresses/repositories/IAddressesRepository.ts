import { ICreateAddressDTO } from '../dtos/ICreateAddressDTO';

import { Address } from '../infra/typeorm/entities/Address';

export interface IAddressesRepository {
  findById(id: string): Promise<Address | undefined>;
  findByUserId(user_id: string): Promise<Address | undefined>;
  listAllAddresses(): Promise<Address[]>;
  create(data: ICreateAddressDTO): Promise<Address>;
  save(address: Address): Promise<Address>;
  remove(id: string): Promise<void>;
}
