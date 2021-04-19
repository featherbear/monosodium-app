import { createResponse } from "../../types/Response";
import { getUser, createSession } from "../../utils/Auth";

export async function post(req, res) {
  // Do some login check
  // get user id from the check
  const { username, password } = req.body;

  const fail = (msg?) =>
    res.end(
      JSON.stringify(createResponse(false, msg || "Bad username / password"))
    );

  if (!username || !password) return fail();
  let user = await getUser(username, password);
  if (!user) return fail();

  res.cookie("msgSession", await  createSession(user), {
    httpOnly: true,
    sameSite: "Strict",
  });
  return res.end(JSON.stringify(createResponse(true)));
}
