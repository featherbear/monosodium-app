import sirv from "sirv";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import { json } from "body-parser";
import * as sapper from "@sapper/server";
import { verify as verifyJWT } from "./utils/JWT";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

import dotenv from "dotenv";
dotenv.config();
if (!process.env.APP_SECRET) {
  process.env.APP_SECRET = require("random-bytes").sync(24);
  console.warn(`APP_SECRET not set, using random value`);
}

import { Mongo } from "../../monosodium-commons";
Mongo.doConnect();

express()
  .use(
    json(),
    cookieParser(),
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    function (req, res, next) {
      let jwt = (req.cookies || {}).msgSession;
      // TODO: Check against the session hashes

      if (jwt) {
        let session = verifyJWT(jwt);
        if (session) (req as any).session = session;
      }
      next();
    },
    sapper.middleware({
      session: (req, res) => {
        if (req.session) {
          return {
            session: req.session,
          };
        }

        return false;
      },
    })
  )
  .listen(PORT, () => {
    // console.log('Listening')
  });
