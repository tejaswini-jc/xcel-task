const express=require('express')
const router=express.Router()
const authenticateUser = require('../middlewares/authenticate')
const userController = require('../controllers/userController')

router.post('/users/register', userController.register)
router.post('/users/login', userController.login)
router.delete('/users/logout', authenticateUser, userController.logout)
router.get('/users/account',authenticateUser, userController.list)
router.get('/users', userController.list)

module.exports = router