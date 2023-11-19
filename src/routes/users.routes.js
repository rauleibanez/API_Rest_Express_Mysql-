import { Router } from 'express'
const router = Router()
import * as usersCtrl from '../controllers/users.controller.js'

/* -------------------------
 *    RUTAS DE USUARIOS
 * -------------------------
 */
router.get('/', usersCtrl.getUsers)
router.post('/', usersCtrl.createUser)
router.get('/:id', usersCtrl.getUserById)
router.put('/:id', usersCtrl.updateUserById)
router.delete('/:id', usersCtrl.deleteUserById)
export default router;