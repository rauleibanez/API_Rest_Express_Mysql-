import { Router } from 'express'
const router = Router()
import * as clientCtrl from '../controllers/clients.controller.js'

/* -------------------------
 *    RUTAS DE CLIENTES
 * -------------------------
 */
router.get('/', clientCtrl.getClients)
router.post('/', clientCtrl.createClient)
router.get('/:id', clientCtrl.getClientById)
router.put('/:id', clientCtrl.updateClientById)
router.delete('/:id', clientCtrl.deleteClientById)
export default router;