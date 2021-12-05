const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const receptionRouter = require('./repectionRouter')
const departmentRouter = require('./departmentRouter')
const doctorRouter = require('./doctorRouter')
const mfyRouter = require('./mfyRouter')
const adminRouter = require('./adminRouter')

// const nurseRouter = require('./nurseRouter')

router.use('/user', userRouter)
router.use('/reception', receptionRouter)
router.use('/department', departmentRouter)
router.use('/doctor', doctorRouter)
router.use('/mfy', mfyRouter)
router.use('/admin', adminRouter)
// router.use('/nurse', nurseRouter)

module.exports = router