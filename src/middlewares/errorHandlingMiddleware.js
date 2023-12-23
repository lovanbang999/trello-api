/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'

// Middleware centalized error handling
export const errorHandlingMiddleware = (err, req, res, next) => {

  // Without statusCode then statusCode default will be (500) INTERNAL_SERVER_ERROR
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

  // Created variable responseError check something return
  // If error without message then get ReasonPhrases
  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
    stack: err.stack
  }

  // Only if the environment is DEV will Stack Trace be returned for easier debugging, otherwise it will be deleted
  if (env.BUILD_MODE !== 'dev') delete responseError.stack

  // console.error(responseError)

  res.status(responseError.statusCode).json(responseError)
}
