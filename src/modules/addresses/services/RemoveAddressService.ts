import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IAddressesRepository } from '../repositories/IAddressesRepository';

interface IRequest {
  id: string;
}

@injectable()
export class RemoveAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {
    /** */
  }

  public async execute({ id }: IRequest): Promise<void> {
    const user = await this.addressesRepository.findById(id);

    if (!user) {
      throw new AppError('Address not found.');
    }

    await this.addressesRepository.remove(user.id);
  }
}
