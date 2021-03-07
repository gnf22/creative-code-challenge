import { inject, injectable } from 'tsyringe';

import { Address } from '../infra/typeorm/entities/Address';

import { IAddressesRepository } from '../repositories/IAddressesRepository';

@injectable()
export class ListAddressesService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {
    /** */
  }

  public async execute(): Promise<Address[]> {
    const addresses = await this.addressesRepository.listAllAddresses();

    return addresses;
  }
}
