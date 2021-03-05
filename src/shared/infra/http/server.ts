import '../../utils/module-alias';

import express from 'express';

import '@shared/infra/typeorm';

const app = express();

app.post('/', (request, response) => {
  return response.json({ hello: 'world' });
});

app.listen(3333, () => console.log('Server started at port 3333'));
