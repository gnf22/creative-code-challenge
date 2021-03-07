import { inject, injectable } from 'tsyringe';
import axios from 'axios';

import { ViaCEP } from '@modules/addresses/infra/clients/ViaCEP';

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IAddressesRepository } from '../repositories/IAddressesRepository';

import { Address } from '../infra/typeorm/entities/Address';

interface IRequest {
  cep: string;
  number: number;
  user_id: string;
}

@injectable()
export class CreateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {
    /** */
  }

  public async execute({ cep, number, user_id }: IRequest): Promise<Address> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist.', 404);
    }

    const viaCEP = new ViaCEP(axios);

    if (cep.length !== 8) {
      throw new AppError('Digite um CEP com 9 dígitos.', 422);
    }

    const response = await viaCEP.fetchPoints(cep);

    if (response.data.erro === true) {
      throw new AppError('Digite um CEP Válido.', 422);
    }

    const { address, city, state, complement } = viaCEP.normalizeResponse(
      response.data,
    );

    const saveAddress = await this.addressesRepository.create({
      address,
      cep,
      city,
      number,
      state,
      user_id,
      complement,
    });

    return saveAddress;
  }
}
