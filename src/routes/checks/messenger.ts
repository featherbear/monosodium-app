import { createResponse } from "../../types/Response";
import { asUser } from "../../utils/Auth";

export async function post(req, res) {
  const uhOh = () => {
    res.status(500);
    res.end(
      JSON.stringify(
        createResponse(
          false,
          "Hahaha I'm a bad programmer - or you're a good hacker"
        )
      )
    );
  };

  if (!req.session) {
    res.status(401);
    return res.end(JSON.stringify(createResponse(false, "Not authenticated")));
  }

  let { username } = req.session;
  if (!username) return uhOh();

  let user = await asUser(username);
  if (!user) return uhOh();

  if (user.FB_AUTH === null) {
    // Uninitialised
    return res.end(JSON.stringify(createResponse(true, null)));
  } else if (user.FB_AUTH.session) {
    // Session supposedly active
    return res.end(JSON.stringify(createResponse(true, true)));
  } else {
    // Session is null (set by service)
    return res.end(JSON.stringify(createResponse(true, false)));
  }
}
