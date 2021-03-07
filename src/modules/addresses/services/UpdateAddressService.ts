import axios from 'axios';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { ViaCEP } from '../infra/clients/ViaCEP';

import { Address } from '../infra/typeorm/entities/Address';

import { IAddressesRepository } from '../repositories/IAddressesRepository';

interface IRequest {
  id: string;
  cep: string;
  number: number;
}

@injectable()
export class UpdateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {
    /** */
  }

  public async execute({ cep, number, id }: IRequest): Promise<Address> {
    const addressExists = await this.addressesRepository.findById(id);

    if (!addressExists) {
      throw new AppError('Address not found.', 404);
    }

    const viaCEP = new ViaCEP(axios);

    if (cep.length !== 8) {
      throw new AppError('Digite um CEP com 8 dígitos.', 422);
    }

    const response = await viaCEP.fetchPoints(cep);

    if (response.data.erro === true) {
      throw new AppError('Digite um CEP Válido.', 422);
    }

    const { address, city, state, complement } = viaCEP.normalizeResponse(
      response.data,
    );

    Object.assign(addressExists, {
      address,
      cep,
      city,
      number,
      state,
      complement,
    });

    return this.addressesRepository.save(addressExists);
  }
}
