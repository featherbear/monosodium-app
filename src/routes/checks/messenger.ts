import { createResponse } from '../../types/Response'
import { asUser } from '../../utils/Auth'
import { authenticatedRoute, uhOh } from '../_routeUtils'

export const post = authenticatedRoute(async function (req, res) {
  let user = await asUser(req.session.username)
  if (!user) return uhOh(res)

  // TODO: Check some queue for in-testing accounts
  if (!user.FB_AUTH.uid) {
    // Uninitialised
    return res.end(JSON.stringify(createResponse(true, null)))
  } else if (user.FB_AUTH.session) {
    // Session supposedly active
    return res.end(
      JSON.stringify(
        createResponse(true, { uid: user.FB_AUTH.uid, active: true })
      )
    )
  } else {
    // Session is null (set by service)
    return res.end(
      JSON.stringify(
        createResponse(true, { uid: user.FB_AUTH.uid, active: false })
      )
    )
  }
})
