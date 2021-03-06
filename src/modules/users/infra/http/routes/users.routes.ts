import { Router } from 'express';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { UsersController } from '../controllers/UsersController';

export const userRouter = Router();

const usersController = new UsersController();

userRouter.post('/', usersController.create);

userRouter.use(ensureAuthenticated);

userRouter.get('/', usersController.index);
