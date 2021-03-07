import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { CreateAddressService } from '@modules/addresses/services/CreateAddressService';
import { ListAddressesService } from '@modules/addresses/services/ListAddressesService';
import { RemoveAddressService } from '@modules/addresses/services/RemoveAddressService';
import { UpdateAddressService } from '@modules/addresses/services/UpdateAddressService';

export class AddressesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { cep, number } = request.body;
    const { id } = request.user;

    const createAddress = container.resolve(CreateAddressService);

    const address = await createAddress.execute({
      cep,
      number,
      id,
    });

    return response.json(address);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const listAddresses = container.resolve(ListAddressesService);

    const addresses = await listAddresses.execute();

    return response.json(addresses);
  }

  async destroy(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeAddress = container.resolve(RemoveAddressService);

    await removeAddress.execute({
      id,
    });

    return response.sendStatus(200);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { cep, number } = request.body;

    const updateAddress = container.resolve(UpdateAddressService);

    const address = await updateAddress.execute({
      cep,
      number,
      id,
    });

    return response.json(address);
  }
}
