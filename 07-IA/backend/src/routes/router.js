import {Router} from 'express'
import jobsRouter from './jobs.js'
import aiRouter from './ai.js'

const router = Router()

router.use('/jobs', jobsRouter)
router.use('/ai', aiRouter)

export default router