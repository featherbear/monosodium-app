import { createResponse } from '../types/Response'

/**
 * Route function wrapper
 *
 * @param f
 * @returns
 */
export function authenticatedRoute (f: (req, res) => any) {
  return async function (req, res) {
    if (!req.session) {
      res.status(401)
      return res.end(JSON.stringify(createResponse(false, 'Not authenticated')))
    }

    let { username } = req.session
    if (!username) return createResponse.uhOh(res)
  

    f(req, res)
  }
}