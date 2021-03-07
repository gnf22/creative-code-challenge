export interface ICreateAddressDTO {
  address: string;
  user_id: string;
  number: number;
  complement?: string;
  cep: string;
  city: string;
  state: string;
}
