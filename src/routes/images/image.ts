import express, { Request, Response } from 'express'
import path from 'path'
import logger from '../../logger/winston'
import * as image from '../../utils/image'

const routes = express.Router()

routes.get('/', async (_req: Request, res: Response) => {
  const p = path.join(__dirname, '../../../images/full')
  await image
    .check_dir(p)
    .then((f) => {
      logger.debug('folder request: ' + f)
      res.status(200).json(f)
    })
    .catch((e) => {
      res.status(500).json({
        error: { status: 500, message: e }
      })
      logger.error(e)
    })
})

routes.get('/:file', async (req: Request, res: Response) => {
  const i = path.join(__dirname, '../../../images/full', req.params.file)
  await image
    .exists(i, req.query)
    .then((f) => {
      logger.debug('file request: ' + f)
      res.sendFile(f.toString())
    })
    .catch((e) => {
      res.status(401).json({
        error: { status: 401, message: e }
      })
      logger.error(e)
    })
})

routes.get('/:file/meta', async (req: Request, res: Response) => {
  const i = path.join(__dirname, '../../../images/full', req.params.file)
  await image
    .meta(i)
    .then((f) => {
      logger.debug('file meta request: ' + f)
      res.status(200).json(f)
    })
    .catch((e) => {
      res.status(500).json({
        error: { status: 500, message: e }
      })
      logger.error(e)
    })
})

export default routes
