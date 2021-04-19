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
    if (!username) return uhOh(res)
  

    f(req, res)
  }
}

/**
 * and I oop
 *
 * @param res
 */
export function uhOh (res) {
  res.status(500)
  res.end(
    JSON.stringify(
      createResponse(
        false,
        "Hahaha I'm a bad programmer - or you're a good hacker"
      )
    )
  )
}
