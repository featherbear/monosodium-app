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
    if (Buffer.isBuffer(user.FB_AUTH.session.buffer)) {
      // Already active
      return createResponse.uhOh(res)
    }

    if (user.FB_AUTH.session?.type === 'auth') {
      // Credentials already being checked
      return createResponse.uhOh(res)
    }
  }

  user.FB_AUTH.session = { type: 'auth', data: ACrypt.encryptData(Buffer.from(`${btoa(username)}:${btoa(password)}`)) }
  await user.save()

  return createResponse.OK(res)
})

export const del = authenticatedRoute(async function (req, res) {
  let user = await asUser(req.session.username)
  if (!user) return createResponse.uhOh(res)
})
