import sirv from 'sirv'
import express from 'express'
import compression from 'compression'
import cookieParser from "cookie-parser";
import { verify as verifyJWT } from "./utils/JWT";

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'
import dotenv from "dotenv";
dotenv.config();
if (!process.env.APP_SECRET) {
  process.env.APP_SECRET = require("random-bytes").sync(24);
  console.warn(
    `APP_SECRET not set, using random value`
  );

import { Mongo } from "../../monosodium-commons";
Mongo.doConnect()

express()
  .use(
    cookieParser(),
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: (req, res) => {
        let jwt = (req.cookies || {}).msgSession;

        if (jwt) {
          let session = verifyJWT(jwt);

          // TODO: Check against the session hashes

          if (session) {
            return {
              session,
            };
          }
        }

        return false;
      },
    })
  )
  .listen(PORT, () => {
    // console.log('Listening')
  })
