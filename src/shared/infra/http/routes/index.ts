import { Router } from 'express';

import { userRouter } from '@modules/users/infra/http/routes/users.routes';

import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';

export const routes = Router();

routes.use('/users', userRouter);

routes.use('/sessions', sessionsRouter);
