import jwt from "jsonwebtoken";

export function sign(payload: string | object | Buffer, options?): string {
  return jwt.sign(payload, process.env.APP_SECRET, options);
}

export function verify(token: string, options?): string | object {
  try {
    return jwt.verify(token, process.env.APP_SECRET, options);
  } catch {
    return null
  }
}

export { decode } from "jsonwebtoken";

export default {
  sign,
  verify,
  decode: jwt.decode,
};
