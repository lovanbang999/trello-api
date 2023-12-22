import { StatusCodes } from 'http-status-codes'

const creatNew = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-console
    console.log('reqBody: ', req.body)
    console.log('reqQuery: ', req.query)
    console.log('reqParams: ', req.params)

    res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: API create new board' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}

export const boardController = {
  creatNew
}