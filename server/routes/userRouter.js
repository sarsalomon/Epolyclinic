const Router = require('express')
const userController = require('../controllers/userController')
const AuthMiddleware = require('../middleware/AuthMiddleware')
const router = new Router()

router.post('/registration',userController.registration)
router.post('/login',userController.login)
router.get('/auth',AuthMiddleware,userController.check)
router.post('/patientadd',userController.addPatient)
router.get('/patientget/:id',userController.getPatient)
router.post('/update',userController.updatePatient)
router.post('/patientdelete',userController.deletePatient)

module.exports = router