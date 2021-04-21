import { createResponse } from '../../types/Response'
import { asUser } from '../../utils/Auth'
import { authenticatedRoute } from '../_routeUtils'

export const post = authenticatedRoute(async function (req, res) {
  let user = await asUser(req.session.username)

  if (!user) return createResponse.uhOh(res)

  if (user.FB_AUTH?.session?.type == 'auth') {
    // Pending
    return createResponse.OK(res, { uid: user.FB_AUTH.uid, active: null })
  }

  if (user.FB_AUTH?.session?.type == 'error') {
    if (user.FB_AUTH.session.error == 'id') {
      // ID mismatch on reconnect
      return createResponse.OK(res, { uid: user.FB_AUTH.uid, active: false, error: 'id' })

    }

    if (user.FB_AUTH.session.error == 'credentials') {
      // Invalid credentials
      return createResponse.OK(res, { uid: user.FB_AUTH.uid, active: false, error: 'credentials' })

    }
  }

  if (!user.FB_AUTH.uid) {
    // Uninitialised
    return createResponse.OK(res, null)
  }

  if (!user.FB_AUTH.session) {
    // Disconnected
    return createResponse.OK(res, { uid: user.FB_AUTH.uid, active: false })
  }

  // Session supposedly active
  return createResponse.OK(res, { uid: user.FB_AUTH.uid, active: true })

})
