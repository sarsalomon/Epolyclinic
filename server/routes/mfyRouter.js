const Router = require('express')
const mfyController = require('../controllers/mfyController')
const router = new Router()

router.post('/',mfyController.fetchMfy)
router.post('/add',mfyController.addMfy)
router.get('/get/:id',mfyController.getMfy)
router.post('/update',mfyController.updateMfy)
router.post('/delete',mfyController.deleteMfy)

module.exports = router