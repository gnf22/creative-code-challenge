import { ICreateAddressDTO } from '../dtos/ICreateAddressDTO';

import { Address } from '../infra/typeorm/entities/Address';

export interface IAddressesRepository {
  findByUserId(user_id: string): Promise<Address | undefined>;
  listAllAddresses(): Promise<Address[]>;
  create(data: ICreateAddressDTO): Promise<Address>;
  remove(id: string): Promise<void>;
}
