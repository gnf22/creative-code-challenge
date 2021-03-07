import { Router } from 'express';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { AddressesController } from '../controllers/AddressesController';

export const addressesRouter = Router();

const addresesController = new AddressesController();

addressesRouter.use(ensureAuthenticated);

addressesRouter.post('/', addresesController.create);
addressesRouter.get('/', addresesController.index);
