const Router = require('express')
const adminController = require('../controllers/adminController')
const router = new Router()

router.post('/',adminController.fetch)

module.exports = router