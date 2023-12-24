/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/fomatter'
import { boardModel } from '~/models/boardModel'

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    const createdboard = await boardModel.createNew(newBoard)
    // console.log(createdboard)

    const getNewBoard = await boardModel.findOneById(createdboard.insertedId)
    // console.log(getNewBoard)

    return getNewBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}
