/************************************************** 
  Name    : "products.controller.js"
  Version : "0.1.0"
  Descripcion : "API Básica Productos"
  Objetivo : "Almacenamiento de datos en el 
              repositorio"
  ------------------------------------------------
  "documentacion": {
    "titulo": "CRUD REST FULL API para Productos"
    "url"   : "http://localhost:3000/products/api/"
    "repositorio": MySQL
    "Archivo" : panaderia
    "Tabla"   : productos
    "Campos"  : id_prod, desc_prod, cant_prod, prec_prod
    "Autorización" : NO
 **************************************************   
*/
import { pool } from "../database.js";
import respuestas from "../libs/respuestas.js";

/** 
 * "Nombre" : createProduct 
 * "url"    : "http://localhost:3000/products/api/"
 * "Metodo" : "POST"
 * "Acción" : "Agregar un registro"
 * "Tabla"  : "Productos"
 * -----------------------------------------------
 * "parametros" : ninguno
 * "retorno OK" : Status 201 / 
 *                objeto json id, desc, cant, prec
 * "retorno Error": Status 500
 * -----------------------------------------------
 */
export const createProduct = async (req, res) => {
    try {
        const { desc_prod, cant_prod, prec_prod } = req.body;
        const [rows] = await pool.query("INSERT INTO productos (desc_prod, cant_prod, prec_prod) VALUES (?, ?, ?)", [desc_prod, cant_prod, prec_prod]);
        res.status(201).json({ id: rows.insertId, desc_prod, cant_prod, prec_prod});        
    } catch (error) {
        //return res.status(500).json({ message: "Algo salió mal!" });
        return respuestas.error(req, res, "Algo Salió mal! :(", 500);
    }
};
/** 
 * "Nombre" : getProducts 
 * "url"    : "http://localhost:3000/products/api/"
 * "Metodo" : "GET"
 * "Acción" : "Obtener todos los registros"
 * "Tabla"  : "Productos"
 * -----------------------------------------------
 * "parametros" : ninguno
 * "retorno OK" : Status 200 /
 *                objetos json id, desc, cant, prec
 * "retorno Error": Status 500
 * -----------------------------------------------
 */
export const getProducts = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM productos");
        res.json(rows);
    } catch (error) {
        return respuestas.error(req, res, "Algo Salió mal! :(", 500);
    }
};
/** 
 * "Nombre" : getProductById 
 * "url"    : "http://localhost:3000/products/api/id"
 * "Metodo" : "GET"
 * "Acción" : "Obtener un registro"
 * "Tabla"  : "Productos"
 * -----------------------------------------------
 * "parametros" : id
 * "retorno OK" : Status 200 / 
 *                objeto json id, desc, cant, prec
 * "retorno Error": Status 404
 * -----------------------------------------------
 */
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.params)
        const [rows] = await pool.query("SELECT * FROM productos WHERE id_prod = ?", [id]);
        if (rows.length <= 0) {
            //return res.status(404).json({ message: "Producto no Encontrado!" });
            return respuestas.error(req, res, "Producto No encontrado!", 404);
        }
        res.json(rows[0]);
    } catch (error) {
        return respuestas.error(req, res, "Algo Salió mal! :(", 500);
    }
};
/** 
 * "Nombre" : updateProductById 
 * "url"    : "http://localhost:3000/products/api/id"
 * "Metodo" : "PUT"
 * "Acción" : "Actualizar un registro"
 * "Tabla"  : "Productos"
 * -----------------------------------------------
 * "parametros" : id, desc, cant, prec
 * "retorno OK" : Status 200 / 
 *                objeto json id, desc, cant, prec
 * "retorno Error": Status 404 / Status 500
 * -----------------------------------------------
 */
export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const { desc_prod, cant_prod, prec_prod } = req.body;
        const [result] = await pool.query("UPDATE productos SET desc_prod = IFNULL(?, desc_prod), cant_prod = IFNULL(?, cant_prod), prec_prod = IFNULL(?, prec_prod) WHERE id_prod = ?", [desc_prod, cant_prod, prec_prod, id]);
        if (result.affectedRows === 0)
            return respuestas.error(req, res, "Producto No encontrado!", 404);
        const [rows] = await pool.query("SELECT * FROM productos WHERE id_prod = ?", [id]);   res.json(rows[0]);
    } catch (error) {
        return respuestas.error(req, res, "Algo Salió mal! :(", 500);
    }
}
/** 
 * "Nombre" : deleteProductById 
 * "url"    : "http://localhost:3000/products/api/id"
 * "Metodo" : "DELETE"
 * "Acción" : "Eliminar un registro"
 * "Tabla"  : "Productos"
 * -----------------------------------------------
 * "parametros" : id
 * "retorno OK" : Status 200                   
 * "retorno Error": Status 404 /  Status 500
 * -----------------------------------------------
 */
export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM productos WHERE id_prod = ?", [id]);
        if (rows.affectedRows <= 0) {
            return respuestas.error(req, res, "Producto No encontrado!", 404);
        }
        res.sendStatus(204);
    } catch (error) {
        return respuestas.error(req, res, "Algo Salió mal! :(", 500);
    }
};