import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { Address } from '../infra/typeorm/entities/Address';

import { IAddressesRepository } from '../repositories/IAddressesRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export class ListAddressesService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {
    /** */
  }

  public async execute({ user_id }: IRequest): Promise<Address[]> {
    const address = await this.addressesRepository.findByUserId(user_id);

    if (!address) {
      throw new AppError('User does not exist.', 404);
    }

    const addresses = await this.addressesRepository.listAllAddresses();

    return addresses;
  }
}
