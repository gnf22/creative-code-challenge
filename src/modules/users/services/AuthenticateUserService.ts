import path from 'path';

import { sign } from 'jsonwebtoken';
import { authConfig } from '@config/auth';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { IMailProvider } from '@shared/container/providers/MailProvider/models/IMailProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {
    /** */
  }

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist', 404);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const authTemplate = path.resolve(__dirname, '..', 'views', 'auth.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Creative Cloud] Seu Token de Acesso',
      templateData: {
        file: authTemplate,
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}
