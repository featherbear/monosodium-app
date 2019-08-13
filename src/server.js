import sirv from 'sirv';
import compression from 'compression';
import * as sapper from '@sapper/server';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const fastify = require('fastify')()
fastify.use([
  compression({ threshold: 0 }),
  sirv('static', { dev }),
  sapper.middleware()
]);

fastify.listen(PORT, err => {
  if (err) console.log('error', err);
})
