import { Request, Response } from 'express';

import { container } from 'tsyringe';

import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService';

export class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const auth = await authenticateUser.execute({
      email,
    });

    return response.json(auth);
  }
}
