import sirv from 'sirv'
import express from 'express'
import compression from 'compression'
import * as sapper from '@sapper/server'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

express()
  .use(
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: () => {
        return false
        
        return {
          s: 2
        }
      }
    })
  )
  .listen(PORT, () => {
    // console.log('Listening')
  })
