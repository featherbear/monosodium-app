import { authenticatedRoute, uhOh } from '../_routeUtils'
import { asUser } from '../../utils/Auth'
import { ACrypt } from 'monosodium-commons'

export const post = authenticatedRoute(async function (req, res) {
  let user = await asUser(req.session.username)
  if (!user) return uhOh(res)

  if (user.FB_AUTH.uid === null) {
    // user.FB_AUTH.
    // TODO: WHERE PUT LOL
  } else {
    // Reconnect
  }

  console.log(user)
})

export const del = authenticatedRoute(async function (req, res) {
  let user = await asUser(req.session.username)
  if (!user) return uhOh(res)
})
