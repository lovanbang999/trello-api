import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const creatNew = async (req, res, next) => {
  try {
    const createdBoard = await boardService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) { next(error) }
}

export const boardController = {
  creatNew
}
