import { AppError } from '@shared/errors/AppError';
import axios, { AxiosResponse, AxiosStatic } from 'axios';

interface IViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  localidade: string;
  uf: string;
}

interface IAddressNormalize {
  address: string;
  cep: string;
  complement: string;
  city: string;
  state: string;
}

export class ViaCEP {
  constructor(protected request: AxiosStatic) {
    /** */
  }

  public async fetchPoints(cep: string): Promise<AxiosResponse> {
    const response = await this.request.get<IViaCEPResponse>(
      `https://viacep.com.br/ws/${cep}/json/`,
    );

    return response;
  }

  public normalizeResponse(address: IViaCEPResponse): IAddressNormalize {
    const newAddress = {
      address: address.logradouro,
      cep: address.cep,
      city: address.localidade,
      complement: address.complemento,
      state: address.uf,
    } as IAddressNormalize;

    return newAddress;
  }
}
