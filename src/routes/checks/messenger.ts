import { createResponse } from '../../types/Response'
import { asUser } from '../../utils/Auth'
import { authenticatedRoute} from '../_routeUtils'

export const post = authenticatedRoute(async function (req, res) {
  let user = await asUser(req.session.username)
  if (!user) return createResponse.uhOh(res)

  if (!user.FB_AUTH.uid) {
    // Uninitialised
    return res.end(JSON.stringify(createResponse(true, null)))
  } else if (user.FB_AUTH.session) {
    if (user.FB_AUTH.session.buffer[0] === 0x3A /* ':' character */) {
      // Pending
      return res.end(
        JSON.stringify(
          createResponse(true, { uid: user.FB_AUTH.uid, active: null })
        )
      )
    }

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
