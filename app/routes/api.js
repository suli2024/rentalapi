import Router from 'express'
const router = Router()

import AuthController from '../controllers/authcontroller.js';
import UserController from '../controllers/usercontroller.js';
import verifyToken from '../middlewares/authjwt.js';
import RentalController from '../controllers/rentalcontroller.js';
import RentalitemController from '../controllers/rentalitemcontroller.js';
 
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/users', [verifyToken], UserController.index)

router.get('/rentals', RentalController.index)
router.get('/rentals/:id', RentalController.show)
router.post('/rentals', RentalController.create)
router.put('/rentals/:id', RentalController.update)
router.delete('/rentals/:id', RentalController.destroy)

router.get('/rentalitems', RentalitemController.index)
router.get('/rentalitems/:id', RentalitemController.show)
router.post('/rentalitems', RentalitemController.create)
router.put('/rentalitems/:id', RentalitemController.update)
router.delete('/rentalitems/:id', RentalitemController.destroy)

 
export default router
