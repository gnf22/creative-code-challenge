import { EthnicityRole } from '@modules/users/infra/typeorm/entities/User';

export interface ICreateUserDTO {
  name: string;
  telephone: string;
  email: string;
  age: number;
  weight: number;
  ethnicity: EthnicityRole;
}
