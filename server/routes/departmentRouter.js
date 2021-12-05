const Router = require('express')
const departmentController = require('../controllers/departmentController')
const router = new Router()

router.post('/',departmentController.fetchDepartment)
router.post('/add',departmentController.addDepartment)
router.get('/get/:id',departmentController.getDepartment)
router.post('/update',departmentController.updateDepartment)
router.post('/delete',departmentController.deleteDepartment)

module.exports = router