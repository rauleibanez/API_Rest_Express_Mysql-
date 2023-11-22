/************************************************** 
  Name    : "clients.controller.js"
  Version : "0.1.0"
  Descripcion : "API Básica clientes"
  Objetivo : "Almacenamiento de datos en el 
              repositorio"
  ------------------------------------------------
  "documentacion": {
    "titulo": "CRUD REST FULL API para usuarios"
    "url"   : "http://localhost:3000/clients/api/"
    "repositorio": MySQL
    "Archivo" : panaderia
    "Tabla"   : clientes
    "Campos"  : id, nombre, apellido, direccion, correo, telefono
    "Autorización" : NO
  }
 **************************************************   
*/
import { pool } from "../database.js";
import respuestas from "../libs/respuestas.js";
/** 
 * "Nombre" : createClient 
 * "url"    : "http://localhost:3000/clients/api/"
 * "Metodo" : "POST"
 * "Acción" : "Agregar un registro"
 * "Tabla"  : "Clientes"
 * -----------------------------------------------
 * "parametros" : ninguno
 * "retorno OK" : Status 201 / 
 *                objeto json id, nombre, apellido, direccion, correo, telefono
 * "retorno Error": Status 500
 * -----------------------------------------------
 */
export const createClient = async (req, res) => {
    try {
        const { nombre, apellido, direccion, correo, telefono } = req.body;
        const [rows] = await pool.query("INSERT INTO clientes (nombre, apellido, direccion, correo, telefono) VALUES (?, ?, ?, ?, ?)", [nombre, apellido, direccion, correo, telefono]);
        res.status(201).json({ id: rows.insertId, nombre, apellido, direccion, correo, telefono});        
    } catch (error) {
        //return res.status(500).json({ message: "Algo salió mal!" });
        return respuestas.error(req, res, "Algo Salió mal! :(", 500);
    }
};
/** 
 * "Nombre" : getClients 
 * "url"    : "http://localhost:3000/clients/api/"
 * "Metodo" : "GET"
 * "Acción" : "Obtener todos los registros"
 * "Tabla"  : "Clientes"
 * -----------------------------------------------
 * "parametros" : ninguno
 * "retorno OK" : Status 200 /
 *                objetos json id, nombre, apellido, direccion, correo, telefono
 * "retorno Error": Status 500
 * -----------------------------------------------
 */
export const getClients = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM clientes");
        res.json(rows);
    } catch (error) {
        return respuestas.error(req, res, "Algo Salió mal! :(", 500);
    }
};
/** 
 * "Nombre" : getClientById 
 * "url"    : "http://localhost:3000/clients/api/id"
 * "Metodo" : "GET"
 * "Acción" : "Obtener un registro"
 * "Tabla"  : "Clientes"
 * -----------------------------------------------
 * "parametros" : id
 * "retorno OK" : Status 200 / 
 *                objeto json id, nombre, apellido, direccion, correo, telefono
 * "retorno Error": Status 404
 * -----------------------------------------------
 */
export const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.params)
        const [rows] = await pool.query("SELECT * FROM clientes WHERE id_cliente = ?", [id]);
        if (rows.length <= 0) {
            //return res.status(404).json({ message: "Producto no Encontrado!" });
            return respuestas.error(req, res, "Cliente No encontrado!", 404);
        }
        res.json(rows[0]);
    } catch (error) {
        return respuestas.error(req, res, "Algo Salió mal! :(", 500);
    }
};
/** 
 * "Nombre" : updateClientById 
 * "url"    : "http://localhost:3000/clients/api/id"
 * "Metodo" : "PUT"
 * "Acción" : "Actualizar un registro"
 * "Tabla"  : "Clientes"
 * -----------------------------------------------
 * "parametros" : id, desc, cant, prec
 * "retorno OK" : Status 200 / 
 *                objeto json id, nombre, apellido, direccion, correo, telefono
 * "retorno Error": Status 404 / Status 500
 * -----------------------------------------------
 */
export const updateClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, direccion, correo, telefono } = req.body;
        const [result] = await pool.query("UPDATE clientes SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), direccion = IFNULL(?, direccion), correo = IFNULL(?, correo), telefono = IFNULL(?, telefono) WHERE id_cliente = ?", [nombre, apellido, direccion, correo, telefono, id]);
        if (result.affectedRows === 0)
            return respuestas.error(req, res, "Cliente No encontrado!", 404);
        const [rows] = await pool.query("SELECT * FROM clientes WHERE id_cliente = ?", [id]);   res.json(rows[0]);
    } catch (error) {
        return respuestas.error(req, res, "Algo Salió mal! :(", 500);
    }
}
/** 
 * "Nombre" : deleteClientById 
 * "url"    : "http://localhost:3000/clients/api/id"
 * "Metodo" : "DELETE"
 * "Acción" : "Eliminar un registro"
 * "Tabla"  : "Clientes"
 * -----------------------------------------------
 * "parametros" : id
 * "retorno OK" : Status 200                   
 * "retorno Error": Status 404 /  Status 500
 * -----------------------------------------------
 */
export const deleteClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM clientes WHERE id_cliente = ?", [id]);
        if (rows.affectedRows <= 0) {
            return respuestas.error(req, res, "Cliente No encontrado!", 404);
        }
        res.sendStatus(204);
    } catch (error) {
        return respuestas.error(req, res, "Algo Salió mal! :(", 500);
    }
};