const Router = require('express')
const doctorController = require('../controllers/doctorController')

const router = new Router()

router.post('/',doctorController.fetchDoctor)
router.post('/fetch',doctorController.fetchPatients)
router.post('/fetchhistory',doctorController.fetchHistories)
router.post('/getpatient',doctorController.getPatient)
router.post('/add',doctorController.addDoctor)
router.post('/historyadd',doctorController.addHistory)
router.post('/redirectto',doctorController.RedirectAthor)
router.post('/cancelhistoryadd',doctorController.addHistoryCancel)
router.get('/get/:id',doctorController.getDoctor)
router.post('/getH',doctorController.getHistoryView)
router.post('/update',doctorController.updateDoctor)
router.post('/delete',doctorController.deleteDoctor)
router.post('/getcount',doctorController.getCountPatient)

module.exports = router