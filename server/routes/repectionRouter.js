const Router = require('express')
const receptionController = require('../controllers/receptionController')
const router = new Router()

router.post('/search',receptionController.search)
router.post('/addreception',receptionController.addreception)
router.get('/get/:id',receptionController.getpatient)
router.get('/getcom/:id',receptionController.getComment)
router.post('/history',receptionController.fetchHistories)
router.post('/getreception',receptionController.getReception)

module.exports = router