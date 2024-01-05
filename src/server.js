/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import exitHook from 'async-exit-hook'

import { corsOptions } from './config/cors'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  // Handle Cors
  app.use(cors(corsOptions))

  // Enable req.body json data
  app.use(express.json())

  // Use APIs V1
  app.use('/v1', APIs_V1)

  // Middleware centalized error handling
  app.use(errorHandlingMiddleware)

  // Production Environment (Support now is Render.com)
  if (env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`PRODUCTION: Hello ${env.AUTHOR}, Back-end Server is running successfully at Port: ${process.env.PORT}`)
    })
  } else {
    // Dev Environment
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(`LOCAL DEV: Hello ${env.AUTHOR}, I am running at http://${ env.LOCAL_DEV_APP_HOST }:${ env.LOCAL_DEV_APP_PORT }/`)
    })
  }


  exitHook(() => {
    CLOSE_DB()
  })
}

(async () => {
  try {
    console.log('Connected to MongoDB Cloud Atlas!')
    await CONNECT_DB()
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
