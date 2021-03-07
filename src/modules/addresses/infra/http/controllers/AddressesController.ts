import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { CreateAddressService } from '@modules/addresses/services/CreateAddressService';
import { ListAddressesService } from '@modules/addresses/services/ListAddressesService';
import { RemoveAddressService } from '@modules/addresses/services/RemoveAddressService';

export class AddressesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { cep, number } = request.body;
    const { id } = request.user;

    const createAddress = container.resolve(CreateAddressService);

    const address = await createAddress.execute({
      cep,
      number,
      user_id: id,
    });

    return response.json(address);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listAddresses = container.resolve(ListAddressesService);

    const addresses = await listAddresses.execute({
      user_id: id,
    });

    return response.json(addresses);
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const removeAddress = container.resolve(RemoveAddressService);

    await removeAddress.execute({
      user_id: id,
    });

    return response.sendStatus(200);
  }
}
