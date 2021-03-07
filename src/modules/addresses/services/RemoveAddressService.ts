import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IAddressesRepository } from '../repositories/IAddressesRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export class RemoveAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {
    /** */
  }

  public async execute({ user_id }: IRequest): Promise<void> {
    const address = await this.addressesRepository.findByUserId(user_id);

    if (!address) {
      throw new AppError('User does not exist.', 404);
    }

    await this.addressesRepository.remove(address.id);
  }
}
