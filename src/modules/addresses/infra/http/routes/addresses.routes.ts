import { Router } from 'express';

import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import { AddressesController } from '../controllers/AddressesController';

export const addressesRouter = Router();

const addressesController = new AddressesController();

addressesRouter.use(ensureAuthenticated);

addressesRouter.post('/', addressesController.create);

addressesRouter.get('/', addressesController.index);

addressesRouter.put('/:id', addressesController.update);

addressesRouter.delete('/:id', addressesController.destroy);
