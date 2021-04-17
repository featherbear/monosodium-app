import { createResponse } from "../../types/Response";
import { createUser, createSession } from "../../utils/Auth";

export async function post(req, res) {
  if (!process.env.REGISTRATION_ENABLED) {
    return res.end(
      JSON.stringify(createResponse(false, "Registrations not enabled"))
    );
  }

  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    return res.end(
      JSON.stringify(
        createResponse(false, "`username` or `password` not supplied")
      )
    );
  }

  let user;
  try {
    user = await createUser(username, password);
  } catch (e) {
    return res.end(
      JSON.stringify(createResponse(false, "Username already exists"))
    );
  }

  res.cookie("msgSession", await createSession(user), {
    httpOnly: true,
    sameSite: "Strict",
  });
  return res.end(JSON.stringify(createResponse(true)));
}
