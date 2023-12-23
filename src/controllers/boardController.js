import { StatusCodes } from 'http-status-codes'

const creatNew = async (req, res, next) => {
  try {
    // console.log('reqBody: ', req.body)

    res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: API create new board' })
  } catch (error) { next(error) }
}

export const boardController = {
  creatNew
}
