/************************************************** 
  Name    : "users.controller.js"
  Version : "0.1.0"
  Descripcion : "API Básica Usuarios"
  Objetivo : "Almacenamiento de datos en el 
              repositorio"
  ------------------------------------------------
  "documentacion": {
    "titulo": "CRUD REST FULL API para usuarios"
    "url"   : "http://localhost:3000/users/api/"
    "repositorio": MySQL
    "Archivo" : panaderia
    "Tabla"   : users
    "Campos"  : id, name, email, password
    "Autorización" : NO
  }
 **************************************************   
*/
import { pool } from "../database.js";
import respuestas from "../libs/respuestas.js";
/** 
 * "Nombre" : createUser 
 * "url"    : "http://localhost:3000/users/api/"
 * "Metodo" : "POST"
 * "Acción" : "Agregar un registro"
 * "Tabla"  : "Users"
 * -----------------------------------------------
 * "parametros" : ninguno
 * "retorno OK" : Status 201 / 
 *                objeto json id, name, email, activo, fecha_creacion
 * "retorno Error": Status 500
 * -----------------------------------------------
 */
export const createUser = async (req, res) => {
    try {
        const { nom_user, email_user, act_user, rol } = req.body;
        const [rows] = await pool.query("INSERT INTO usuarios (nom_user, email_user, act_user, rol) VALUES (?, ?, ?, ? )", [nom_user, email_user, act_user, rol]);
        res.status(201).json({ id: rows.insertId, nom_user, email_user, act_user, rol});        
    } catch (error) {        
        return respuestas.error(req, res, "Algo Salió mal! :(", 500);
    }
};
/** 
 * "Nombre" : getUsers 
 * "url"    : "http://localhost:3000/users/api/"
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
export const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios");
        res.json(rows);
    } catch (error) {
        return respuestas.error(req, res, "Algo Salió mal! :(", 500);
    }
};
/** 
 * "Nombre" : getUserById 
 * "url"    : "http://localhost:3000/users/api/id"
 * "Metodo" : "GET"
 * "Acción" : "Obtener un registro"
 * "Tabla"  : "User"
 * -----------------------------------------------
 * "parametros" : id
 * "retorno OK" : Status 200 / 
 *                objeto json id, name, email, password
 * "retorno Error": Status 404
 * -----------------------------------------------
 */
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.params)
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE id_user = ?", [id]);
        if (rows.length <= 0) {
            //return res.status(404).json({ message: "Producto no Encontrado!" });
            return respuestas.error(req, res, "Usuario No encontrado!", 404);
        }
        res.json(rows[0]);
    } catch (error) {
        return respuestas.error(req, res, "Algo Salió mal! :(", 500);
    }
};
/** 
 * "Nombre" : updateUserById 
 * "url"    : "http://localhost:3000/user/api/id"
 * "Metodo" : "PUT"
 * "Acción" : "Actualizar un registro"
 * "Tabla"  : "users"
 * -----------------------------------------------
 * "parametros" : id, name, email, password
 * "retorno OK" : Status 200 / 
 *                objeto json id, name, email, password
 * "retorno Error": Status 404 / Status 500
 * -----------------------------------------------
 */
export const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom_user, email_user, act_user, rol } = req.body;
        const [result] = await pool.query("UPDATE usuarios SET nom_user = IFNULL(?, nom_user), email_user = IFNULL(?, email_user), act_user = IFNULL(?, act_user), rol = IFNULL(?, rol) WHERE id_prod = ?", [nom_user, email_user, act_user, rol, id]);
        if (result.affectedRows === 0)
            return respuestas.error(req, res, "Usuario No encontrado!", 404);
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE id_prod = ?", [id]);   res.json(rows[0]);
    } catch (error) {
        return respuestas.error(req, res, "Algo Salió mal! :(", 500);
    }
};
/** 
 * "Nombre" : deleteUserById 
 * "url"    : "http://localhost:3000/users/api/id"
 * "Metodo" : "DELETE"
 * "Acción" : "Eliminar un registro"
 * "Tabla"  : "users"
 * -----------------------------------------------
 * "parametros" : id
 * "retorno OK" : Status 200                   
 * "retorno Error": Status 404 /  Status 500
 * -----------------------------------------------
 */
export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM usuarios WHERE id_prod = ?", [id]);
        if (rows.affectedRows <= 0) {
            return respuestas.error(req, res, "Usuario No encontrado!", 404);
        }
        res.sendStatus(204);
    } catch (error) {
        return respuestas.error(req, res, "Algo Salió mal! :(", 500);
    }
};
