import sirv from 'sirv'
import express from 'express'
import compression from 'compression'
import * as sapper from '@sapper/server'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'
import dotenv from "dotenv";
dotenv.config();
if (!process.env.APP_SECRET) {
  process.env.APP_SECRET = require("random-bytes").sync(24);
  console.warn(
    `APP_SECRET not set, using random value`
  );

}

express()
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: (req, res) => {
        let session = (req.cookies || {}).msgSession;

        if (session) {
          return {
            session,
          };
        }

        return false;
      },
    })
  )
  .listen(PORT, () => {
    // console.log('Listening')
  })
