import { authenticatedRoute } from '../_routeUtils'
import { asUser } from '../../utils/Auth'
import { ACrypt } from 'monosodium-commons'
import { createResponse } from '../../types/Response'
import btoa from 'btoa'

export const post = authenticatedRoute(async function (req, res) {
  let user = await asUser(req.session.username)
  if (!user) return createResponse.uhOh(res)

  const { username, password } = req.body
  if (!username || !password) {
    res.status(400);
    return res.end(
      JSON.stringify(
        createResponse(false, "`username` or `password` not supplied")
      )
    );
  }

  if (user.FB_AUTH.session) {
    console.log(user.FB_AUTH.session[0]);
    if (user.FB_AUTH.session.buffer[0] == 0x3A /* ':' character */) {
      // TODO: Check for existing connection status
      console.warn("Credentials being checked")
      // Cancel previous and start new?
    }
    else {
      // TODO: Check for existing active session
      console.warn("Session already active")
    }
  }

  user.FB_AUTH.session = Buffer.concat([Buffer.from(":"), ACrypt.encryptData(Buffer.from(`${btoa(username)}:${btoa(password)}`))])
  user.save()

  return createResponse.OK(res)
})

export const del = authenticatedRoute(async function (req, res) {
  let user = await asUser(req.session.username)
  if (!user) return createResponse.uhOh(res)
})
