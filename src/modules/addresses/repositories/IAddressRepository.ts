import { ICreateAddressDTO } from '../dtos/ICreateAddressDTO';

import { Address } from '../infra/typeorm/entities/Address';

export interface IUsersRepository {
  create(data: ICreateAddressDTO): Promise<Address>;
}
