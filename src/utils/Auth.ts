import { Models } from "../../../monosodium-commons";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sign } from "./JWT";

export async function createUser(username, password) {
  let passwordHash = await bcrypt.hash(password, 10);

  return await Models.User.create({
    MSG_AUTH: {
      username,
      password: passwordHash,
      sessions: [],
    },
    FB_AUTH: null, // null
    // FB_AUTH: {
    //   uid: null,
    //   session: null,
    // },
    SETTINGS: {},
    QUEUE: [],
  });
}

export async function asUser(username) {
  let user = await Models.User.findOne({
    "MSG_AUTH.username": username,
  });
  if (!user) return null;

  return user;
}

export async function getUser(username, password) {
  let userPreAuth = await asUser(username);
  if (
    !userPreAuth ||
    !(await bcrypt.compare(password, userPreAuth.MSG_AUTH.password.toString()))
  )
    return null;

  return userPreAuth;
}

/**
 *
 * Generates a JWT auth token, and stores its hash into the sessions DB
 *
 * @param user
 * @returns JWT auth token
 */
export async function createSession(user) {
  let jwt = sign({ username: user.MSG_AUTH.username });
  let hash = crypto
    .createHash("sha256")
    .update(process.env.APP_SECRET)
    .update(jwt)
    .digest();
  user.MSG_AUTH.sessions.push(hash);
  await user.save();
  return jwt;
}
