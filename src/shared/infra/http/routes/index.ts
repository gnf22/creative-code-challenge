import { Router } from 'express';

import { userRouter } from '@modules/users/infra/http/routes/users.routes';

import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';

import { addressesRouter } from '@modules/addresses/infra/http/routes/addresses.routes';

export const routes = Router();

routes.use('/users', userRouter);

routes.use('/sessions', sessionsRouter);

routes.use('/addresses', addressesRouter);
