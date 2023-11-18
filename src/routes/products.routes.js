import { Router } from 'express'
const router = Router()
import * as productsCtrl from '../controllers/products.controller.js'

/* -------------------------
 *    RUTAS DE PRODUCTOS
 * -------------------------
 */
router.get('/', productsCtrl.getProducts)
router.post('/', productsCtrl.createProduct)
router.get('/:id', productsCtrl.getProductById)
router.put('/:id', productsCtrl.updateProductById)
router.delete('/:id', productsCtrl.deleteProductById)
export default router;